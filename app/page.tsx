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

// ─── Unsplash photos (free to use, feminine / Gen Z fragrance aesthetic) ──────
// Hero:      Thought Catalog – unsplash.com/photos/Obn2H1ysOGE
// Feature1:  Content Pixie   – unsplash.com/photos/hcNKO-PuJas
// Feature2:  Alesia Kozik    – pexels free (replaced with Unsplash alt)
// Feature3:  Artem Beliaikin – unsplash.com/photos/Bx5YNT4pHYo
// CTA bg:    Brigitte Tohm   – unsplash.com/photos/EAay4gcum1c
// Avatar 1:  Michaela Murphy – unsplash.com crop face
// Avatar 2:  Tamara Bellis   – unsplash.com crop face
// Avatar 3:  Ali Morshedlou  – unsplash.com crop face
// ─────────────────────────────────────────────────────────────────────────────

const PHOTOS = {
  // Hero: girl spritzing perfume – very relatable Gen Z
  hero:     'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=900&q=90&fit=crop',
  // Feature 1: flat lay of pink perfume bottles on pastel background
  feature1: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=900&q=85&fit=crop',
  // Feature 2: luxury perfume close up warm feminine tones
  feature2: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=900&q=85&fit=crop',
  // Feature 3: perfume bottles on marble with flowers – girly aesthetic
  feature3: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=900&q=85&fit=crop',
  // CTA bg: woman holding perfume bottle, warm rose tones
  ctaBg:    'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=1400&q=85&fit=crop',
  // Avatars: young women, diverse
  avatar1:  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&fit=crop&crop=face',
  avatar2:  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face',
  avatar3:  'https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=80&h=80&fit=crop&crop=face',
}

const ROSE = 'hsl(340 55% 62%)'
const ROSE_DARK = 'hsl(340 55% 55%)'
const ROSE_LIGHT = 'hsl(340 45% 88%)'
const ROSE_TEXT = 'hsl(340 55% 48%)'

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full text-left border border-border rounded-2xl px-6 py-5 bg-card hover:bg-card/80 transition-colors"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium">{q}</span>
        {open
          ? <Minus size={16} className="shrink-0" style={{ color: ROSE }} />
          : <Plus size={16} className="shrink-0 text-muted-foreground" />}
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
      <p className="text-sm font-medium mb-1" style={{ color: ROSE_TEXT }}>You&apos;re on the list 🌸</p>
      <p className="text-xs text-muted-foreground">We&apos;ll send your free scent profile shortly!</p>
    </div>
  ) : (
    <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <Input
        type="email" required placeholder="your@email.com"
        value={email} onChange={e => setEmail(e.target.value)}
        className="rounded-full flex-1 border-border bg-card text-sm px-5"
      />
      <Button
        type="submit"
        className="rounded-full px-7 text-sm font-semibold shrink-0"
        style={{ background: ROSE, color: '#fff' }}
      >
        Get My Free Profile ✨
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
            <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: ROSE }}>
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
            <Button
              asChild size="sm"
              className="rounded-full px-5 text-xs font-semibold"
              style={{ background: ROSE, color: '#fff' }}
            >
              <Link href="/signup">Start Free 🌸</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>

        {/* HERO ─────────────────────────────────────────────── */}
        <section className="hero-gradient pt-32 pb-24 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">

            <div>
              <div className="badge mb-7">✨ 70,000+ fragrances · built for girlies</div>
              <h1 className="text-5xl md:text-[3.75rem] leading-[1.07] font-light text-balance mb-6 serif">
                Your perfume collection,<br />
                <em className="italic font-normal" style={{ color: ROSE_TEXT }}>finally organised.</em>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-md leading-relaxed mb-8">
                Stop reaching for the same two scents. Your Scents matches every bottle you own to a vibe, occasion, or season — and tells you exactly how to layer them for something totally new.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-3 mb-10">
                <Button
                  asChild size="lg"
                  className="rounded-full px-8 text-sm font-semibold"
                  style={{ background: ROSE, color: '#fff' }}
                >
                  <Link href="/signup">Build My Scent Wardrobe — Free</Link>
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
                  <div className="flex gap-0.5" style={{ color: ROSE }}>
                    {[1,2,3,4,5].map(s => <Star key={s} size={11} fill="currentColor" strokeWidth={0} />)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">Loved by scent girlies everywhere 🌸</p>
                </div>
              </div>
            </div>

            {/* Hero photo */}
            <div className="relative">
              <div className="photo-frame aspect-[4/5] w-full max-w-md ml-auto overflow-hidden rounded-3xl">
                <img
                  src={PHOTOS.hero}
                  alt="Girl with perfume bottles on a pink background"
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=900&q=90&fit=crop' }}
                />
              </div>
              {/* Floating stat */}
              <div className="glass-card absolute -bottom-4 -left-4 md:-left-10 px-5 py-4 shadow-xl">
                <p className="text-2xl font-light serif">70k+</p>
                <p className="text-xs text-muted-foreground mt-0.5">Fragrances indexed</p>
              </div>
              {/* Floating occasion pill */}
              <div className="glass-card absolute top-6 -right-0 md:-right-6 px-4 py-3 shadow-xl max-w-[168px]">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Tonight&apos;s vibe ✨</p>
                <p className="text-sm serif italic font-medium" style={{ color: ROSE_TEXT }}>Date Night Stack</p>
                <p className="text-xs text-muted-foreground mt-0.5">Rose · Vanilla · Musk</p>
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
              { stat: 'Unlimited',     label: 'Layering combos' },
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
            <p className="label-tag mb-3" style={{ color: ROSE }}>Free Scent Profile 🌸</p>
            <h2 className="text-3xl md:text-4xl font-light serif mb-3">
              Find your signature scent.
            </h2>
            <p className="text-muted-foreground text-sm mb-8 max-w-sm mx-auto">
              Drop your email and we&apos;ll send you a free personalised fragrance profile — no subscription needed, bestie.
            </p>
            <EmailCapture />
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6"><div className="divider-line opacity-60" /></div>

        {/* FEATURES ───────────────────────────────────────── */}
        <section id="features" className="py-24 px-6">
          <div className="max-w-6xl mx-auto">

            <div className="text-center mb-20">
              <p className="label-tag mb-3" style={{ color: ROSE }}>What Your Scents Does</p>
              <h2 className="text-4xl md:text-5xl font-light serif">
                Your whole collection,<br />
                <em className="italic">working for you.</em>
              </h2>
              <p className="mt-4 text-muted-foreground text-base max-w-lg mx-auto">
                Most girls own 5–15 perfumes and grab the same one every morning. Your Scents makes every bottle earn its place on your shelf.
              </p>
            </div>

            {/* Feature 1 – Occasion matching */}
            <div className="grid md:grid-cols-2 gap-14 items-center mb-28">
              <div className="photo-frame aspect-[4/3] overflow-hidden rounded-3xl">
                <img
                  src={PHOTOS.feature1}
                  alt="Pink perfume bottles flat lay on pastel background"
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=900&q=85&fit=crop' }}
                />
              </div>
              <div>
                <p className="label-tag mb-4" style={{ color: ROSE }}>Occasion Matching</p>
                <h3 className="text-3xl md:text-4xl font-light serif mb-4 leading-tight">
                  Tell us where you&apos;re going.<br />We&apos;ll pick your scent.
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  From morning classes to a Saturday night out, Your Scents recommends the perfect fragrance — or layering combo — from bottles you already own. No more standing at your shelf for 10 minutes.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Coffee date ☕','Study session 📚','Date night 🌙','Girls trip ✈️','Job interview','Brunch 🥂','Gym 🏋️','Campus walk'].map(o => (
                    <span key={o} className="badge">{o}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Feature 2 – Layering */}
            <div className="grid md:grid-cols-2 gap-14 items-center mb-28">
              <div className="order-2 md:order-1">
                <p className="label-tag mb-4" style={{ color: ROSE }}>Fragrance Layering</p>
                <h3 className="text-3xl md:text-4xl font-light serif mb-4 leading-tight">
                  Layer your perfumes<br />like a pro.
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  The scents that get you the most compliments are almost always layered. Your Scents analyses every note across your collection and finds combinations that actually work — and tells you exactly why.
                </p>
                <ul className="space-y-3">
                  {[
                    'Note compatibility scoring across every bottle you own',
                    'Instant layering suggestions — no expertise needed',
                    'Save your fave stacks and pull them up anytime',
                  ].map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <Check size={14} className="mt-0.5 shrink-0" style={{ color: ROSE }} strokeWidth={2.5} />{f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-1 md:order-2 photo-frame aspect-[4/3] overflow-hidden rounded-3xl">
                <img
                  src={PHOTOS.feature2}
                  alt="Close-up of a luxury perfume bottle with warm tones"
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=900&q=85&fit=crop' }}
                />
              </div>
            </div>

            {/* Feature 3 – Scent card */}
            <div className="grid md:grid-cols-2 gap-14 items-center">
              <div className="relative">
                <div className="photo-frame aspect-[4/3] overflow-hidden rounded-3xl">
                  <img
                    src={PHOTOS.feature3}
                    alt="Perfume bottles on marble with pink flowers — aesthetic flat lay"
                    className="w-full h-full object-cover brightness-75"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1590156562745-5614cf0ee37e?w=900&q=85&fit=crop' }}
                  />
                </div>
                {/* Overlaid scent card preview */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="glass-card px-6 py-5 shadow-2xl max-w-[220px] text-center">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Scent Profile ✨</p>
                    <p className="text-base font-medium serif mb-3">Maya&apos;s Wardrobe</p>
                    <div className="flex flex-wrap gap-1 justify-center mb-3">
                      {['Rose','Vanilla','Musk','Iris','Peach'].map(n => (
                        <span key={n} className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: ROSE_LIGHT, color: ROSE_TEXT }}>{n}</span>
                      ))}
                    </div>
                    <p className="text-[10px] text-muted-foreground">12 fragrances · 4 signature notes</p>
                    <div className="mt-3 pt-3 border-t border-border text-[10px] font-medium" style={{ color: ROSE }}>yourscents.beauty/maya</div>
                  </div>
                </div>
              </div>
              <div>
                <p className="label-tag mb-4" style={{ color: ROSE }}>Shareable Scent Cards</p>
                <h3 className="text-3xl md:text-4xl font-light serif mb-4 leading-tight">
                  Share your collection.<br />Start conversations.
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Generate a beautiful card showing your full fragrance wardrobe, your signature notes, and your fave stacks. Built for the moment someone asks &ldquo;omg what are you wearing?&rdquo;
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  One link. Post it on TikTok, drop it in your Instagram bio, or text it to your girls.
                </p>
                <Button
                  asChild
                  className="rounded-full px-6 text-sm font-semibold"
                  style={{ background: ROSE, color: '#fff' }}
                >
                  <Link href="/signup">Create Your Card 🌸 <ChevronRight size={14} className="ml-1" /></Link>
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
              <p className="label-tag mb-3" style={{ color: ROSE }}>How It Works</p>
              <h2 className="text-4xl md:text-5xl font-light serif">
                Set up in minutes.<em className="italic"> Use it every day.</em>
              </h2>
            </div>
            <div className="grid md:grid-cols-4 gap-5">
              {[
                { step:'01', icon:Search,       title:'Add Your Bottles',       body:'Search 70,000+ fragrances. Add every perfume, decant, and sample you own in seconds.' },
                { step:'02', icon:FlaskConical,  title:'Notes Are Decoded',      body:'We map every top, heart, and base note automatically — no manual entry, no guesswork.' },
                { step:'03', icon:Layers,        title:'Get Layer Suggestions',  body:'See which perfumes pair perfectly together, with a score and explanation of why they work.' },
                { step:'04', icon:CalendarDays,  title:'Pick by Vibe',           body:'Tell us where you are going — date, class, brunch — and we pull the perfect scent from what you own.' },
              ].map(({ step, icon: Icon, title, body }) => (
                <div key={step} className="card-soft flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: ROSE_LIGHT }}>
                      <Icon size={18} strokeWidth={1.5} style={{ color: ROSE }} />
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
              <p className="label-tag mb-4" style={{ color: ROSE }}>Fragrance 101 🌸</p>
              <h2 className="text-4xl md:text-5xl font-light leading-tight mb-5 serif">
                The art of smelling<em className="italic"> unforgettable.</em>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The most unforgettable scents you smell on people are almost never from one bottle. Fragrance layering is a centuries-old technique — and now it&apos;s having its TikTok moment.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The key is knowing which notes complement each other vs. clash. Your Scents runs that analysis across your entire collection automatically — every possible combination, instantly surfaced.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { icon:Sparkles, term:'Top Notes',  body:'The opening impression — citrus, herbs, light florals. They fade in 20–30 minutes but totally set the vibe when you first walk in.' },
                { icon:Heart,    term:'Heart Notes', body:'The main character era. Florals, spices, soft roses. This is what your friends smell on you hours later.' },
                { icon:Star,     term:'Base Notes',  body:'Your lasting signature — musks, woods, vanilla, amber. These anchor everything and are the foundation of any iconic layering combo.' },
              ].map(({ icon: Icon, term, body }) => (
                <div key={term} className="card-soft flex gap-4">
                  <div className="mt-0.5 shrink-0 w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: ROSE_LIGHT }}>
                    <Icon size={16} strokeWidth={1.5} style={{ color: ROSE }} />
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
              <p className="label-tag mb-3" style={{ color: ROSE }}>Trending Right Now 🔥</p>
              <h2 className="text-4xl md:text-5xl font-light serif">
                Fragrance is having its moment.
              </h2>
              <p className="mt-4 text-muted-foreground text-base max-w-lg mx-auto">
                &ldquo;What perfume should I wear to...&rdquo; is one of TikTok&apos;s fastest-growing searches. Your Scents was literally built for this.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { handle:'@scentgirlie', text:'searched "what perfume to wear on a first date" for 20 mins straight… someone please build an app that just uses YOUR collection omg', likes:'4.2k' },
                { handle:'@perfumegirlies', text:'the way I own 18 perfumes and wear the same two every single day 😭 I need help', likes:'11.8k' },
                { handle:'@fragrancenerdd', text:'can we talk about fragrance layering?? rose + vanilla + a little oud is SENDING me. what combos are you guys doing??', likes:'6.5k' },
              ].map(({ handle, text, likes }) => (
                <div key={handle} className="bg-card border border-border rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium" style={{ background: ROSE_LIGHT, color: ROSE_TEXT }}>
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
              <p className="label-tag mb-3" style={{ color: ROSE }}>What Girls Are Saying 💬</p>
              <h2 className="text-4xl md:text-5xl font-light serif">
                Built for scent girlies.
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { quote:'I own 23 perfumes and was only reaching for four. This showed me I had the perfect scent for every single vibe already sitting on my shelf.', name:'Sophia R.', detail:'College junior, 23 bottles', avatar: PHOTOS.avatar1 },
                { quote:'The layering suggestions are so good. Found a combo of two perfumes I&apos;ve had for years that smells completely new — everyone asks what I&apos;m wearing now.', name:'Maya K.',   detail:'Niche fragrance lover', avatar: PHOTOS.avatar2 },
                { quote:'The shareable scent card is everything. I just drop my link when someone DMs asking what I wear — so much easier than typing it all out lol.', name:'Jade T.',   detail:'Beauty content creator', avatar: PHOTOS.avatar3 },
              ].map(({ quote, name, detail, avatar }) => (
                <div key={name} className="testimonial-card flex flex-col gap-4">
                  <div className="flex gap-0.5" style={{ color: ROSE }}>
                    {[1,2,3,4,5].map(s => <Star key={s} size={12} fill="currentColor" strokeWidth={0} />)}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed flex-1">&ldquo;{quote}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-3 border-t border-border">
                    <img
                      src={avatar} alt={name}
                      className="w-9 h-9 rounded-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                    />
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
              <p className="label-tag mb-3" style={{ color: ROSE }}>Pricing</p>
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
                  description:'For the serious scent girlie',
                  features:['Unlimited fragrance wardrobe','Unlimited layering combinations','Full occasion planner','Note compatibility scores','Shareable scent cards'],
                  cta:'Go Pro ✨', href:'/signup?plan=pro', highlighted:true,
                },
                {
                  name:'Collector', price:'$14.99', period:'/month',
                  description:'For the obsessed (us rn)',
                  features:['Everything in Pro','Public collection profile','Wishlist & ownership tracking','Bottle level tracking','Stack history and favourites','Priority support'],
                  cta:'Go Collector 🌸', href:'/signup?plan=collector', highlighted:false,
                },
              ].map((plan) => (
                <div key={plan.name} className={`rounded-2xl p-8 flex flex-col border transition-shadow ${
                  plan.highlighted
                    ? 'border-[hsl(340_55%_75%)] shadow-xl'
                    : 'border-border bg-card hover:shadow-md'
                }`}
                style={plan.highlighted ? { background: 'hsl(340 50% 97%)' } : {}}
                >
                  {plan.highlighted && <span className="badge w-fit mb-5">Most Popular 💕</span>}
                  <h3 className="text-2xl font-light mb-1 serif">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground mb-6">{plan.description}</p>
                  <div className="mb-8">
                    <span className="text-4xl font-light serif">{plan.price}</span>
                    <span className="text-sm text-muted-foreground ml-1.5">{plan.period}</span>
                  </div>
                  <ul className="space-y-3.5 mb-9 flex-1">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <Check size={13} className="mt-0.5 shrink-0" style={{ color: ROSE }} strokeWidth={2.5} />{f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    variant={plan.highlighted ? 'default' : 'outline'}
                    className="rounded-full text-xs font-semibold w-full"
                    style={plan.highlighted ? { background: ROSE, color: '#fff' } : {}}
                  >
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
              <p className="label-tag mb-3" style={{ color: ROSE }}>FAQ</p>
              <h2 className="text-4xl md:text-5xl font-light serif">Common questions.</h2>
            </div>
            <div className="space-y-3">
              {[
                {
                  q: 'Do I have to own these perfumes already?',
                  a: 'Yes — Your Scents is built around the collection you already own. You add your bottles, and we do everything else. There is nothing to buy. You can also wishlist fragrances you want and get layering suggestions that include them.',
                },
                {
                  q: 'How does it know what notes are in my perfumes?',
                  a: 'We use a database of over 70,000 fragrances with verified top, heart, and base note data. When you add a bottle, we automatically pull its full note profile — no manual entry required.',
                },
                {
                  q: 'What is a scent card?',
                  a: 'A scent card is a beautiful shareable page showing your fragrance wardrobe, your signature notes, and your favourite stacks. It has its own URL — post it on TikTok, put it in your Instagram bio, or send it when someone asks what you wear.',
                },
                {
                  q: 'Can I use this if I only own a few perfumes?',
                  a: 'Absolutely! The free plan supports up to 3 fragrances, which is plenty to start getting layering suggestions and occasion recommendations. You will be surprised what combinations even a small collection unlocks.',
                },
                {
                  q: 'Is there a mobile app?',
                  a: 'Your Scents is a fully responsive web app that works perfectly on any phone — no download needed. A native app is on the roadmap!',
                },
                {
                  q: 'Can I cancel my subscription anytime?',
                  a: 'Yes, any time, no questions asked. Your collection data stays yours and will still be accessible on the free plan after you cancel.',
                },
              ].map(({ q, a }) => <FAQItem key={q} q={q} a={a} />)}
            </div>
          </div>
        </section>

        {/* FINAL CTA ───────────────────────────────────────── */}
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden">
              <img
                src={PHOTOS.ctaBg}
                alt="Aesthetic perfume bottles on a pink background"
                className="w-full h-80 object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=1400&q=85&fit=crop' }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-14 px-8 text-center"
                style={{ background: 'linear-gradient(to top, hsl(340 20% 8% / 0.90), hsl(340 20% 8% / 0.40) 60%, transparent)' }}
              >
                <h2 className="text-4xl md:text-5xl font-light text-white serif mb-4 text-balance">
                  Your signature scent is already in your wardrobe. 🌸
                </h2>
                <p className="text-white/70 text-sm mb-8 max-w-md">
                  Start free. Add your collection. Discover combinations you never knew existed.
                </p>
                <Button
                  asChild size="lg"
                  className="rounded-full px-10 text-sm font-semibold"
                  style={{ background: ROSE, color: '#fff' }}
                >
                  <Link href="/signup">Build My Scent Wardrobe ✨</Link>
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
                <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: ROSE }}>
                  <span className="text-white text-[10px] font-bold">S</span>
                </div>
                <p className="text-base font-medium serif">Your Scents</p>
              </div>
              <p className="text-xs text-muted-foreground">The intelligent fragrance wardrobe app. 🌸</p>
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
            {' '}<span className="opacity-50">Photos: Unsplash</span>
          </p>
        </div>
      </footer>

    </div>
  )
}
