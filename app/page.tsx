import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Search,
  Layers,
  CalendarDays,
  FlaskConical,
  ArrowRight,
  Check,
  BookOpen,
  Wind,
  Droplets,
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ─── Navigation ─── */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="text-[10px] editorial-cap text-muted-foreground tracking-widest">✦</span>
            <span className="text-lg font-medium tracking-tight" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 500 }}>
              ScentStack
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <Link href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</Link>
            <Link href="#the-craft" className="hover:text-foreground transition-colors">The Craft</Link>
            <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Log in
            </Link>
            <Button asChild size="sm" className="rounded-sm px-5 text-xs tracking-wide font-medium">
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>

        {/* ─── Hero ─── */}
        <section className="pt-40 pb-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="editorial-cap text-muted-foreground mb-8 tracking-widest">
              70,000+ Fragrances · Real Note Data · Built for Collectors
            </p>
            <h1 className="text-5xl md:text-7xl leading-[1.08] font-light text-balance mb-8"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }}>
              Your fragrance wardrobe,{' '}
              <em className="italic font-light" style={{ color: 'hsl(340 28% 42%)' }}>intelligently</em>{' '}
              organized.
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed mb-12">
              ScentStack analyzes the actual top, heart, and base notes of every fragrance you own —
              then tells you when to wear them, how to layer them, and what occasions they were made for.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="rounded-sm px-8 text-sm tracking-wide">
                <Link href="/signup">Start Your Collection</Link>
              </Button>
              <Link
                href="#how-it-works"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                See how it works
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* ─── Divider ─── */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="gold-line opacity-60" />
        </div>

        {/* ─── Editorial Intro (The Craft of Fragrance Layering) ─── */}
        <section id="the-craft" className="py-28 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-start">
            <div>
              <p className="editorial-cap text-muted-foreground mb-5">The Craft</p>
              <h2 className="text-4xl md:text-5xl font-light leading-tight mb-7"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Fragrance layering is an ancient art.
                <em className="italic"> Most people do it wrong.</em>
              </h2>
              <div className="prose prose-sm text-muted-foreground leading-loose space-y-4 max-w-none">
                <p>
                  The practice of layering — wearing two or more fragrances simultaneously — dates to ancient
                  Mesopotamia, where oils of myrrh, cedar, and labdanum were combined to tell a story on the skin.
                  Arabian perfumery codified the technique into <em>bakhoor</em> and <em>attar</em> blending,
                  traditions that still inform modern niche houses like Amouage and Zoologist.
                </p>
                <p>
                  The error most modern wearers make is treating layering as random experimentation. In reality,
                  it follows the same principles as music harmony: like notes amplify, unlike notes contrast, and
                  the ratio of top-to-base determines what your skin reads first, last, and longest.
                </p>
                <p>
                  ScentStack applies this logic algorithmically — cross-referencing the full note pyramids of your
                  owned fragrances against thousands of documented accords to surface combinations that actually work.
                </p>
              </div>
            </div>
            <div className="space-y-6 pt-2">
              {[
                {
                  icon: Wind,
                  term: 'Top Notes',
                  body: 'The first impression — citrus, aromatic herbs, light aldehydes. They evaporate within 15–30 minutes and set the opening mood. When layering, match or contrast tops deliberately; clashing tops create olfactory confusion.',
                },
                {
                  icon: Droplets,
                  term: 'Heart Notes',
                  body: 'The soul of the fragrance. Florals, spices, and resins live here. The heart blooms as the top fades and dominates for 1–4 hours. Complementary hearts — say, rose and oud — are the foundation of classic Oriental layering.',
                },
                {
                  icon: BookOpen,
                  term: 'Base Notes',
                  body: 'The signature left on fabric and skin. Musks, ambers, woods, and animalics anchor the composition for 6–24+ hours. When two fragrances share base families, they fuse rather than compete — making them ideal layering candidates.',
                },
              ].map(({ icon: Icon, term, body }) => (
                <div key={term} className="flex gap-5 p-5 border border-border rounded-sm bg-card">
                  <div className="mt-1 shrink-0">
                    <Icon size={18} className="text-muted-foreground" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-1.5" style={{ fontFamily: 'DM Sans, sans-serif' }}>{term}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Divider ─── */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="gold-line opacity-60" />
        </div>

        {/* ─── How It Works ─── */}
        <section id="how-it-works" className="py-28 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 max-w-lg">
              <p className="editorial-cap text-muted-foreground mb-4">How It Works</p>
              <h2 className="text-4xl font-light leading-snug" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                From bottle to intelligence in four steps.
              </h2>
            </div>
            <div className="grid md:grid-cols-4 gap-px bg-border">
              {[
                {
                  step: '01',
                  icon: Search,
                  title: 'Build Your Wardrobe',
                  body: 'Search from 70,000+ catalogued fragrances by house, family, or note. Add each bottle, decant, or sample you own.',
                },
                {
                  step: '02',
                  icon: FlaskConical,
                  title: 'Note Analysis',
                  body: 'We map the full pyramidal structure of each fragrance — top, heart, and base — using verified community and house data.',
                },
                {
                  step: '03',
                  icon: Layers,
                  title: 'Stack Recommendations',
                  body: 'Our algorithm identifies which pairs and trios from your collection share harmonious accords and complementary drydowns.',
                },
                {
                  step: '04',
                  icon: CalendarDays,
                  title: 'Occasion Matching',
                  body: 'Tell us the occasion — office, date night, black tie, outdoor summer — and we pull the ideal stack from what you already own.',
                },
              ].map(({ step, icon: Icon, title, body }) => (
                <div key={step} className="bg-card p-8">
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-xs text-muted-foreground editorial-cap">{step}</span>
                    <Icon size={16} className="text-muted-foreground" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-light mb-3" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem' }}>
                    {title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Occasion Guide (Educational) ─── */}
        <section className="py-28 px-6 bg-card border-y border-border">
          <div className="max-w-6xl mx-auto">
            <div className="mb-14 max-w-lg">
              <p className="editorial-cap text-muted-foreground mb-4">Occasion Intelligence</p>
              <h2 className="text-4xl font-light leading-snug" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Not every fragrance belongs in every room.
              </h2>
              <p className="mt-4 text-muted-foreground text-sm leading-relaxed max-w-md">
                The relationship between fragrance and environment is governed by physics as much as aesthetics.
                Temperature, humidity, and social proximity all affect diffusion, projection, and longevity.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  occasion: 'Office & Professional',
                  guidance: 'In close quarters, projection becomes intrusion. Lean toward low-sillage musks, clean woods (sandalwood, cedar), and soft ambers. Avoid heavy ouds, indolic florals, or anything reminiscent of nightlife.',
                  notes: 'Ideal notes: clean musks, vetiver, iris, light cedar, sheer florals',
                },
                {
                  occasion: 'Evening & Formal',
                  guidance: "Cooler evening air slows evaporation — ideal for heavy musks, labdanum, and animalic bases that would overpower in daylight. This is where a fragrance's base notes become its strength.",
                  notes: 'Ideal notes: oud, amber, patchouli, vanilla, dark florals, resins',
                },
                {
                  occasion: 'Outdoor & Warm Weather',
                  guidance: 'Heat accelerates evaporation drastically — what projects beautifully at 65°F will become overwhelming at 85°F. Opt for aquatics, citrus, and green notes that breathe rather than suffocate.',
                  notes: 'Ideal notes: neroli, petitgrain, marine accords, grass, light woods',
                },
              ].map(({ occasion, guidance, notes }) => (
                <div key={occasion} className="border border-border p-7 rounded-sm">
                  <h3 className="text-base font-medium mb-4" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.15rem', fontWeight: 500 }}>
                    {occasion}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{guidance}</p>
                  <p className="text-xs text-muted-foreground/70 italic">{notes}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Pricing ─── */}
        <section id="pricing" className="py-28 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-14 max-w-sm">
              <p className="editorial-cap text-muted-foreground mb-4">Pricing</p>
              <h2 className="text-4xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Simple tiers. No fine print.
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: 'Free',
                  price: '$0',
                  period: 'forever',
                  description: 'For casual collectors starting out.',
                  features: [
                    'Up to 10 fragrances in wardrobe',
                    '3 stack suggestions per day',
                    'Basic occasion matching',
                    'Full 70,000+ fragrance search',
                  ],
                  cta: 'Get Started Free',
                  href: '/signup',
                  highlighted: false,
                },
                {
                  name: 'Pro',
                  price: '$7.99',
                  period: '/month',
                  description: 'For enthusiasts who wear intentionally.',
                  features: [
                    'Unlimited wardrobe size',
                    'Unlimited stack recommendations',
                    'Full occasion planner',
                    'Note compatibility scores',
                    'Shareable scent cards',
                  ],
                  cta: 'Start Pro',
                  href: '/signup?plan=pro',
                  highlighted: true,
                },
                {
                  name: 'Collector',
                  price: '$14.99',
                  period: '/month',
                  description: 'For serious collectors and hobbyists.',
                  features: [
                    'Everything in Pro',
                    'Public collection profile',
                    'Wishlist & ownership tracking',
                    'Stack history & favorites',
                    'Priority support',
                  ],
                  cta: 'Go Collector',
                  href: '/signup?plan=collector',
                  highlighted: false,
                },
              ].map((plan) => (
                <div
                  key={plan.name}
                  className={`border rounded-sm p-8 flex flex-col ${
                    plan.highlighted
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-card'
                  }`}
                >
                  {plan.highlighted && (
                    <p className="editorial-cap text-primary mb-4">Most Popular</p>
                  )}
                  <h3 className="text-2xl font-light mb-1" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}>
                    {plan.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-6">{plan.description}</p>
                  <div className="mb-8">
                    <span className="text-3xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                      {plan.price}
                    </span>
                    <span className="text-sm text-muted-foreground ml-1">{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-10 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <Check size={13} className="mt-0.5 shrink-0 text-primary" strokeWidth={2.5} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    variant={plan.highlighted ? 'default' : 'outline'}
                    className="rounded-sm text-xs tracking-wide w-full"
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
      <footer className="border-t border-border py-14 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="text-xl font-light mb-1" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                ScentStack
              </p>
              <p className="text-xs text-muted-foreground">
                Built for the fragrance curious.
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 text-xs text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
            </div>
          </div>
          <div className="gold-line opacity-40 mt-10 mb-6" />
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} ScentStack. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  )
}
