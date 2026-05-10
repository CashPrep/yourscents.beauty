'use client'
import { useState, Suspense, Component, type ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// ── Error boundary ──────────────────────────────────────────────────────────
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
        <div
          className="min-h-screen flex items-center justify-center p-4"
          style={{ background: 'hsl(18 50% 97%)' }}
        >
          <div className="panel-glow w-full max-w-sm p-8 text-center">
            <p className="text-sm font-semibold mb-2" style={{ color: 'hsl(5 25% 22%)' }}>
              Couldn&apos;t load the signup form
            </p>
            <p className="text-xs mb-4" style={{ color: 'hsl(8 15% 52%)' }}>
              {this.state.error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-gold text-xs px-5 py-2"
            >
              Try again
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

// ── Env-var guard ────────────────────────────────────────────────────────────
function EnvGuard({ children }: { children: ReactNode }) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) {
    // Log to browser console so the Vercel deployment log also captures it.
    if (typeof window !== 'undefined') {
      console.error(
        '[YourScents] Missing Supabase env vars.\n' +
        'Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel → Settings → Environment Variables, then redeploy.'
      )
    }
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{ background: 'hsl(18 50% 97%)' }}
      >
        <div className="panel-glow w-full max-w-sm p-8 text-center">
          <p className="text-sm font-semibold mb-2" style={{ color: 'hsl(5 25% 22%)' }}>
            Configuration error
          </p>
          <p className="text-xs" style={{ color: 'hsl(8 15% 52%)' }}>
            Missing Supabase environment variables. Please contact support.
          </p>
        </div>
      </div>
    )
  }
  return <>{children}</>
}

function SignupForm() {
  const router       = useRouter()
  const searchParams = useSearchParams()
  const plan         = searchParams.get('plan') || 'free'

  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [name,     setName]     = useState('')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Lazy-init Supabase client inside the handler so a broken env var
    // never crashes the component before the user even sees the form.
    let supabase: ReturnType<typeof import('@/lib/supabase/client').createClient>
    try {
      const { createClient } = await import('@/lib/supabase/client')
      supabase = createClient()
    } catch {
      setError('Could not connect to authentication service. Please refresh and try again.')
      setLoading(false)
      return
    }

    // 1. Create the account
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name, plan },
        emailRedirectTo: undefined,
      },
    })

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    // 2. Ensure we have a live session — signUp may not return one on first call
    if (!data.session) {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
      if (signInError) {
        setError('Account created — please sign in.')
        router.push('/login')
        return
      }
    }

    // 3. Commit the session cookie to the server before navigating so the
    //    middleware and /api/checkout can see the authenticated user.
    router.refresh()

    // 4. Free plan — go straight to dashboard
    if (plan === 'free') {
      router.push('/dashboard')
      return
    }

    // 5. Paid plan — short wait for cookie propagation, then POST to /api/checkout
    await new Promise(r => setTimeout(r, 150))

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ plan }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error((body as { error?: string }).error || `Checkout failed (${res.status})`)
      }

      const { url } = await res.json() as { url: string }
      if (!url) throw new Error('No checkout URL returned')
      window.location.href = url
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong'
      setError(`Couldn't open checkout: ${msg}. Please try again or contact support.`)
      setLoading(false)
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

        <h1 className="text-2xl font-light serif mb-1.5 text-center">Join the girls ✨</h1>
        <p className="text-sm mb-7 text-center" style={{ color: 'hsl(8 15% 52%)' }}>
          {plan !== 'free'
            ? `Getting started with the ${plan.charAt(0).toUpperCase() + plan.slice(1)} plan 🌸`
            : 'Start free — no credit card needed 💕'}
        </p>

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-xs font-medium">Full Name</Label>
            <Input
              id="name" placeholder="Your name"
              value={name} onChange={e => setName(e.target.value)}
              required className="rounded-xl"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs font-medium">Email</Label>
            <Input
              id="email" type="email" placeholder="you@example.com"
              value={email} onChange={e => setEmail(e.target.value)}
              required className="rounded-xl"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-xs font-medium">Password</Label>
            <Input
              id="password" type="password" placeholder="Min. 8 characters"
              value={password} onChange={e => setPassword(e.target.value)}
              minLength={8} required className="rounded-xl"
            />
          </div>

          {error && (
            <p className="text-sm text-destructive rounded-lg bg-destructive/10 px-3 py-2">{error}</p>
          )}

          <Button type="submit" className="btn-gold w-full text-sm mt-1" disabled={loading}>
            {loading
              ? (plan !== 'free' ? 'Setting up checkout…' : 'Creating account…')
              : 'Create Account 🌸'}
          </Button>
        </form>

        <div className="rule my-5" />

        <p className="text-center text-xs" style={{ color: 'hsl(8 15% 52%)' }}>
          Already have an account?{' '}
          <Link href="/login" className="font-semibold hover:underline" style={{ color: 'hsl(8 48% 72%)' }}>
            Sign in
          </Link>
        </p>
        <p className="text-center text-xs mt-2" style={{ color: 'hsl(8 15% 52%)' }}>
          <Link href="/" className="hover:underline opacity-60">← Back to home</Link>
        </p>
      </div>
    </div>
  )
}

export default function SignupPage() {
  return (
    <FormErrorBoundary>
      <EnvGuard>
        <Suspense>
          <SignupForm />
        </Suspense>
      </EnvGuard>
    </FormErrorBoundary>
  )
}
