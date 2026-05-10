'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

// This page is shown right after signup.
// It polls Supabase every 3 s — the moment the user clicks the confirmation
// link in their email, Supabase sets the session cookie and the poll detects
// it, then auto-navigates to /dashboard without any extra user action.
export default function VerifyEmailPage() {
  const router = useRouter()
  const [dots, setDots]           = useState('.')
  const [resent, setResent]       = useState(false)
  const [resending, setResending] = useState(false)
  const [email, setEmail]         = useState('')

  // Animate the waiting dots
  useEffect(() => {
    const t = setInterval(() => setDots(d => d.length >= 3 ? '.' : d + '.'), 600)
    return () => clearInterval(t)
  }, [])

  // Read email from query param for the resend button
  useEffect(() => {
    const p = new URLSearchParams(window.location.search)
    setEmail(p.get('email') || '')
  }, [])

  // Poll for a live session every 3 s — fires after the user confirms email
  useEffect(() => {
    let stopped = false
    const poll = async () => {
      if (stopped) return
      try {
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          router.refresh()
          await new Promise(r => setTimeout(r, 100))
          router.push('/dashboard')
          return
        }
      } catch { /* ignore network errors */ }
      if (!stopped) setTimeout(poll, 3000)
    }
    const timer = setTimeout(poll, 3000)
    return () => { stopped = true; clearTimeout(timer) }
  }, [router])

  const handleResend = async () => {
    if (!email || resending) return
    setResending(true)
    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      await supabase.auth.resend({ type: 'signup', email })
      setResent(true)
    } catch { /* silent */ } finally {
      setResending(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: 'hsl(18 50% 97%)',
        backgroundImage:
          'radial-gradient(ellipse 70% 40% at 50% -5%, hsl(8 56% 76% / 0.12) 0%, transparent 65%)',
      }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl" style={{ background: 'hsl(10 60% 84% / 0.30)' }} />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-3xl" style={{ background: 'hsl(13 48% 65% / 0.18)' }} />
      </div>

      <div className="panel-glow relative w-full max-w-sm p-8 text-center">
        <Link href="/" className="flex items-center justify-center gap-2.5 mb-8">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'hsl(18 67% 96%)' }}>
            <Image src="/logo.png" alt="Your Scents" width={28} height={28} className="object-contain" />
          </div>
          <span className="text-lg font-medium serif" style={{ color: 'hsl(5 25% 22%)' }}>Your Scents</span>
        </Link>

        {/* Envelope animation */}
        <div className="text-5xl mb-5 select-none">📧</div>

        <h1 className="text-2xl font-light serif mb-2">Check your email 🌸</h1>
        <p className="text-sm mb-1" style={{ color: 'hsl(8 15% 52%)' }}>
          We sent a confirmation link to
        </p>
        {email && (
          <p className="text-sm font-semibold mb-4" style={{ color: 'hsl(5 25% 22%)' }}>{email}</p>
        )}
        <p className="text-sm mb-6" style={{ color: 'hsl(8 15% 52%)' }}>
          Click the link in the email and you&apos;ll be signed in automatically{dots}
        </p>

        {/* Spinner while waiting */}
        <div className="flex justify-center mb-6">
          <div
            className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: 'hsl(8 48% 72%)', borderTopColor: 'transparent' }}
          />
        </div>

        <div className="rule mb-5" />

        {!resent ? (
          <button
            onClick={handleResend}
            disabled={!email || resending}
            className="text-xs hover:underline disabled:opacity-40"
            style={{ color: 'hsl(8 48% 72%)' }}
          >
            {resending ? 'Resending…' : "Didn't get it? Resend email"}
          </button>
        ) : (
          <p className="text-xs" style={{ color: 'hsl(8 48% 72%)' }}>✅ Resent! Check your inbox.</p>
        )}

        <p className="text-xs mt-3" style={{ color: 'hsl(8 15% 52%)' }}>
          Wrong email?{' '}
          <Link href="/signup" className="hover:underline" style={{ color: 'hsl(8 48% 72%)' }}>Start over</Link>
        </p>
      </div>
    </div>
  )
}
