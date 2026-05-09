'use client'
import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const R = 'hsl(8 48% 72%)'

function ResetPasswordForm() {
  const router  = useRouter()
  const supabase = createClient()
  const [password,  setPassword]  = useState('')
  const [confirm,   setConfirm]   = useState('')
  const [loading,   setLoading]   = useState(false)
  const [done,      setDone]      = useState(false)
  const [error,     setError]     = useState('')
  const [ready,     setReady]     = useState(false)

  // Supabase fires onAuthStateChange with event PASSWORD_RECOVERY once the
  // magic-link token from the reset email has been exchanged for a session.
  // We must wait for this before allowing the user to set a new password —
  // otherwise updateUser() will fail with "not authenticated".
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') {
        setReady(true)
      }
    })
    // Also check if a session already exists (user landed here via callback)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setReady(true)
    })
    return () => subscription.unsubscribe()
  }, [supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    setLoading(true)
    setError('')

    const { error: updateError } = await supabase.auth.updateUser({ password })
    if (updateError) {
      setError(updateError.message)
      setLoading(false)
    } else {
      setDone(true)
      // Give the user a moment to read the success message, then go to dashboard
      setTimeout(() => router.push('/dashboard'), 2000)
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
            <p className="text-2xl mb-3">✅</p>
            <h1 className="text-xl font-light serif mb-2">Password updated!</h1>
            <p className="text-sm text-muted-foreground">Redirecting you to your dashboard…</p>
          </div>
        ) : !ready ? (
          <div className="text-center py-8">
            <div className="w-6 h-6 rounded-full border-2 border-t-transparent animate-spin mx-auto mb-4" style={{ borderColor: R, borderTopColor: 'transparent' }} />
            <p className="text-sm text-muted-foreground">Verifying your reset link…</p>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-light serif mb-1.5 text-center">New password</h1>
            <p className="text-sm mb-7 text-center" style={{ color: 'hsl(8 15% 52%)' }}>
              Choose a strong password for your account.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-xs font-medium">New Password</Label>
                <Input
                  id="password" type="password" placeholder="Min. 8 characters"
                  value={password} onChange={e => setPassword(e.target.value)}
                  minLength={8} required className="rounded-xl"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="confirm" className="text-xs font-medium">Confirm Password</Label>
                <Input
                  id="confirm" type="password" placeholder="Repeat your password"
                  value={confirm} onChange={e => setConfirm(e.target.value)}
                  minLength={8} required className="rounded-xl"
                />
              </div>
              {error && (
                <p className="text-sm text-destructive rounded-lg bg-destructive/10 px-3 py-2">{error}</p>
              )}
              <Button type="submit" className="btn-gold w-full text-sm" disabled={loading}>
                {loading ? 'Updating…' : 'Update Password 🌸'}
              </Button>
            </form>
          </>
        )}

        <div className="rule my-5" />
        <p className="text-center text-xs" style={{ color: 'hsl(8 15% 52%)' }}>
          <Link href="/" className="hover:underline opacity-60">← Back to home</Link>
        </p>
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  )
}
