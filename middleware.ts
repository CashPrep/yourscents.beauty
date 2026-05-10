import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

// Routes that require a logged-in session.
const PROTECTED = ['/dashboard']

// Routes that logged-in users should be bounced away from.
const AUTH_ROUTES = ['/login', '/signup', '/forgot-password', '/reset-password']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ── 1. Bail early if Supabase env vars are missing ──────────────────────
  // Without this guard, createServerClient throws and the middleware crashes
  // silently — making every navigation appear "unresponsive" to the user.
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return NextResponse.next({ request })
  }

  // ── 2. Refresh the Supabase session cookie (required by @supabase/ssr) ──
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Wrap in try/catch — a network error or invalid JWT must never crash
  // the middleware and leave the user staring at a dead page.
  let user = null
  try {
    const { data } = await supabase.auth.getUser()
    user = data.user
  } catch {
    // Could not reach Supabase — allow the request through so static pages
    // and auth forms still render; protected routes will catch it on load.
    return response
  }

  // ── 3. Protect /dashboard/* ──────────────────────────────────────────────
  const isProtected = PROTECTED.some(p => pathname === p || pathname.startsWith(p + '/'))
  if (isProtected && !user) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/login'
    loginUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // ── 4. Bounce logged-in users away from auth pages ───────────────────────
  const isAuthRoute = AUTH_ROUTES.some(r => pathname === r || pathname.startsWith(r + '/'))
  if (isAuthRoute && user) {
    const dashUrl = request.nextUrl.clone()
    dashUrl.pathname = '/dashboard'
    dashUrl.search = ''
    return NextResponse.redirect(dashUrl)
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
