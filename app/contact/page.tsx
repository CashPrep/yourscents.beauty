'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Mail, MessageCircle, Clock } from 'lucide-react'

const R        = 'hsl(8 48% 72%)'
const R_DEEP   = 'hsl(3 40% 58%)'
const R_BG     = 'hsl(8 56% 76% / 0.12)'
const R_BORDER = 'hsl(8 56% 76% / 0.32)'

const TOPICS = [
  'Billing & subscription questions',
  'Account access or login issues',
  'Feature requests or feedback',
  'Report a bug',
  'Data deletion requests',
]

export default function ContactPage() {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [opened,  setOpened]  = useState(false)

  const handleOpen = () => {
    const to  = 'support@yourscents.beauty'
    const sub = encodeURIComponent(subject || 'Support request')
    const bod = encodeURIComponent(message)
    window.location.href = `mailto:${to}?subject=${sub}&body=${bod}`
    setOpened(true)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Nav */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-border/50 bg-background backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Your Scents" width={120} height={48} className="h-12 w-auto object-contain" />
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
                  <p className="text-sm text-muted-foreground">
                    We typically respond within <strong className="text-foreground">24 hours</strong>, Monday through Friday.
                  </p>
                </div>
              </div>

              <div className="panel p-6 flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: R_BG }}>
                  <MessageCircle size={16} strokeWidth={1.5} style={{ color: R }} />
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1">Common Topics</p>
                  <ul className="text-sm text-muted-foreground space-y-1 mt-1">
                    {TOPICS.map(t => <li key={t}>— {t}</li>)}
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

            {/* Contact form — opens native mail app with pre-filled content */}
            <div className="panel-glow p-8">
              {opened ? (
                <div className="text-center py-10">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ background: R_BG, border: `1px solid ${R_BORDER}` }}
                  >
                    <Mail size={22} style={{ color: R }} strokeWidth={1.5} />
                  </div>
                  <h2 className="text-xl font-normal serif mb-2">Opening your mail app 🌸</h2>
                  <p className="text-sm text-muted-foreground">
                    Your message has been pre-filled. Hit send and we&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setOpened(false); setSubject(''); setMessage('') }}
                    className="mt-6 text-sm hover:underline"
                    style={{ color: R_DEEP }}
                  >
                    Start over
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  <p className="text-sm font-semibold">Send us a message</p>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Subject</label>
                    <input
                      type="text"
                      placeholder="e.g. Billing question, bug report\u2026"
                      value={subject}
                      onChange={e => setSubject(e.target.value)}
                      className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Message</label>
                    <textarea
                      rows={6}
                      placeholder="Tell us what\u2019s going on\u2026"
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 resize-none transition-colors"
                    />
                  </div>

                  <button
                    onClick={handleOpen}
                    className="btn-gold w-full py-3 text-sm"
                  >
                    Open Mail App 🌸
                  </button>

                  <p className="text-[11px] text-center text-muted-foreground">
                    Or email directly:{' '}
                    <a
                      href="mailto:support@yourscents.beauty"
                      className="underline hover:text-foreground"
                      style={{ color: R_DEEP }}
                    >
                      support@yourscents.beauty
                    </a>
                  </p>
                </div>
              )}
            </div>

          </div>

          <div className="mt-16 pt-8 border-t border-border flex flex-wrap gap-6 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms"   className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link href="/"        className="hover:text-foreground transition-colors">\u2190 Back to home</Link>
          </div>

        </div>
      </main>

      <footer className="border-t border-border py-8 px-6" style={{ background: 'hsl(10 45% 95%)' }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Your Scents. All rights reserved.</p>
        </div>
      </footer>

    </div>
  )
}
