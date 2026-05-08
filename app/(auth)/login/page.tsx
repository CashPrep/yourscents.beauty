'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const ROSE = 'hsl(340 55% 62%)'
const ROSE_HOVER = 'hsl(340 55% 55%)'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
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

        <h1 className="text-2xl font-light serif mb-1.5 text-center">Welcome back 🌸</h1>
        <p className="text-muted-foreground text-sm mb-7 text-center">Sign in to your fragrance wardrobe</p>

        <form onSubmit={handleLogin} className="space-y-4">
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
              id="password" type="password" placeholder="Your password"
              value={password} onChange={e => setPassword(e.target.value)}
              required className="rounded-xl"
            />
          </div>
          {error && <p className="text-sm text-destructive rounded-lg bg-destructive/10 px-3 py-2">{error}</p>}
          <Button
            type="submit"
            className="w-full rounded-full font-semibold text-sm mt-1"
            style={{ background: ROSE, color: '#fff' }}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In ✨'}
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
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="font-semibold hover:underline" style={{ color: ROSE }}>
            Sign up free 🌸
          </Link>
        </p>
        <p className="text-center text-xs text-muted-foreground mt-2">
          <Link href="/" className="hover:underline opacity-60">← Back to home</Link>
        </p>
      </div>
    </div>
  )
}
