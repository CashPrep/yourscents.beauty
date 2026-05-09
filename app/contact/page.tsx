'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Mail, MessageCircle, Clock } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const R        = 'hsl(8 48% 72%)'
const R_DEEP   = 'hsl(3 40% 58%)'
const R_BG     = 'hsl(8 56% 76% / 0.12)'
const R_BORDER = 'hsl(8 56% 76% / 0.32)'

export default function ContactPage() {
  const [name,    setName]    = useState('')
  const [email,   setEmail]   = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [done,    setDone]    = useState(false)
  const [error,   setError]   = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('https://formspree.io/f/yourscents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      })
      if (res.ok) {
        setDone(true)
      } else {
        setError('Something went wrong. Please email us directly at support@yourscents.beauty')
      }
    } catch {
      setError('Network error. Please email us directly at support@yourscents.beauty')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Nav */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-border/50 bg-background backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-0">
            <Image src="/logo.png" alt="Your Scents Logo" width={120} height={48} className="h-12 w-auto object-contain" />
          </Link>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">← Back to home</Link>
        </div>
      </header>

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: R }}>Support</p>
            <h1 className="text-4xl font-normal serif mb-3">Get in touch.</h1>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
              Have a question, issue, or just want to say hi? We&apos;re here and we respond fast.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-start">

            {/* Info cards */}
            <div className="space-y-4">
              <div className="panel p-6 flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: R_BG }}>
                  <Mail size={16} strokeWidth={1.5} style={{ color: R }} />
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1">Email Support</p>
                  <p className="text-sm text-muted-foreground mb-2">For billing, account issues, or anything else.</p>
                  <a
                    href="mailto:support@yourscents.beauty"
                    className="text-sm font-medium hover:underline"
                    style={{ color: R_DEEP }}
                  >
                    support@yourscents.beauty
                  </a>
                </div>
              </div>

              <div className="panel p-6 flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: R_BG }}>
                  <Clock size={16} strokeWidth={1.5} style={{ color: R }} />
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1">Response Time</p>
                  <p className="text-sm text-muted-foreground">We typically respond within <strong className="text-foreground">24 hours</strong>, Monday through Friday.</p>
                </div>
              </div>

              <div className="panel p-6 flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: R_BG }}>
                  <MessageCircle size={16} strokeWidth={1.5} style={{ color: R }} />
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1">Common Topics</p>
                  <ul className="text-sm text-muted-foreground space-y-1 mt-1">
                    <li>— Billing &amp; subscription questions</li>
                    <li>— Account access or login issues</li>
                    <li>— Feature requests or feedback</li>
                    <li>— Report a bug</li>
                    <li>— Data deletion requests</li>
                  </ul>
                </div>
              </div>

              <div
                className="rounded-2xl p-5"
                style={{ background: R_BG, border: `1px solid ${R_BORDER}` }}
              >
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Collector subscribers</strong> receive priority support
                  with responses within 12 hours. Upgrade anytime from your{' '}
                  <Link href="/dashboard" className="underline hover:text-foreground">dashboard</Link>.
                </p>
              </div>
            </div>

            {/* Contact form */}
            <div className="panel-glow p-8">
              {done ? (
                <div className="text-center py-10">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ background: R_BG, border: `1px solid ${R_BORDER}` }}
                  >
                    <Mail size={22} style={{ color: R }} strokeWidth={1.5} />
                  </div>
                  <h2 className="text-xl font-normal serif mb-2">Message sent 🌸</h2>
                  <p className="text-sm text-muted-foreground">
                    Thanks for reaching out! We&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setDone(false); setName(''); setEmail(''); setSubject(''); setMessage('') }}
                    className="mt-6 text-sm hover:underline"
                    style={{ color: R_DEEP }}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <p className="text-sm font-semibold mb-5">Send us a message</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground">Name</label>
                      <Input
                        required
                        placeholder="Your name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground">Email</label>
                      <Input
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Subject</label>
                    <Input
                      required
                      placeholder="e.g. Billing question, bug report…"
                      value={subject}
                      onChange={e => setSubject(e.target.value)}
                      className="rounded-xl"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Message</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell us what&apos;s going on…"
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 resize-none transition-colors"
                      style={{ '--tw-ring-color': R_BORDER } as React.CSSProperties}
                    />
                  </div>

                  {error && (
                    <p className="text-sm rounded-lg bg-destructive/10 text-destructive px-3 py-2">{error}</p>
                  )}

                  <Button
                    type="submit"
                    className="btn-gold w-full py-3 text-sm"
                    disabled={loading}
                  >
                    {loading ? 'Sending…' : 'Send Message 🌸'}
                  </Button>

                  <p className="text-[11px] text-center text-muted-foreground">
                    Or email directly:{' '}
                    <a href="mailto:support@yourscents.beauty" className="underline hover:text-foreground" style={{ color: R_DEEP }}>
                      support@yourscents.beauty
                    </a>
                  </p>
                </form>
              )}
            </div>

          </div>

          {/* Footer nav */}
          <div className="mt-16 pt-8 border-t border-border flex flex-wrap gap-6 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms"   className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link href="/"        className="hover:text-foreground transition-colors">← Back to home</Link>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6" style={{ background: 'hsl(10 45% 95%)' }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Your Scents. All rights reserved.</p>
        </div>
      </footer>

    </div>
  )
}
