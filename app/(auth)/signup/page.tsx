'use client'
import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const ROSE = 'hsl(340 55% 62%)'

function SignupForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const plan = searchParams.get('plan') || 'free'
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

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

    if (!data.session) {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
      if (signInError) {
        setError('Account created — please sign in.')
        router.push('/login')
        return
      }
    }

    if (plan !== 'free') {
      router.push(`/api/checkout?plan=${plan}`)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      {/* Rose blush background accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl" style={{ background: 'hsl(340 55% 88% / 0.35)' }} />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-3xl" style={{ background: 'hsl(300 30% 88% / 0.28)' }} />
      </div>

      <div className="relative bg-card border border-border rounded-2xl shadow-lg p-8 w-full max-w-sm">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2.5 mb-8">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: ROSE }}>
            <span className="text-white text-sm font-bold">S</span>
          </div>
          <span className="text-lg font-medium serif">Your Scents</span>
        </Link>

        <h1 className="text-2xl font-light serif mb-1.5 text-center">Join the girls ✨</h1>
        <p className="text-muted-foreground text-sm mb-7 text-center">
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
          {error && <p className="text-sm text-destructive rounded-lg bg-destructive/10 px-3 py-2">{error}</p>}
          <Button
            type="submit"
            className="w-full rounded-full font-semibold text-sm mt-1"
            style={{ background: ROSE, color: '#fff' }}
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create Account 🌸'}
          </Button>
        </form>

        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-card px-2 text-muted-foreground">or</span>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold hover:underline" style={{ color: ROSE }}>
            Sign in
          </Link>
        </p>
        <p className="text-center text-xs text-muted-foreground mt-2">
          <Link href="/" className="hover:underline opacity-60">← Back to home</Link>
        </p>
      </div>
    </div>
  )
}

export default function SignupPage() {
  return (
    <Suspense>
      <SignupForm />
    </Suspense>
  )
}
