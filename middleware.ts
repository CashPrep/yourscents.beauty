import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

// Routes that require a logged-in session.
const PROTECTED = ['/dashboard']

// Routes that logged-in users should be bounced away from
// (no point showing login/signup to someone already authed).
const AUTH_ROUTES = ['/login', '/signup', '/forgot-password', '/reset-password']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ── 1. Refresh the Supabase session cookie (required by @supabase/ssr) ──
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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

  // getUser() is the only call Supabase recommends here — it also refreshes
  // the token if it's expired and writes the new cookie via setAll above.
  const { data: { user } } = await supabase.auth.getUser()

  // ── 2. Protect /dashboard/* — redirect unauthenticated users to login ──
  const isProtected = PROTECTED.some(p => pathname === p || pathname.startsWith(p + '/'))
  if (isProtected && !user) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/login'
    loginUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // ── 3. Bounce logged-in users away from auth pages → dashboard ──────────
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
    // Run on all routes except static assets, images, and Next internals.
    '/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
