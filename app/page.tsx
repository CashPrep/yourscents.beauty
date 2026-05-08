import Link from 'next/link'
import Image from 'next/image'
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
  ChevronRight,
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ─── Nav ─── */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-border/40 bg-background/85 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[hsl(34_55%_48%)] flex items-center justify-center">
              <span className="text-white text-xs font-bold">S</span>
            </div>
            <span className="text-base font-semibold tracking-tight serif">Your Scents</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <Link href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</Link>
            <Link href="#vibes" className="hover:text-foreground transition-colors">Features</Link>
            <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
              Sign in
            </Link>
            <Button asChild size="sm" className="rounded-full px-5 text-xs font-semibold bg-[hsl(34_55%_48%)] hover:bg-[hsl(34_55%_42%)]">
              <Link href="/signup">Start Free</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>

        {/* ─── Hero ─── */}
        <section className="hero-gradient pt-32 pb-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">

              {/* Left: Copy */}
              <div>
                <div className="badge mb-7">70,000+ fragrances · real note data</div>
                <h1 className="text-5xl md:text-6xl leading-[1.08] font-light text-balance mb-6 serif">
                  Wear the right scent<br />
                  <em className="italic font-normal" style={{ color: 'hsl(34 55% 44%)' }}>for every moment.</em>
                </h1>
                <p className="text-base md:text-lg text-muted-foreground max-w-md leading-relaxed mb-8">
                  Your Scents learns your fragrance collection and tells you exactly which perfume — or combination — fits the occasion. Stop guessing. Start wearing intentionally.
                </p>
                <div className="flex flex-col sm:flex-row items-start gap-3 mb-10">
                  <Button asChild size="lg" className="rounded-full px-8 text-sm font-semibold bg-[hsl(34_55%_48%)] hover:bg-[hsl(34_55%_42%)]">
                    <Link href="/signup">Get Started Free</Link>
                  </Button>
                  <Link
                    href="#how-it-works"
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group h-11 px-2"
                  >
                    See how it works
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
                {/* Mini social proof */}
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {['https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face','https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face','https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=40&h=40&fit=crop&crop=face'].map((src, i) => (
                      <img key={i} src={src} alt="" className="w-8 h-8 rounded-full border-2 border-background object-cover" />
                    ))}
                  </div>
                  <div>
                    <div className="flex text-[hsl(34_55%_48%)] text-xs gap-0.5">
                      {[1,2,3,4,5].map(s => <Star key={s} size={11} fill="currentColor" strokeWidth={0} />)}
                    </div>
                    <p className="text-xs text-muted-foreground">Loved by fragrance collectors</p>
                  </div>
                </div>
              </div>

              {/* Right: Hero image */}
              <div className="relative">
                <div className="photo-frame aspect-[4/5] w-full max-w-md ml-auto">
                  <img
                    src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=85&fit=crop"
                    alt="Elegant perfume bottles arranged on a marble surface"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating stat card */}
                <div className="absolute -bottom-4 -left-4 md:-left-10 bg-card border border-border rounded-2xl px-5 py-4 shadow-lg">
                  <p className="text-2xl font-light serif">70k+</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Fragrances in our database</p>
                </div>
                {/* Floating occasion card */}
                <div className="absolute top-6 -right-0 md:-right-8 bg-card border border-border rounded-2xl px-4 py-3 shadow-lg max-w-[160px]">
                  <p className="text-xs font-medium mb-1">Tonight's pick</p>
                  <p className="text-sm serif italic text-[hsl(34_55%_44%)]">Date Night Stack</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Oud · Rose · Amber</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ─── Trust bar ─── */}
        <section className="py-10 px-6 border-y border-border bg-card/40">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { stat: '70,000+', label: 'Fragrances indexed' },
                { stat: 'Top, Heart & Base', label: 'Every note decoded' },
                { stat: 'Unlimited', label: 'Layering combinations' },
                { stat: 'Free to start', label: 'No credit card required' },
              ].map(({ stat, label }) => (
                <div key={label}>
                  <p className="text-xl md:text-2xl font-light serif mb-1">{stat}</p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6 py-2"><div className="divider-line opacity-60" /></div>

        {/* ─── What It Does (Features) ─── */}
        <section id="vibes" className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="label-tag text-[hsl(34_55%_48%)] mb-3">What Your Scents Does</p>
              <h2 className="text-4xl md:text-5xl font-light serif">
                Your entire fragrance wardrobe,<br />
                <em className="italic">intelligently organized.</em>
              </h2>
              <p className="mt-4 text-muted-foreground text-base max-w-lg mx-auto">
                Most people own 5–15 perfumes and wear the same two. Your Scents changes that — by matching every bottle you own to the exact mood, weather, or occasion.
              </p>
            </div>

            {/* Feature 1: Occasion matching */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
              <div className="photo-frame aspect-video">
                <img
                  src="https://images.unsplash.com/photo-1541643600914-78b084683702?w=900&q=85&fit=crop"
                  alt="Perfume bottles on a vanity table"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="label-tag text-[hsl(34_55%_48%)] mb-4">Occasion Matching</p>
                <h3 className="text-3xl md:text-4xl font-light serif mb-4">
                  Tell us where you're going. We'll pick your scent.
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  From a morning coffee run to a late-night dinner, Your Scents recommends the perfect fragrance — or layering combination — from bottles you already own. No guessing, no regret.
                </p>
                <div className="space-y-3">
                  {['Coffee date · Study session · Date night · Girls trip · Job interview · Brunch'].split(' · ').map(o => (
                    <span key={o} className="badge mr-2 mb-2 inline-flex">{o}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Feature 2: Layering */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
              <div className="order-2 md:order-1">
                <p className="label-tag text-[hsl(34_55%_48%)] mb-4">Fragrance Layering</p>
                <h3 className="text-3xl md:text-4xl font-light serif mb-4">
                  Layer your perfumes like a pro.
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-5">
                  The most iconic scents people wear are actually two or three fragrances layered together. Your Scents analyzes the top, heart, and base notes across your entire collection and shows you which combinations work — and why.
                </p>
                <ul className="space-y-3">
                  {[
                    'Note compatibility scoring across your collection',
                    'Instant layering suggestions based on what you own',
                    'Save your favorite stacks and revisit them anytime',
                  ].map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <Check size={14} className="mt-0.5 shrink-0 text-[hsl(34_55%_48%)]" strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-1 md:order-2 photo-frame aspect-video">
                <img
                  src="https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=900&q=85&fit=crop"
                  alt="Close up of luxury perfume bottle with soft lighting"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Feature 3: Scent cards */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="photo-frame aspect-video">
                <img
                  src="https://images.unsplash.com/photo-1590156562745-5614cf0ee37e?w=900&q=85&fit=crop"
                  alt="Fragrance collection flat lay"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="label-tag text-[hsl(34_55%_48%)] mb-4">Shareable Scent Cards</p>
                <h3 className="text-3xl md:text-4xl font-light serif mb-4">
                  Share your collection. Start conversations.
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-5">
                  Generate a beautiful shareable card showing your full fragrance wardrobe, your signature notes, and your most-worn scents. Built for TikTok, Instagram, and anyone who asks "what are you wearing?"
                </p>
                <Button asChild className="rounded-full px-6 text-sm font-semibold bg-[hsl(34_55%_48%)] hover:bg-[hsl(34_55%_42%)]">
                  <Link href="/signup">Create Your Card <ChevronRight size={14} className="ml-1" /></Link>
                </Button>
              </div>
            </div>

          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6"><div className="divider-line opacity-60" /></div>

        {/* ─── How It Works ─── */}
        <section id="how-it-works" className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="label-tag text-[hsl(34_55%_48%)] mb-3">How It Works</p>
              <h2 className="text-4xl md:text-5xl font-light serif">
                Set up in minutes.
                <em className="italic"> Use it forever.</em>
              </h2>
            </div>
            <div className="grid md:grid-cols-4 gap-5">
              {[
                {
                  step: '01',
                  icon: Search,
                  title: 'Add Your Collection',
                  body: 'Search our database of 70,000+ fragrances. Add every bottle, decant, and sample you own in seconds.',
                },
                {
                  step: '02',
                  icon: FlaskConical,
                  title: 'Notes Are Decoded',
                  body: 'We automatically map every top, heart, and base note across your collection using verified fragrance data.',
                },
                {
                  step: '03',
                  icon: Layers,
                  title: 'Get Layer Suggestions',
                  body: 'See which perfumes in your wardrobe pair perfectly together to create a unique signature scent.',
                },
                {
                  step: '04',
                  icon: CalendarDays,
                  title: 'Pick by Occasion',
                  body: 'Tell us where you're going and we pull the perfect scent — or combination — from what you already own.',
                },
              ].map(({ step, icon: Icon, title, body }) => (
                <div key={step} className="card-soft flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[hsl(34_45%_90%)] flex items-center justify-center">
                      <Icon size={18} className="text-[hsl(34_55%_48%)]" strokeWidth={1.5} />
                    </div>
                    <span className="text-3xl font-light serif text-muted-foreground/40">{step}</span>
                  </div>
                  <h3 className="font-medium text-base serif">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6"><div className="divider-line opacity-60" /></div>

        {/* ─── Note Education ─── */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="label-tag text-[hsl(34_55%_48%)] mb-4">Fragrance Layering 101</p>
              <h2 className="text-4xl md:text-5xl font-light leading-tight mb-5 serif">
                The art of wearing
                <em className="italic"> more than one.</em>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The most unforgettable scents you smell on people are almost never from a single bottle. Fragrance layering — applying two or more perfumes together — is a technique used by Arabian perfumers, French maisons, and niche indie brands for centuries.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The key is understanding which notes complement each other vs. clash. Your Scents does that analysis automatically — across your entire collection, every combination.
              </p>
            </div>
            <div className="space-y-4">
              {[
                {
                  icon: Sparkles,
                  term: 'Top Notes',
                  body: 'The opening impression — citrus, herbs, light florals. They fade within 20–30 minutes but set the tone for everything that follows.',
                },
                {
                  icon: Heart,
                  term: 'Heart Notes',
                  body: 'The core of the fragrance. Florals, spices, and soft roses that emerge as top notes fade and last for several hours on skin.',
                },
                {
                  icon: Star,
                  term: 'Base Notes',
                  body: 'Your lasting signature — musks, woods, vanilla, amber. These define how a fragrance lingers on skin and clothes, and are the foundation of any good layering combination.',
                },
              ].map(({ icon: Icon, term, body }) => (
                <div key={term} className="card-soft flex gap-4">
                  <div className="mt-0.5 shrink-0 w-9 h-9 rounded-xl bg-[hsl(34_45%_90%)] flex items-center justify-center">
                    <Icon size={16} className="text-[hsl(34_55%_48%)]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-1.5 serif">{term}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6"><div className="divider-line opacity-60" /></div>

        {/* ─── Testimonials ─── */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="label-tag text-[hsl(34_55%_48%)] mb-3">What Collectors Say</p>
              <h2 className="text-4xl md:text-5xl font-light serif">
                Built for the fragrance-obsessed.
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  quote: "I own 23 perfumes and was only wearing 4 of them. This app reminded me I had exactly the right scent for every situation already.",
                  name: "Sophia R.",
                  detail: "Fragrance collector, 23 bottles",
                  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&crop=face",
                },
                {
                  quote: "The layering suggestions are genuinely brilliant. Found a combo of two perfumes I've had for years that smells completely new together.",
                  name: "Maya K.",
                  detail: "Niche fragrance enthusiast",
                  avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=60&h=60&fit=crop&crop=face",
                },
                {
                  quote: "The shareable scent card is perfect for TikTok. Everyone keeps asking what I'm wearing and I just send them my profile link.",
                  name: "Jade T.",
                  detail: "Beauty content creator",
                  avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=60&h=60&fit=crop&crop=face",
                },
              ].map(({ quote, name, detail, avatar }) => (
                <div key={name} className="testimonial-card flex flex-col gap-4">
                  <div className="flex text-[hsl(34_55%_48%)] gap-0.5">
                    {[1,2,3,4,5].map(s => <Star key={s} size={12} fill="currentColor" strokeWidth={0} />)}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed flex-1">&ldquo;{quote}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-2 border-t border-border">
                    <img src={avatar} alt={name} className="w-9 h-9 rounded-full object-cover" />
                    <div>
                      <p className="text-sm font-medium">{name}</p>
                      <p className="text-xs text-muted-foreground">{detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6"><div className="divider-line opacity-60" /></div>

        {/* ─── Pricing ─── */}
        <section id="pricing" className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="label-tag text-[hsl(34_55%_48%)] mb-3">Pricing</p>
              <h2 className="text-4xl md:text-5xl font-light serif">
                Start free. Upgrade when you're ready.
              </h2>
              <p className="mt-3 text-muted-foreground text-sm">No commitment. Cancel anytime. Always free to start.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: 'Free',
                  price: '$0',
                  period: 'forever',
                  description: 'For the casual collector',
                  features: [
                    'Up to 3 fragrances in your wardrobe',
                    '3 layering suggestions per day',
                    'Basic occasion matching',
                    '70,000+ fragrance search',
                  ],
                  cta: 'Start for Free',
                  href: '/signup',
                  highlighted: false,
                },
                {
                  name: 'Pro',
                  price: '$7.99',
                  period: '/month',
                  description: 'For the serious collector',
                  features: [
                    'Unlimited fragrance wardrobe',
                    'Unlimited layering combinations',
                    'Full occasion planner',
                    'Note compatibility scores',
                    'Shareable scent cards',
                  ],
                  cta: 'Go Pro',
                  href: '/signup?plan=pro',
                  highlighted: true,
                },
                {
                  name: 'Collector',
                  price: '$14.99',
                  period: '/month',
                  description: 'For the obsessed',
                  features: [
                    'Everything in Pro',
                    'Public collection profile',
                    'Wishlist and ownership tracking',
                    'Bottle level tracking',
                    'Stack history and favorites',
                    'Priority support',
                  ],
                  cta: 'Go Collector',
                  href: '/signup?plan=collector',
                  highlighted: false,
                },
              ].map((plan) => (
                <div
                  key={plan.name}
                  className={`rounded-2xl p-8 flex flex-col border transition-shadow ${
                    plan.highlighted
                      ? 'border-[hsl(34_55%_65%)] bg-[hsl(34_50%_96%)] shadow-xl shadow-[hsl(34_30%_70%/0.2)]'
                      : 'border-border bg-card hover:shadow-md'
                  }`}
                >
                  {plan.highlighted && (
                    <span className="badge w-fit mb-5">Most Popular</span>
                  )}
                  <h3 className="text-2xl font-light mb-1 serif">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground mb-6">{plan.description}</p>
                  <div className="mb-8">
                    <span className="text-4xl font-light serif">{plan.price}</span>
                    <span className="text-sm text-muted-foreground ml-1.5">{plan.period}</span>
                  </div>
                  <ul className="space-y-3.5 mb-9 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <Check size={13} className="mt-0.5 shrink-0 text-[hsl(34_55%_48%)]" strokeWidth={2.5} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    variant={plan.highlighted ? 'default' : 'outline'}
                    className={`rounded-full text-xs font-semibold w-full ${
                      plan.highlighted ? 'bg-[hsl(34_55%_48%)] hover:bg-[hsl(34_55%_42%)]' : ''
                    }`}
                  >
                    <Link href={plan.href}>{plan.cta}</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Final CTA ─── */}
        <section className="py-24 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="photo-frame overflow-hidden relative rounded-3xl">
              <img
                src="https://images.unsplash.com/photo-1557170334-a9632e77c6e4?w=1200&q=85&fit=crop"
                alt="Luxury perfume display"
                className="w-full h-72 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(24_20%_8%/0.85)] via-[hsl(24_20%_8%/0.40)] to-transparent flex flex-col items-center justify-end pb-12 px-8">
                <h2 className="text-4xl md:text-5xl font-light text-white serif mb-4">
                  Your signature scent is already in your wardrobe.
                </h2>
                <p className="text-white/75 text-sm mb-7 max-w-md">
                  Start for free. Add your collection. Discover combinations you never knew existed.
                </p>
                <Button asChild size="lg" className="rounded-full px-10 text-sm font-semibold bg-[hsl(34_55%_48%)] hover:bg-[hsl(34_55%_42%)] border-0">
                  <Link href="/signup">Build My Scent Wardrobe</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ─── Footer ─── */}
      <footer className="border-t border-border py-12 px-6 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-6 h-6 rounded-full bg-[hsl(34_55%_48%)] flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold">S</span>
                </div>
                <p className="text-base font-medium serif">Your Scents</p>
              </div>
              <p className="text-xs text-muted-foreground">The intelligent fragrance wardrobe app.</p>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-5 text-xs text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
            </div>
          </div>
          <div className="divider-line opacity-40 mt-8 mb-5" />
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Your Scents. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  )
}
