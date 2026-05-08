import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Search,
  Layers,
  CalendarDays,
  FlaskConical,
  ArrowRight,
  Check,
  Sparkles,
  Heart,
  Star,
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ─── Nav ─── */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl" aria-hidden>🌸</span>
            <span className="text-lg font-semibold tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
              Your Scents
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <Link href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</Link>
            <Link href="#vibes" className="hover:text-foreground transition-colors">Find Your Vibe</Link>
            <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Log in
            </Link>
            <Button asChild size="sm" className="rounded-full px-5 text-xs font-semibold">
              <Link href="/signup">Get Started 🎀</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>

        {/* ─── Hero ─── */}
        <section className="pt-40 pb-28 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="pill mb-6 mx-auto w-fit">✨ 70,000+ fragrances · real note data</div>
            <h1
              className="text-5xl md:text-6xl leading-[1.12] font-bold text-balance mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Your fragrance wardrobe,{' '}
              <em className="italic" style={{ color: 'hsl(340 60% 58%)' }}>finally organized</em> 🌹
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed mb-10">
              Stop guessing which perfume to wear. Your Scents learns your collection and tells you the
              <span className="font-medium text-foreground"> perfect scent</span> for every vibe — coffee run, date night,
              girls' trip, whatever.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button asChild size="lg" className="rounded-full px-8 text-sm font-semibold">
                <Link href="/signup">Start for free 💗</Link>
              </Button>
              <Link
                href="#how-it-works"
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                See how it works
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
            {/* Social proof */}
            <p className="mt-8 text-xs text-muted-foreground">
              💬 &ldquo;Finally an app that gets my fragrance obsession&rdquo; — loved by collectors everywhere
            </p>
          </div>
        </section>

        {/* ─── Petal divider ─── */}
        <div className="max-w-4xl mx-auto px-6"><div className="petal-line opacity-70" /></div>

        {/* ─── Vibes section ─── */}
        <section id="vibes" className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <p className="label-tag text-primary mb-3">Find Your Vibe ✨</p>
              <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                Every occasion deserves
                <em className="italic"> the right scent.</em>
              </h2>
              <p className="mt-3 text-muted-foreground text-sm max-w-md mx-auto">
                We match you to your collection based on the actual notes in your bottles — not just vibes (well, also vibes).
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  emoji: '☕',
                  occasion: 'Coffee Date',
                  desc: 'Warm, cozy, and just a little sweet. Think vanilla, sandalwood, and soft musks that feel like a hug.',
                  tag: 'casual & cute',
                },
                {
                  emoji: '🌙',
                  occasion: 'Date Night',
                  desc: 'Mysterious and magnetic. Rich florals, soft oud, and base notes that linger on your skin all night.',
                  tag: 'sultry & romantic',
                },
                {
                  emoji: '🌸',
                  occasion: 'Spring Brunch',
                  desc: 'Bright, clean, and effortless. Fresh florals and citrus that feel like sunshine in a bottle.',
                  tag: 'fresh & floral',
                },
                {
                  emoji: '📚',
                  occasion: 'Study Session',
                  desc: 'Clean, focused energy. Light woods, iris, and crisp whites that keep you feeling put-together.',
                  tag: 'clean & minimal',
                },
                {
                  emoji: '✈️',
                  occasion: 'Girls\' Trip',
                  desc: 'Adventurous and carefree. Aquatics, tropical florals, and breezy accords for wherever you\'re going.',
                  tag: 'fun & free',
                },
                {
                  emoji: '🎉',
                  occasion: 'Girls\' Night Out',
                  desc: 'Bold and unforgettable. Sexy musks, dark roses, and deep ambers that make everyone ask "what are you wearing?"',
                  tag: 'bold & sexy',
                },
              ].map(({ emoji, occasion, desc, tag }) => (
                <div key={occasion} className="card-soft flex flex-col gap-3 hover:shadow-md transition-shadow">
                  <div className="text-3xl">{emoji}</div>
                  <div className="pill w-fit">{tag}</div>
                  <h3 className="text-lg font-semibold" style={{ fontFamily: 'Playfair Display, serif' }}>{occasion}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Petal divider ─── */}
        <div className="max-w-4xl mx-auto px-6"><div className="petal-line opacity-70" /></div>

        {/* ─── How It Works ─── */}
        <section id="how-it-works" className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="label-tag text-primary mb-3">How It Works</p>
              <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                From bottle to bestie in 4 steps 🎀
              </h2>
            </div>
            <div className="grid md:grid-cols-4 gap-5">
              {[
                {
                  step: '01',
                  icon: Search,
                  emoji: '🔍',
                  title: 'Add Your Bottles',
                  body: 'Search 70,000+ fragrances and add your collection in seconds. Bottles, decants, samples — all of it.',
                },
                {
                  step: '02',
                  icon: FlaskConical,
                  emoji: '🧪',
                  title: 'We Decode the Notes',
                  body: 'We map every top, heart, and base note in your collection using verified data — automatically.',
                },
                {
                  step: '03',
                  icon: Layers,
                  emoji: '💡',
                  title: 'Get Layer Ideas',
                  body: 'See which of your perfumes pair perfectly together to create something totally unique to you.',
                },
                {
                  step: '04',
                  icon: CalendarDays,
                  emoji: '📅',
                  title: 'Pick By Occasion',
                  body: 'Tell us where you\'re going and we\'ll pull the perfect scent (or stack) from what you already own.',
                },
              ].map(({ step, emoji, title, body }) => (
                <div key={step} className="card-soft flex flex-col gap-3">
                  <span className="text-2xl">{emoji}</span>
                  <p className="label-tag text-primary">{step}</p>
                  <h3 className="font-semibold text-base" style={{ fontFamily: 'Playfair Display, serif' }}>{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Petal divider ─── */}
        <div className="max-w-4xl mx-auto px-6"><div className="petal-line opacity-70" /></div>

        {/* ─── Layering 101 ─── */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="label-tag text-primary mb-4">Layering 101 🌸</p>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-5" style={{ fontFamily: 'Playfair Display, serif' }}>
                Layering fragrances is literally
                <em className="italic"> an art form.</em>
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                The most iconic scents you smell on people? Often two or three layered together. Fragrance houses have been doing it for centuries — Arabian perfumers, French maisons, niche indie brands.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                The trick is knowing which notes complement each other vs. clash. Your Scents does the hard work — you just spray and go ✨
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Over 68% of Gen Z shoppers connect more with brands that feel warm and personal. We built this for you — the collector, the curious, the one who types fragrance names into TikTok search.
              </p>
            </div>
            <div className="space-y-4">
              {[
                {
                  icon: Sparkles,
                  term: 'Top Notes ✨',
                  body: 'The first spritz — citrus, herbs, light florals. They last ~30 min and set your opening vibe. Think of them as the intro to your scent story.',
                },
                {
                  icon: Heart,
                  term: 'Heart Notes 💗',
                  body: 'The main character. Florals, spices, and soft roses live here. This is what people smell on you for hours.',
                },
                {
                  icon: Star,
                  term: 'Base Notes 🌙',
                  body: 'The lingering signature — musks, woods, vanilla, amber. What stays on your skin and clothes. Matching base notes = perfect layering.',
                },
              ].map(({ icon: Icon, term, body }) => (
                <div key={term} className="card-soft flex gap-4">
                  <div className="mt-0.5 shrink-0">
                    <Icon size={18} className="text-primary" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>{term}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Petal divider ─── */}
        <div className="max-w-4xl mx-auto px-6"><div className="petal-line opacity-70" /></div>

        {/* ─── Pricing ─── */}
        <section id="pricing" className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="label-tag text-primary mb-3">Pricing 💸</p>
              <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                Pick your plan, girlie 🎀
              </h2>
              <p className="mt-3 text-muted-foreground text-sm">No weird fees. Cancel anytime. Start free.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: 'Free',
                  price: '$0',
                  period: 'forever',
                  description: 'For the casual collector 🌸',
                  features: [
                    'Up to 3 fragrances',
                    'Personal scent inventory (up to 3 bottles) 🧴',
                    '3 layering combos/day',
                    'Basic occasion matching',
                    '70,000+ fragrance search',
                  ],
                  cta: 'Start for Free',
                  href: '/signup',
                  highlighted: false,
                },
                {
                  name: 'Pro ✨',
                  price: '$7.99',
                  period: '/mo',
                  description: 'For the serious collector 💗',
                  features: [
                    'Unlimited fragrance wardrobe',
                    'Full personal scent inventory ✨',
                    'Unlimited layering combos',
                    'Full occasion planner',
                    'Note compatibility scores',
                    'Shareable scent cards',
                  ],
                  cta: 'Go Pro 💗',
                  href: '/signup?plan=pro',
                  highlighted: true,
                },
                {
                  name: 'Collector 🌹',
                  price: '$14.99',
                  period: '/mo',
                  description: 'For the obsessed collector 🎀',
                  features: [
                    'Everything in Pro',
                    'Scent inventory with bottle levels & notes 🌹',
                    'Public collection profile',
                    'Wishlist & ownership tracking',
                    'Stack history & favorites',
                    'Priority support',
                  ],
                  cta: 'Go Collector 🌹',
                  href: '/signup?plan=collector',
                  highlighted: false,
                },
              ].map((plan) => (
                <div
                  key={plan.name}
                  className={`rounded-3xl p-8 flex flex-col border ${
                    plan.highlighted
                      ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                      : 'border-border bg-card'
                  }`}
                >
                  {plan.highlighted && (
                    <p className="pill w-fit mb-4">Most loved 💗</p>
                  )}
                  <h3 className="text-2xl font-bold mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {plan.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-5">{plan.description}</p>
                  <div className="mb-7">
                    <span className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {plan.price}
                    </span>
                    <span className="text-sm text-muted-foreground ml-1">{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <Check size={13} className="mt-0.5 shrink-0 text-primary" strokeWidth={2.5} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    variant={plan.highlighted ? 'default' : 'outline'}
                    className="rounded-full text-xs font-semibold w-full"
                  >
                    <Link href={plan.href}>{plan.cta}</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* ─── Footer ─── */}
      <footer className="border-t border-border py-12 px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-xl font-bold mb-1 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                🌸 Your Scents
              </p>
              <p className="text-xs text-muted-foreground">Built for the fragrance-obsessed. 💗</p>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-5 text-xs text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
            </div>
          </div>
          <div className="petal-line opacity-40 mt-8 mb-5" />
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Your Scents. All rights reserved. ✨
          </p>
        </div>
      </footer>

    </div>
  )
}
