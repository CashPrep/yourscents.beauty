'use client'
import { useState, Component, type ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const R = 'hsl(8 48% 72%)'

// ── Error boundary ──
class FormErrorBoundary extends Component<
  { children: ReactNode },
  { error: string | null }
> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { error: null }
  }
  static getDerivedStateFromError(err: unknown) {
    const msg = err instanceof Error ? err.message : 'Something went wrong loading this page.'
    return { error: msg }
  }
  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'hsl(18 50% 97%)' }}>
          <div className="panel-glow w-full max-w-sm p-8 text-center">
            <p className="text-sm font-semibold mb-2" style={{ color: 'hsl(5 25% 22%)' }}>Couldn&apos;t load this page</p>
            <p className="text-xs mb-4" style={{ color: 'hsl(8 15% 52%)' }}>{this.state.error}</p>
            <button onClick={() => window.location.reload()} className="btn-gold text-xs px-5 py-2">Try again</button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

// ── Env-var guard ──
function EnvGuard({ children }: { children: ReactNode }) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'hsl(18 50% 97%)' }}>
        <div className="panel-glow w-full max-w-sm p-8 text-center">
          <p className="text-sm font-semibold mb-2" style={{ color: 'hsl(5 25% 22%)' }}>Configuration error</p>
          <p className="text-xs" style={{ color: 'hsl(8 15% 52%)' }}>Missing Supabase environment variables. Please contact support.</p>
        </div>
      </div>
    )
  }
  return <>{children}</>
}

function ForgotPasswordForm() {
  const [email,   setEmail]   = useState('')
  const [loading, setLoading] = useState(false)
  const [done,    setDone]    = useState(false)
  const [error,   setError]   = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Lazy-init: only create the client on submit
    let supabase: ReturnType<typeof import('@/lib/supabase/client').createClient>
    try {
      const { createClient } = await import('@/lib/supabase/client')
      supabase = createClient()
    } catch {
      setError('Could not connect to authentication service. Please refresh and try again.')
      setLoading(false)
      return
    }

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
    })

    if (resetError) {
      setError(resetError.message)
      setLoading(false)
    } else {
      setDone(true)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: 'hsl(18 50% 97%)',
        backgroundImage:
          'radial-gradient(ellipse 70% 40% at 50% -5%, hsl(8 56% 76% / 0.12) 0%, transparent 65%), radial-gradient(ellipse 50% 30% at 100% 100%, hsl(13 48% 65% / 0.08) 0%, transparent 60%)',
      }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl" style={{ background: 'hsl(10 60% 84% / 0.30)' }} />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-3xl" style={{ background: 'hsl(13 48% 65% / 0.18)' }} />
      </div>

      <div className="panel-glow relative w-full max-w-sm p-8">
        <Link href="/" className="flex items-center justify-center gap-2.5 mb-8">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'hsl(18 67% 96%)' }}>
            <Image src="/logo.png" alt="Your Scents" width={28} height={28} className="object-contain" />
          </div>
          <span className="text-lg font-medium serif" style={{ color: 'hsl(5 25% 22%)' }}>Your Scents</span>
        </Link>

        {done ? (
          <div className="text-center py-4">
            <p className="text-2xl mb-3">📬</p>
            <h1 className="text-xl font-light serif mb-2">Check your inbox</h1>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              We sent a password reset link to <strong className="text-foreground">{email}</strong>. It expires in 1 hour.
            </p>
            <p className="text-xs text-muted-foreground">
              Didn&apos;t receive it?{' '}
              <button onClick={() => setDone(false)} className="underline hover:text-foreground" style={{ color: R }}>Try again</button>
            </p>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-light serif mb-1.5 text-center">Reset password</h1>
            <p className="text-sm mb-7 text-center" style={{ color: 'hsl(8 15% 52%)' }}>
              Enter your email and we&apos;ll send a reset link.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-medium">Email</Label>
                <Input
                  id="email" type="email" placeholder="you@example.com"
                  value={email} onChange={e => setEmail(e.target.value)}
                  required className="rounded-xl"
                />
              </div>
              {error && (
                <p className="text-sm text-destructive rounded-lg bg-destructive/10 px-3 py-2">{error}</p>
              )}
              <Button type="submit" className="btn-gold w-full text-sm" disabled={loading}>
                {loading ? 'Sending…' : 'Send Reset Link 🌸'}
              </Button>
            </form>
          </>
        )}

        <div className="rule my-5" />
        <p className="text-center text-xs" style={{ color: 'hsl(8 15% 52%)' }}>
          Remember it?{' '}
          <Link href="/login" className="font-semibold hover:underline" style={{ color: R }}>Sign in</Link>
        </p>
        <p className="text-center text-xs mt-2" style={{ color: 'hsl(8 15% 52%)' }}>
          <Link href="/" className="hover:underline opacity-60">← Back to home</Link>
        </p>
      </div>
    </div>
  )
}

export default function ForgotPasswordPage() {
  return (
    <FormErrorBoundary>
      <EnvGuard>
        <ForgotPasswordForm />
      </EnvGuard>
    </FormErrorBoundary>
  )
}
