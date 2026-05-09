import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// /auth/callback
// Supabase redirects here after email confirmation, password reset, and
// magic-link sign-in. We exchange the one-time code for a server-side
// session cookie, then forward the user to the intended destination.
//
// The `next` query param controls where the user lands after the exchange:
//   - Password reset: ?next=/reset-password
//   - Email confirmation: ?next=/dashboard (default)
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
    // Code exchange failed — send to login with an error hint
    return NextResponse.redirect(`${origin}/login?error=invalid_reset_link`)
  }

  // No code present — malformed link
  return NextResponse.redirect(`${origin}/login?error=missing_code`)
}
