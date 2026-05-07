import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sparkles, Search, Layers, Calendar, Star, Check } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-primary">ScentStack</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost">Log in</Button>
          </Link>
          <Link href="/signup">
            <Button>Get Started Free</Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground rounded-full px-4 py-1.5 text-sm font-medium mb-6">
          <Sparkles className="h-3.5 w-3.5" />
          Powered by 70,000+ real fragrances
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
          Layer your scents.<br />
          <span className="text-primary">Elevate every occasion.</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          ScentStack analyzes the real notes in your fragrances and tells you the best occasions, the best combinations, and even creates custom stacks for any event — using only what you already own.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/signup">
            <Button size="lg" className="text-base px-8">Start for Free</Button>
          </Link>
          <Link href="#how-it-works">
            <Button size="lg" variant="outline" className="text-base px-8">See How It Works</Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section id="how-it-works" className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-14">Everything you need for your scent wardrobe</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Search, title: 'Find Any Fragrance', desc: 'Search from 70,000+ real perfumes and colognes. Add them to your personal wardrobe.' },
            { icon: Layers, title: 'Stack & Layer', desc: 'Discover combinations from your own collection that create entirely new scent profiles.' },
            { icon: Calendar, title: 'Occasion Planner', desc: 'Choose an occasion and ScentStack builds the perfect stack from what you own.' },
            { icon: Star, title: 'Real Note Data', desc: 'Every suggestion is backed by real top, middle, and base notes — nothing is made up.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white rounded-2xl p-6 shadow-sm border">
              <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center mb-4">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">Simple, honest pricing</h2>
        <p className="text-center text-muted-foreground mb-14">No hidden fees. Cancel anytime.</p>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: 'Free',
              price: '$0',
              period: 'forever',
              features: ['Up to 10 fragrances', '3 stack suggestions/day', 'Basic occasion matching', 'Search all 70k+ fragrances'],
              cta: 'Get Started',
              href: '/signup',
              highlighted: false,
            },
            {
              name: 'Pro',
              price: '$7.99',
              period: '/month',
              features: ['Unlimited fragrances', 'Unlimited stacks', 'Occasion planner', 'Note compatibility scores', 'Shareable scent cards'],
              cta: 'Start Pro',
              href: '/signup?plan=pro',
              highlighted: true,
            },
            {
              name: 'Collector',
              price: '$14.99',
              period: '/month',
              features: ['Everything in Pro', 'Public collection profile', 'Wishlist & owned tracking', 'Stack history & favorites', 'Priority support'],
              cta: 'Go Collector',
              href: '/signup?plan=collector',
              highlighted: false,
            },
          ].map((plan) => (
            <div key={plan.name} className={`rounded-2xl p-8 border ${
              plan.highlighted ? 'bg-primary text-primary-foreground border-primary shadow-xl scale-105' : 'bg-white'
            }`}>
              <div className="mb-6">
                <p className={`text-sm font-medium mb-1 ${plan.highlighted ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>{plan.name}</p>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className={`text-sm mb-1 ${plan.highlighted ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>{plan.period}</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href={plan.href}>
                <Button className="w-full" variant={plan.highlighted ? 'secondary' : 'default'}>
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white mt-20 py-10 text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="font-semibold text-foreground">ScentStack</span>
        </div>
        <p>© {new Date().getFullYear()} ScentStack. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-3">
          <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
          <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
        </div>
      </footer>
    </div>
  )
}
