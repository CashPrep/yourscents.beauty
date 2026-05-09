'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Check, ArrowRight, Sparkles } from 'lucide-react'

const R        = 'hsl(8 48% 72%)'
const R_DEEP   = 'hsl(3 40% 58%)'
const R_BG     = 'hsl(8 56% 76% / 0.12)'
const R_BORDER = 'hsl(8 56% 76% / 0.32)'

async function startCheckout(plan: 'pro' | 'collector', setLoading: (v: boolean) => void, setError: (v: string) => void) {
  setLoading(true)
  setError('')
  try {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ plan }),
    })
    if (res.status === 401) {
      // Not logged in — send to signup with plan pre-selected
      window.location.href = `/signup?plan=${plan}`
      return
    }
    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      throw new Error(body.error || `Checkout error (${res.status})`)
    }
    const { url } = await res.json()
    if (!url) throw new Error('No checkout URL returned')
    window.location.href = url
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Something went wrong'
    setError(msg)
    setLoading(false)
  }
}

const FREE_FEATURES = [
  'Up to 3 fragrances in your wardrobe',
  'Scent DNA analysis',
  'Occasion planner',
  'Mood matcher',
  'Shareable scent card',
]

const PRO_FEATURES = [
  'Unlimited wardrobe',
  'Everything in Free',
  'Full stack scoring & combos',
  'Seasonal rotation planner',
  'Discovery feed',
  'Priority support',
]

const COLLECTOR_FEATURES = [
  'Everything in Pro',
  'Advanced layering notes',
  'Export wardrobe as PDF',
  'Early access to new features',
  'Priority 12-hour support',
  'Collector badge on scent card',
]

function PlanCard({
  name, price, period, features, cta, plan, highlight, badge,
}: {
  name: string
  price: string
  period: string
  features: string[]
  cta: string
  plan: 'free' | 'pro' | 'collector'
  highlight?: boolean
  badge?: string
}) {
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  const handleClick = () => {
    if (plan === 'free') {
      window.location.href = '/signup'
      return
    }
    startCheckout(plan, setLoading, setError)
  }

  return (
    <div
      className="relative flex flex-col rounded-3xl p-8"
      style={{
        background: highlight ? `linear-gradient(160deg, hsl(8 56% 76% / 0.14), hsl(8 56% 76% / 0.22))` : 'hsl(0 0% 100%)',
        border: highlight ? `2px solid ${R_BORDER}` : '1.5px solid hsl(10 25% 90%)',
        boxShadow: highlight ? `0 8px 40px hsl(8 56% 76% / 0.18)` : '0 2px 12px hsl(0 0% 0% / 0.04)',
      }}
    >
      {badge && (
        <div
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[11px] font-bold px-4 py-1 rounded-full"
          style={{ background: R, color: '#fff' }}
        >
          {badge}
        </div>
      )}

      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: R }}>{name}</p>
        <div className="flex items-end gap-1.5 mb-1">
          <span className="text-4xl font-light serif" style={{ color: 'hsl(5 25% 22%)' }}>{price}</span>
          {period && <span className="text-sm text-muted-foreground mb-1">{period}</span>}
        </div>
      </div>

      <ul className="space-y-3 flex-1 mb-8">
        {features.map(f => (
          <li key={f} className="flex items-start gap-2.5 text-sm">
            <Check size={14} className="mt-0.5 shrink-0" style={{ color: R }} />
            <span style={{ color: 'hsl(5 20% 35%)' }}>{f}</span>
          </li>
        ))}
      </ul>

      {error && (
        <p className="text-xs text-destructive mb-3 text-center">{error}</p>
      )}

      <button
        onClick={handleClick}
        disabled={loading}
        className={highlight ? 'btn-gold w-full py-3 text-sm flex items-center justify-center gap-2' : 'w-full py-3 text-sm rounded-xl font-medium border transition-colors flex items-center justify-center gap-2'}
        style={!highlight ? { borderColor: R_BORDER, color: R_DEEP, background: R_BG } : undefined}
      >
        {loading ? 'Opening checkout…' : <>{cta} {!loading && <ArrowRight size={14} />}</>}
      </button>
    </div>
  )
}

export default function PricingPage() {
  return (
    <div className="min-h-screen" style={{ background: 'hsl(18 50% 97%)' }}>

      {/* Nav */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-border/50 bg-background backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Your Scents" width={120} height={48} className="h-12 w-auto object-contain" />
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Sign in</Link>
            <Link href="/signup" className="btn-gold text-xs px-4 py-2">Get started free</Link>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full mb-5" style={{ background: R_BG, color: R_DEEP, border: `1px solid ${R_BORDER}` }}>
              <Sparkles size={12} />
              Simple pricing
            </div>
            <h1 className="text-4xl md:text-5xl font-normal serif mb-4">Your perfect scent plan.</h1>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
              Start free forever. Upgrade when your collection grows.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            <PlanCard
              name="Free"
              price="$0"
              period="forever"
              features={FREE_FEATURES}
              cta="Start for free"
              plan="free"
            />
            <PlanCard
              name="Pro"
              price="$7.99"
              period="/ month"
              features={PRO_FEATURES}
              cta="Get Pro"
              plan="pro"
              highlight
              badge="Most Popular 🌸"
            />
            <PlanCard
              name="Collector"
              price="$14.99"
              period="/ month"
              features={COLLECTOR_FEATURES}
              cta="Get Collector"
              plan="collector"
            />
          </div>

          {/* FAQ / trust */}
          <div className="mt-16 max-w-xl mx-auto space-y-5">
            {[
              { q: 'Can I cancel anytime?', a: 'Yes — cancel from your dashboard at any time. You keep access until the end of your billing period, no questions asked.' },
              { q: 'What payment methods are accepted?', a: 'All major credit and debit cards via Stripe. Your payment info is never stored on our servers.' },
              { q: 'Is my data private?', a: 'Absolutely. Your wardrobe is private by default. Your shareable scent card only shows what you choose to share.' },
            ].map(({ q, a }) => (
              <div key={q} className="panel p-6">
                <p className="text-sm font-semibold mb-1.5" style={{ color: 'hsl(5 25% 22%)' }}>{q}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-xs text-muted-foreground">
              Questions?{' '}
              <Link href="/contact" className="underline hover:text-foreground" style={{ color: R_DEEP }}>Contact us</Link>
              {' '}—{' '}
              <Link href="/terms" className="underline hover:text-foreground opacity-70">Terms</Link>
              {' · '}
              <Link href="/privacy" className="underline hover:text-foreground opacity-70">Privacy</Link>
            </p>
          </div>

        </div>
      </main>

    </div>
  )
}
