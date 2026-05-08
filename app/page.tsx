'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Search, Layers, CalendarDays, FlaskConical,
  ArrowRight, Check, Sparkles, Heart, Star,
  ChevronRight, Plus, Minus,
} from 'lucide-react'

// ─── Unsplash photo credits (free to use) ───────────────────────────────────
// Hero:       Cheyenne Doig  – unsplash.com/photos/1592945403244
// Feature 1:  Yoann Siloine  – unsplash.com/photos/1541643600914
// Feature 2:  Laura Chouette – unsplash.com/photos/1523293182086
// Feature 3:  Sincerely Media– unsplash.com/photos/1590156562745
// CTA bg:     Dan Gold       – unsplash.com/photos/1557170334
// ─────────────────────────────────────────────────────────────────────────────

const PHOTOS = {
  hero:      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=900&q=90&fit=crop',
  feature1:  'https://images.unsplash.com/photo-1541643600914-78b084683702?w=900&q=85&fit=crop',
  feature2:  'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=900&q=85&fit=crop',
  feature3:  'https://images.unsplash.com/photo-1590156562745-5614cf0ee37e?w=900&q=85&fit=crop',
  ctaBg:     'https://images.unsplash.com/photo-1557170334-a9632e77c6e4?w=1400&q=85&fit=crop',
  avatar1:   'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
  avatar2:   'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=80&h=80&fit=crop&crop=face',
  avatar3:   'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&crop=face',
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full text-left border border-border rounded-2xl px-6 py-5 bg-card hover:bg-card/80 transition-colors"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium">{q}</span>
        {open ? <Minus size={16} className="shrink-0 text-[hsl(34_55%_48%)]" /> : <Plus size={16} className="shrink-0 text-muted-foreground" />}
      </div>
      {open && <p className="text-sm text-muted-foreground leading-relaxed mt-3 pt-3 border-t border-border">{a}</p>}
    </button>
  )
}

function EmailCapture() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setDone(true)
  }
  return done ? (
    <div className="text-center py-4">
      <p className="text-sm font-medium text-[hsl(34_55%_44%)] mb-1">You're on the list.</p>
      <p className="text-xs text-muted-foreground">We'll send your free scent profile shortly.</p>
    </div>
  ) : (
    <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <Input
        type="email" required placeholder="your@email.com"
        value={email} onChange={e => setEmail(e.target.value)}
        className="rounded-full flex-1 border-border bg-card text-sm px-5"
      />
      <Button type="submit" className="rounded-full px-7 text-sm font-semibold bg-[hsl(34_55%_48%)] hover:bg-[hsl(34_55%_42%)] shrink-0">
        Get My Free Profile
      </Button>
    </form>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-border/40 bg-background/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[hsl(34_55%_48%)] flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-bold">S</span>
            </div>
            <span className="text-base font-semibold tracking-tight serif">Your Scents</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</Link>
            <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
            <Link href="#faq" className="hover:text-foreground transition-colors">FAQ</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block">Sign in</Link>
            <Button asChild size="sm" className="rounded-full px-5 text-xs font-semibold bg-[hsl(34_55%_48%)] hover:bg-[hsl(34_55%_42%)]">
              <Link href="/signup">Start Free</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>

        {/* HERO ─────────────────────────────────────────────── */}
        <section className="hero-gradient pt-32 pb-24 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">

            <div>
              <div className="badge mb-7">70,000+ fragrances · real note data</div>
              <h1 className="text-5xl md:text-[3.75rem] leading-[1.07] font-light text-balance mb-6 serif">
                Wear the right scent<br />
                <em className="italic font-normal" style={{ color: 'hsl(34 55% 44%)' }}>for every moment.</em>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-md leading-relaxed mb-8">
                Your entire fragrance collection, decoded. Your Scents matches every bottle you own to an occasion, mood, or season — and shows you how to layer them for something completely new.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-3 mb-10">
                <Button asChild size="lg" className="rounded-full px-8 text-sm font-semibold bg-[hsl(34_55%_48%)] hover:bg-[hsl(34_55%_42%)]">
                  <Link href="/signup">Build My Wardrobe — Free</Link>
                </Button>
                <Link href="#features" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group h-11 px-2">
                  See how it works <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
              {/* Avatar social proof */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[PHOTOS.avatar1, PHOTOS.avatar2, PHOTOS.avatar3].map((src, i) => (
                    <img key={i} src={src} alt="" className="w-8 h-8 rounded-full border-2 border-background object-cover" />
                  ))}
                </div>
                <div>
                  <div className="flex text-[hsl(34_55%_48%)] gap-0.5">
                    {[1,2,3,4,5].map(s => <Star key={s} size={11} fill="currentColor" strokeWidth={0} />)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">Loved by fragrance collectors</p>
                </div>
              </div>
            </div>

            {/* Hero photo – Unsplash / Cheyenne Doig */}
            <div className="relative">
              <div className="photo-frame aspect-[4/5] w-full max-w-md ml-auto overflow-hidden rounded-2xl">
                <img
                  src={PHOTOS.hero}
                  alt="Elegant perfume bottles on a marble surface — photo by Cheyenne Doig on Unsplash"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating stat */}
              <div className="absolute -bottom-4 -left-4 md:-left-10 bg-card border border-border rounded-2xl px-5 py-4 shadow-xl">
                <p className="text-2xl font-light serif">70k+</p>
                <p className="text-xs text-muted-foreground mt-0.5">Fragrances indexed</p>
              </div>
              {/* Floating occasion pill */}
              <div className="absolute top-6 -right-0 md:-right-6 bg-card border border-border rounded-2xl px-4 py-3 shadow-xl max-w-[168px]">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Tonight&apos;s pick</p>
                <p className="text-sm serif italic text-[hsl(34_55%_44%)] font-medium">Date Night Stack</p>
                <p className="text-xs text-muted-foreground mt-0.5">Oud · Rose · Amber</p>
              </div>
            </div>

          </div>
        </section>

        {/* TRUST BAR ────────────────────────────────────────── */}
        <section className="py-10 px-6 border-y border-border bg-card/40">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { stat: '70,000+',       label: 'Fragrances indexed' },
              { stat: 'Top · Heart · Base', label: 'Every note decoded' },
              { stat: 'Unlimited',     label: 'Layering combinations' },
              { stat: 'Free to start', label: 'No card required' },
            ].map(({ stat, label }) => (
              <div key={label}>
                <p className="text-lg md:text-2xl font-light serif mb-1">{stat}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* EMAIL CAPTURE ───────────────────────────────────── */}
        <section className="py-16 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <p className="label-tag text-[hsl(34_55%_48%)] mb-3">Free Scent Profile</p>
            <h2 className="text-3xl md:text-4xl font-light serif mb-3">
              Discover your signature notes.
            </h2>
            <p className="text-muted-foreground text-sm mb-8 max-w-sm mx-auto">
              Enter your email and we&apos;ll send you a free personalised fragrance profile — no subscription required.
            </p>
            <EmailCapture />
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6"><div className="divider-line opacity-60" /></div>

        {/* FEATURES ───────────────────────────────────────── */}
        <section id="features" className="py-24 px-6">
          <div className="max-w-6xl mx-auto">

            <div className="text-center mb-20">
              <p className="label-tag text-[hsl(34_55%_48%)] mb-3">What Your Scents Does</p>
              <h2 className="text-4xl md:text-5xl font-light serif">
                Your entire collection,<br />
                <em className="italic">intelligently organised.</em>
              </h2>
              <p className="mt-4 text-muted-foreground text-base max-w-lg mx-auto">
                Most people own 5–15 perfumes and reach for the same two. Your Scents makes every bottle earn its place.
              </p>
            </div>

            {/* Feature 1 – Occasion matching */}
            {/* Photo: Yoann Siloine on Unsplash */}
            <div className="grid md:grid-cols-2 gap-14 items-center mb-28">
              <div className="photo-frame aspect-[4/3] overflow-hidden rounded-2xl">
                <img
                  src={PHOTOS.feature1}
                  alt="Perfume bottles arranged on a vanity — photo by Yoann Siloine on Unsplash"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="label-tag text-[hsl(34_55%_48%)] mb-4">Occasion Matching</p>
                <h3 className="text-3xl md:text-4xl font-light serif mb-4 leading-tight">
                  Tell us where you&apos;re going.<br />We&apos;ll pick your scent.
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  From a morning coffee run to a late-night dinner, Your Scents recommends the perfect fragrance — or layering combination — from bottles you already own. No guessing. No regret.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Coffee date','Study session','Date night','Girls trip','Job interview','Brunch','Gym','Travel'].map(o => (
                    <span key={o} className="badge">{o}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Feature 2 – Layering */}
            {/* Photo: Laura Chouette on Unsplash */}
            <div className="grid md:grid-cols-2 gap-14 items-center mb-28">
              <div className="order-2 md:order-1">
                <p className="label-tag text-[hsl(34_55%_48%)] mb-4">Fragrance Layering</p>
                <h3 className="text-3xl md:text-4xl font-light serif mb-4 leading-tight">
                  Layer your perfumes<br />like a professional.
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  The most memorable scents you encounter are almost always layered. Your Scents analyses every note across your collection and surfaces combinations that work — with an explanation of why.
                </p>
                <ul className="space-y-3">
                  {[
                    'Note compatibility scoring across every bottle you own',
                    'Instant layering suggestions — no expertise needed',
                    'Save favourite stacks and access them anytime',
                  ].map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <Check size={14} className="mt-0.5 shrink-0 text-[hsl(34_55%_48%)]" strokeWidth={2.5} />{f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-1 md:order-2 photo-frame aspect-[4/3] overflow-hidden rounded-2xl">
                <img
                  src={PHOTOS.feature2}
                  alt="Close-up of a luxury perfume bottle — photo by Laura Chouette on Unsplash"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Feature 3 – Scent card */}
            {/* Photo: Sincerely Media on Unsplash */}
            <div className="grid md:grid-cols-2 gap-14 items-center">
              <div className="relative">
                {/* Scent card mockup */}
                <div className="photo-frame aspect-[4/3] overflow-hidden rounded-2xl">
                  <img
                    src={PHOTOS.feature3}
                    alt="Fragrance collection flat lay — photo by Sincerely Media on Unsplash"
                    className="w-full h-full object-cover brightness-75"
                  />
                </div>
                {/* Overlaid scent card preview */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-card/95 backdrop-blur-sm border border-border rounded-2xl px-6 py-5 shadow-2xl max-w-[220px] text-center">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Scent Profile</p>
                    <p className="text-base font-medium serif mb-3">Maya&apos;s Wardrobe</p>
                    <div className="flex flex-wrap gap-1 justify-center mb-3">
                      {['Oud','Rose','Sandalwood','Vanilla','Iris'].map(n => (
                        <span key={n} className="text-[10px] bg-[hsl(34_45%_90%)] text-[hsl(34_55%_40%)] px-2 py-0.5 rounded-full">{n}</span>
                      ))}
                    </div>
                    <p className="text-[10px] text-muted-foreground">12 fragrances · 4 signature notes</p>
                    <div className="mt-3 pt-3 border-t border-border text-[10px] text-[hsl(34_55%_48%)] font-medium">yourscents.beauty/maya</div>
                  </div>
                </div>
              </div>
              <div>
                <p className="label-tag text-[hsl(34_55%_48%)] mb-4">Shareable Scent Cards</p>
                <h3 className="text-3xl md:text-4xl font-light serif mb-4 leading-tight">
                  Share your collection.<br />Start conversations.
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Generate a beautiful card showing your full fragrance wardrobe, signature notes, and favourite stacks. Built for the moment someone asks &ldquo;what are you wearing?&rdquo;
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  One link. Post it on TikTok, drop it in your Instagram bio, or text it to a friend.
                </p>
                <Button asChild className="rounded-full px-6 text-sm font-semibold bg-[hsl(34_55%_48%)] hover:bg-[hsl(34_55%_42%)]">
                  <Link href="/signup">Create Your Card <ChevronRight size={14} className="ml-1" /></Link>
                </Button>
              </div>
            </div>

          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6"><div className="divider-line opacity-60" /></div>

        {/* HOW IT WORKS ────────────────────────────────────── */}
        <section id="how-it-works" className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="label-tag text-[hsl(34_55%_48%)] mb-3">How It Works</p>
              <h2 className="text-4xl md:text-5xl font-light serif">
                Set up in minutes.<em className="italic"> Use it forever.</em>
              </h2>
            </div>
            <div className="grid md:grid-cols-4 gap-5">
              {[
                { step:'01', icon:Search,      title:'Add Your Collection',   body:'Search 70,000+ fragrances. Add every bottle, decant, and sample in seconds.' },
                { step:'02', icon:FlaskConical, title:'Notes Are Decoded',     body:'We map every top, heart, and base note automatically using verified fragrance data.' },
                { step:'03', icon:Layers,       title:'Get Layer Suggestions', body:'See which perfumes pair perfectly together — with a score and explanation.' },
                { step:'04', icon:CalendarDays, title:'Pick by Occasion',      body:'Tell us where you are going and we pull the perfect scent from what you own.' },
              ].map(({ step, icon: Icon, title, body }) => (
                <div key={step} className="card-soft flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[hsl(34_45%_90%)] flex items-center justify-center">
                      <Icon size={18} className="text-[hsl(34_55%_48%)]" strokeWidth={1.5} />
                    </div>
                    <span className="text-3xl font-light serif text-muted-foreground/30">{step}</span>
                  </div>
                  <h3 className="font-medium text-base serif">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6"><div className="divider-line opacity-60" /></div>

        {/* NOTE EDUCATION ──────────────────────────────────── */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="label-tag text-[hsl(34_55%_48%)] mb-4">Fragrance Layering 101</p>
              <h2 className="text-4xl md:text-5xl font-light leading-tight mb-5 serif">
                The art of wearing<em className="italic"> more than one.</em>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The most unforgettable scents you smell on people are almost never from a single bottle. Fragrance layering is a centuries-old technique used by Arabian perfumers, French maisons, and niche indie brands alike.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The key is knowing which notes complement each other versus clash. Your Scents runs that analysis across your entire collection automatically — every possible combination, instantly.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { icon:Sparkles, term:'Top Notes',   body:'The opening impression — citrus, herbs, light florals. They fade within 20–30 minutes but define how a fragrance introduces itself.' },
                { icon:Heart,    term:'Heart Notes',  body:'The main character. Florals, spices, soft roses. This is what people smell on you for hours after you apply.' },
                { icon:Star,     term:'Base Notes',   body:'Your lasting signature — musks, woods, vanilla, amber. These anchor a fragrance and are the foundation of any great layering combination.' },
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

        {/* TIKTOK SOCIAL PROOF ─────────────────────────────── */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="label-tag text-[hsl(34_55%_48%)] mb-3">Trending Right Now</p>
              <h2 className="text-4xl md:text-5xl font-light serif">
                Fragrance is having a moment.
              </h2>
              <p className="mt-4 text-muted-foreground text-base max-w-lg mx-auto">
                &ldquo;What perfume should I wear to...&rdquo; is one of TikTok&apos;s fastest-growing search queries. Your Scents was built for exactly this.
              </p>
            </div>
            {/* TikTok-style comment cards */}
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { handle:'@scentcollector', text:'literally searched "what perfume to wear on a date" and got 800 results — someone needs to build an app that uses YOUR collection', likes:'4.2k' },
                { handle:'@fragrancenerdd', text:'the way I own 18 perfumes and wear the same two every day... I need help', likes:'11.8k' },
                { handle:'@perfumegirlies', text:'can we talk about fragrance layering? rose + oud is sending me. what other combos are people doing??', likes:'6.5k' },
              ].map(({ handle, text, likes }) => (
                <div key={handle} className="bg-card border border-border rounded-2xl p-5">
                  {/* Fake TikTok comment style */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[hsl(34_45%_88%)] flex items-center justify-center text-xs font-medium text-[hsl(34_55%_44%)]">
                      {handle[1].toUpperCase()}
                    </div>
                    <span className="text-xs font-medium">{handle}</span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed mb-4">{text}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Heart size={12} className="text-red-400" fill="currentColor" strokeWidth={0} />
                    <span>{likes} likes</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6"><div className="divider-line opacity-60" /></div>

        {/* TESTIMONIALS ────────────────────────────────────── */}
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
                { quote:'I own 23 perfumes and was reaching for the same four. This showed me I had the perfect scent for every situation already sitting on my shelf.', name:'Sophia R.', detail:'Collector, 23 bottles', avatar: PHOTOS.avatar1 },
                { quote:'The layering suggestions are genuinely clever. Found a combination of two perfumes I have owned for years that smells completely new together.', name:'Maya K.',   detail:'Niche fragrance enthusiast', avatar: PHOTOS.avatar2 },
                { quote:'The shareable scent card is exactly what TikTok fragrance content needed. I just send people my link now when they ask what I am wearing.', name:'Jade T.',   detail:'Beauty content creator', avatar: PHOTOS.avatar3 },
              ].map(({ quote, name, detail, avatar }) => (
                <div key={name} className="testimonial-card flex flex-col gap-4">
                  <div className="flex text-[hsl(34_55%_48%)] gap-0.5">
                    {[1,2,3,4,5].map(s => <Star key={s} size={12} fill="currentColor" strokeWidth={0} />)}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed flex-1">&ldquo;{quote}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-3 border-t border-border">
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

        {/* PRICING ─────────────────────────────────────────── */}
        <section id="pricing" className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="label-tag text-[hsl(34_55%_48%)] mb-3">Pricing</p>
              <h2 className="text-4xl md:text-5xl font-light serif">
                Start free. Upgrade when you&apos;re ready.
              </h2>
              <p className="mt-3 text-muted-foreground text-sm">No commitment. Cancel anytime.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name:'Free', price:'$0', period:'forever',
                  description:'For the casual collector',
                  features:['Up to 3 fragrances','3 layering suggestions per day','Basic occasion matching','70,000+ fragrance search'],
                  cta:'Start for Free', href:'/signup', highlighted:false,
                },
                {
                  name:'Pro', price:'$7.99', period:'/month',
                  description:'For the serious collector',
                  features:['Unlimited fragrance wardrobe','Unlimited layering combinations','Full occasion planner','Note compatibility scores','Shareable scent cards'],
                  cta:'Go Pro', href:'/signup?plan=pro', highlighted:true,
                },
                {
                  name:'Collector', price:'$14.99', period:'/month',
                  description:'For the obsessed',
                  features:['Everything in Pro','Public collection profile','Wishlist and ownership tracking','Bottle level tracking','Stack history and favourites','Priority support'],
                  cta:'Go Collector', href:'/signup?plan=collector', highlighted:false,
                },
              ].map((plan) => (
                <div key={plan.name} className={`rounded-2xl p-8 flex flex-col border transition-shadow ${
                  plan.highlighted
                    ? 'border-[hsl(34_55%_65%)] bg-[hsl(34_50%_96%)] shadow-xl shadow-[hsl(34_30%_70%/0.2)]'
                    : 'border-border bg-card hover:shadow-md'
                }`}>
                  {plan.highlighted && <span className="badge w-fit mb-5">Most Popular</span>}
                  <h3 className="text-2xl font-light mb-1 serif">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground mb-6">{plan.description}</p>
                  <div className="mb-8">
                    <span className="text-4xl font-light serif">{plan.price}</span>
                    <span className="text-sm text-muted-foreground ml-1.5">{plan.period}</span>
                  </div>
                  <ul className="space-y-3.5 mb-9 flex-1">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <Check size={13} className="mt-0.5 shrink-0 text-[hsl(34_55%_48%)]" strokeWidth={2.5} />{f}
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant={plan.highlighted ? 'default' : 'outline'}
                    className={`rounded-full text-xs font-semibold w-full ${
                      plan.highlighted ? 'bg-[hsl(34_55%_48%)] hover:bg-[hsl(34_55%_42%)]' : ''
                    }`}>
                    <Link href={plan.href}>{plan.cta}</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6"><div className="divider-line opacity-60" /></div>

        {/* FAQ ─────────────────────────────────────────────── */}
        <section id="faq" className="py-24 px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-14">
              <p className="label-tag text-[hsl(34_55%_48%)] mb-3">FAQ</p>
              <h2 className="text-4xl md:text-5xl font-light serif">Common questions.</h2>
            </div>
            <div className="space-y-3">
              {[
                {
                  q: 'Do I have to own these perfumes already?',
                  a: 'Yes — Your Scents is built around the collection you already own. You add your bottles, and we do everything else. There is nothing to buy. That said, you can also wishlist fragrances you want and get layering suggestions that include them.',
                },
                {
                  q: 'How does it know what notes are in my perfumes?',
                  a: 'We use a database of over 70,000 fragrances with verified top, heart, and base note data. When you add a bottle, we automatically pull its full note profile — no manual entry required.',
                },
                {
                  q: 'What is a scent card?',
                  a: 'A scent card is a beautiful shareable page showing your fragrance wardrobe, your signature notes, and your favourite stacks. It has its own URL you can post on TikTok, drop in your Instagram bio, or send to anyone who asks what you wear.',
                },
                {
                  q: 'Can I use this if I only own a few perfumes?',
                  a: 'Absolutely. The free plan supports up to 3 fragrances, which is plenty to get layering suggestions and occasion recommendations. Most people are surprised by the combinations even a small collection unlocks.',
                },
                {
                  q: 'Is there a mobile app?',
                  a: 'Your Scents is a fully responsive web app that works on any phone browser — no download needed. A native app is on the roadmap.',
                },
                {
                  q: 'Can I cancel my subscription anytime?',
                  a: 'Yes, any time, no questions asked. Your collection data is yours and will still be accessible on the free plan after you cancel.',
                },
              ].map(({ q, a }) => <FAQItem key={q} q={q} a={a} />)}
            </div>
          </div>
        </section>

        {/* FINAL CTA ───────────────────────────────────────── */}
        {/* Photo: Dan Gold on Unsplash */}
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden">
              <img
                src={PHOTOS.ctaBg}
                alt="Luxury perfume bottles — photo by Dan Gold on Unsplash"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(24_20%_6%/0.90)] via-[hsl(24_20%_6%/0.45)] to-transparent flex flex-col items-center justify-end pb-14 px-8 text-center">
                <h2 className="text-4xl md:text-5xl font-light text-white serif mb-4 text-balance">
                  Your signature scent is already in your wardrobe.
                </h2>
                <p className="text-white/70 text-sm mb-8 max-w-md">
                  Start free. Add your collection. Discover combinations you never knew existed.
                </p>
                <Button asChild size="lg" className="rounded-full px-10 text-sm font-semibold bg-[hsl(34_55%_48%)] hover:bg-[hsl(34_55%_42%)]">
                  <Link href="/signup">Build My Scent Wardrobe</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
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
            &copy; {new Date().getFullYear()} Your Scents. All rights reserved.
            {' '}<span className="opacity-50">Photos: Unsplash (Cheyenne Doig, Yoann Siloine, Laura Chouette, Sincerely Media, Dan Gold)</span>
          </p>
        </div>
      </footer>

    </div>
  )
}
