'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

// Inline SVG icons — no extra deps needed
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

function MicrosoftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 21 21" aria-hidden="true">
      <rect x="1" y="1" width="9" height="9" fill="#f25022"/>
      <rect x="11" y="1" width="9" height="9" fill="#7fba00"/>
      <rect x="1" y="11" width="9" height="9" fill="#00a4ef"/>
      <rect x="11" y="11" width="9" height="9" fill="#ffb900"/>
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 814 1000" aria-hidden="true" fill="currentColor">
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.3-164-39.3c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 391.8 15.5 337.4 15.5 285.4c0-104.2 67.8-159.2 134.2-159.2 50 0 91.5 32.6 121.9 32.6 29.4 0 75.8-34.5 133.4-34.5 21.4 0 108.2 1.9 160.3 100.2zm-156.7-181.7c26.9-30.9 47.4-74.1 47.4-117.3 0-6.4-.6-12.8-1.9-18.6-45.1 1.9-99 30.3-131.9 64.5-24.4 26.3-48.4 69.5-48.4 113.4 0 7.1.6 14.1 1.9 19.9 3.2.6 8.4 1.3 13.5 1.3 40.9 0 90-27.4 119.4-63.2z"/>
    </svg>
  )
}

interface OAuthButtonsProps {
  mode: 'signup' | 'login'
  plan?: string
}

export default function OAuthButtons({ mode, plan = 'free' }: OAuthButtonsProps) {
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError]     = useState('')

  const signInWith = async (provider: 'google' | 'azure' | 'apple') => {
    setLoading(provider)
    setError('')
    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      const redirectTo =
        typeof window !== 'undefined'
          ? `${window.location.origin}/auth/callback?next=/dashboard`
          : '/auth/callback?next=/dashboard'

      const options: Record<string, unknown> = { redirectTo }
      // Azure requires an extra param to show the Microsoft account picker
      if (provider === 'azure') {
        options.scopes = 'openid email profile'
      }

      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider,
        options,
      })
      if (oauthError) throw oauthError
      // Browser will redirect to provider — no further action needed
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'OAuth error'
      setError(msg)
      setLoading(null)
    }
  }

  const providers = [
    { id: 'google' as const,    label: 'Google',    Icon: GoogleIcon },
    { id: 'azure'  as const,    label: 'Microsoft', Icon: MicrosoftIcon },
    { id: 'apple'  as const,    label: 'Apple',     Icon: AppleIcon },
  ]

  return (
    <div className="space-y-2.5">
      {providers.map(({ id, label, Icon }) => (
        <button
          key={id}
          type="button"
          disabled={!!loading}
          onClick={() => signInWith(id)}
          className="w-full flex items-center justify-center gap-3 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-black/5 disabled:opacity-50"
          style={{ borderColor: 'hsl(8 20% 82%)', color: 'hsl(5 25% 22%)', background: 'white' }}
        >
          {loading === id ? (
            <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
          ) : (
            <Icon />
          )}
          {loading === id
            ? `Connecting to ${label}…`
            : `${mode === 'signup' ? 'Sign up' : 'Sign in'} with ${label}`}
        </button>
      ))}
      {error && (
        <p className="text-xs text-destructive rounded-lg bg-destructive/10 px-3 py-2">{error}</p>
      )}
    </div>
  )
}
