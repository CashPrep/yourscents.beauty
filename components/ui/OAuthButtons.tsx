'use client'
import { useState } from 'react'

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.6 32.9 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 2.9l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16.1 19 13 24 13c3.1 0 5.8 1.1 7.9 2.9l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.3 35.2 26.8 36 24 36c-5.2 0-9.5-3.1-11.3-7.5l-6.6 5.1C9.5 39.6 16.3 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.9 2.4-2.5 4.5-4.6 5.9l6.2 5.2C42.1 36.2 44 30.5 44 24c0-1.2-.1-2.4-.4-3.5z"/>
    </svg>
  )
}

interface OAuthButtonsProps {
  mode: 'signup' | 'login'
  plan?: string
}

export default function OAuthButtons({ mode }: OAuthButtonsProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const signInWithGoogle = async () => {
    setLoading(true)
    setError('')
    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      const redirectTo =
        typeof window !== 'undefined'
          ? `${window.location.origin}/auth/callback?next=/dashboard`
          : '/auth/callback?next=/dashboard'
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo },
      })
      if (oauthError) throw oauthError
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Google sign-in failed')
      setLoading(false)
    }
  }

  return (
    <div className="space-y-2.5">
      <button
        type="button"
        disabled={loading}
        onClick={signInWithGoogle}
        className="w-full flex items-center justify-center gap-3 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-black/5 disabled:opacity-50"
        style={{ borderColor: 'hsl(8 20% 82%)', color: 'hsl(5 25% 22%)', background: 'white' }}
      >
        {loading ? (
          <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
        ) : (
          <GoogleIcon />
        )}
        {loading
          ? 'Connecting to Google…'
          : `${mode === 'signup' ? 'Sign up' : 'Sign in'} with Google`}
      </button>
      {error && (
        <p className="text-xs text-destructive rounded-lg bg-destructive/10 px-3 py-2">{error}</p>
      )}
    </div>
  )
}
