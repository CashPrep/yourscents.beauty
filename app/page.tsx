'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Search, Layers, CalendarDays, FlaskConical,
  ArrowRight, Check, Sparkles, Star,
  ChevronRight, Plus, Minus, Zap, Shield, Globe,
} from 'lucide-react'

const GOLD = 'hsl(42 85% 68%)'
const GOLD_DIM = 'hsl(42 55% 45%)'
const GOLD_BG = 'hsl(42 85% 68% / 0.10)'

const PHOTOS = {
  hero:     'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=900&q=90&fit=crop',
  feature1: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=900&q=85&fit=crop',
  feature2: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=900&q=85&fit=crop',
  feature3: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=900&q=85&fit=crop',
  ctaBg:    'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=1400&q=85&fit=crop',
  avatar1:  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&fit=crop&crop=face',
  avatar2:  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face',
  avatar3:  'https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=80&h=80&fit=crop&crop=face',
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full text-left panel px-6 py-5 hover:border-[hsl(42_85%_68%_/_0.2)] transition-colors"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-foreground">{q}</span>
        {open
          ? <Minus size={14} className="shrink-0 text-gold" style={{ color: GOLD }} />
          : <Plus size={14} className="shrink-0 text-muted-foreground" />}
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
      <p className="text-sm font-semibold mb-1" style={{ color: GOLD }}>You&apos;re on the list.</p>
      <p className="text-xs text-muted-foreground">Your free scent profile is on its way.</p>
    </div>
  ) : (
    <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <Input
        type="email" required placeholder="your@email.com"
        value={email} onChange={e => setEmail(e.target.value)}
        className="rounded-full flex-1 text-sm px-5 bg-card border-border"
      />
      <button type="submit" className="btn-gold px-7 py-2.5 text-sm shrink-0">
        Get Free Profile
      </button>
    </form>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: GOLD }}>
              <span className="text-[hsl(220_18%_6%)] text-xs font-bold">S</span>
            </div>
            <span className="text-base font-semibold tracking-tight">ScentStack</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</Link>
            <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
            <Link href="#faq" className="hover:text-foreground transition-colors">FAQ</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block">Sign in</Link>
            <Link href="/signup">
              <button className="btn-gold px-5 py-2 text-xs">Start Free</button>
            </Link>
          </div>
        </div>
      </header>

      <main>

        {/* HERO */}
        <section className="hero-bg pt-36 pb-28 px-6 relative overflow-hidden">
          {/* subtle grid bg */}
          <div className="pointer-events-none absolute inset-0" style={{
            backgroundImage: 'linear-gradient(hsl(220 14% 15% / 0.35) 1px, transparent 1px), linear-gradient(90deg, hsl(220 14% 15% / 0.35) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 0%, transparent 100%)'
          }} />

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <div className="chip mb-6">⚡ 70,000+ fragrances indexed</div>
              <h1 className="text-5xl md:text-[3.5rem] leading-[1.06] font-normal text-balance mb-6 serif">
                Your fragrance wardrobe,{' '}
                <em className="italic" style={{ color: GOLD }}>intelligently layered.</em>
              </h1>
              <p className="text-base text-muted-foreground max-w-md leading-relaxed mb-8">
                ScentStack decodes every note in your collection and tells you exactly how to stack them — by vibe, occasion, or chemistry. No guesswork.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-3 mb-12">
                <Link href="/signup">
                  <button className="btn-gold px-8 py-3 text-sm">Build My Wardrobe — Free</button>
                </Link>
                <Link href="#features" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group h-11 px-2">
                  See how it works <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[PHOTOS.avatar1, PHOTOS.avatar2, PHOTOS.avatar3].map((src, i) => (
                    <img key={i} src={src} alt="" className="w-8 h-8 rounded-full border-2 border-background object-cover" />
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5" style={{ color: GOLD }}>
                    {[1,2,3,4,5].map(s => <Star key={s} size={11} fill="currentColor" strokeWidth={0} />)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">Trusted by serious fragrance collectors</p>
                </div>
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative">
              <div className="aspect-[4/5] w-full max-w-md ml-auto overflow-hidden rounded-2xl" style={{ boxShadow: '0 24px 80px hsl(0 0% 0% / 0.55)' }}>
                <img
                  src={PHOTOS.hero} alt="Fragrance collection"
                  className="w-full h-full object-cover brightness-75"
                />
              </div>
              {/* Floating stat */}
              <div className="glass absolute -bottom-4 -left-4 md:-left-10 px-5 py-4">
                <p className="text-2xl font-light serif" style={{ color: GOLD }}>70k+</p>
                <p className="text-xs text-muted-foreground mt-0.5">Fragrances indexed</p>
              </div>
              {/* Floating occasion pill */}
              <div className="glass absolute top-6 -right-0 md:-right-6 px-4 py-3 max-w-[180px]">
                <p className="eyebrow mb-1.5">Tonight&apos;s stack</p>
                <p className="text-sm font-medium serif">Date Night</p>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {['Oud', 'Rose', 'Amber'].map(n => (
                    <span key={n} className="chip" style={{ fontSize: '10px', padding: '2px 8px' }}>{n}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST BAR */}
        <section className="py-10 px-6 border-y border-border" style={{ background: 'hsl(220 16% 8%)' }}>
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { stat: '70,000+',       label: 'Fragrances indexed' },
              { stat: 'Top · Heart · Base', label: 'Every note decoded' },
              { stat: 'Unlimited',     label: 'Layering combos' },
              { stat: 'Free to start', label: 'No card required' },
            ].map(({ stat, label }) => (
              <div key={label}>
                <p className="text-lg md:text-xl font-medium serif mb-1" style={{ color: GOLD }}>{stat}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* EMAIL CAPTURE */}
        <section className="py-16 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <p className="eyebrow mb-3">Free Scent Profile</p>
            <h2 className="text-3xl md:text-4xl font-normal serif mb-3">Find your signature scent.</h2>
            <p className="text-muted-foreground text-sm mb-8 max-w-sm mx-auto">
              Drop your email and we&apos;ll send you a free personalised fragrance profile — no subscription needed.
            </p>
            <EmailCapture />
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6"><div className="rule opacity-60" /></div>

        {/* FEATURES */}
        <section id="features" className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <p className="eyebrow mb-3">What ScentStack Does</p>
              <h2 className="text-4xl md:text-5xl font-normal serif">
                Your whole collection,{' '}<em className="italic" style={{ color: GOLD }}>working for you.</em>
              </h2>
              <p className="mt-4 text-muted-foreground text-base max-w-lg mx-auto">
                Most collectors own 5–15 perfumes and reach for the same one every day. ScentStack puts every bottle to work.
              </p>
            </div>

            {/* Feature 1 */}
            <div className="grid md:grid-cols-2 gap-16 items-center mb-28">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl" style={{ boxShadow: '0 16px 60px hsl(0 0% 0% / 0.5)' }}>
                <img src={PHOTOS.feature1} alt="" className="w-full h-full object-cover brightness-75" />
              </div>
              <div>
                <p className="eyebrow mb-4">Occasion Intelligence</p>
                <h3 className="text-3xl md:text-4xl font-normal serif mb-4 leading-tight">
                  Tell us where you&apos;re going.<br />
                  <em className="italic" style={{ color: GOLD }}>We&apos;ll build your stack.</em>
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Pick an occasion — date night, boardroom, weekend hike — and ScentStack pulls the perfect layering combo from your own inventory, scored by note compatibility.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Date Night','Office','Night Out','Casual Weekend','Gym','Wedding','Summer Day','Winter Evening'].map(o => (
                    <span key={o} className="chip-muted">{o}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="grid md:grid-cols-2 gap-16 items-center mb-28">
              <div className="order-2 md:order-1">
                <p className="eyebrow mb-4">Note-Layer Engine</p>
                <h3 className="text-3xl md:text-4xl font-normal serif mb-4 leading-tight">
                  Layer your perfumes<br />
                  <em className="italic" style={{ color: GOLD }}>like a master.</em>
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  The scents that turn heads are almost always layered. ScentStack analyses note chemistry across your entire wardrobe and surfaces combinations that actually work — with a compatibility score and a precise application sequence.
                </p>
                <ul className="space-y-3">
                  {[
                    'Note compatibility scored across every bottle you own',
                    'Instant stack suggestions ranked from best to worst match',
                    'Save favourite stacks and pull them up by occasion',
                  ].map(f => (
                    <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <Check size={14} className="mt-0.5 shrink-0" style={{ color: GOLD }} strokeWidth={2.5} />{f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-1 md:order-2 aspect-[4/3] overflow-hidden rounded-2xl" style={{ boxShadow: '0 16px 60px hsl(0 0% 0% / 0.5)' }}>
                <img src={PHOTOS.feature2} alt="" className="w-full h-full object-cover brightness-75" />
              </div>
            </div>

            {/* Feature 3 – Scent card */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl" style={{ boxShadow: '0 16px 60px hsl(0 0% 0% / 0.5)' }}>
                  <img src={PHOTOS.feature3} alt="" className="w-full h-full object-cover brightness-50" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="glass px-6 py-5 max-w-[220px] text-center">
                    <p className="eyebrow mb-2">Scent Profile</p>
                    <p className="text-base font-medium serif mb-3">Alex&apos;s Wardrobe</p>
                    <div className="flex flex-wrap gap-1 justify-center mb-3">
                      {['Oud','Vetiver','Musk','Iris','Amber'].map(n => (
                        <span key={n} className="chip" style={{ fontSize: '10px', padding: '2px 8px' }}>{n}</span>
                      ))}
                    </div>
                    <p className="text-[10px] text-muted-foreground">14 fragrances · 5 signature notes</p>
                    <div className="mt-3 pt-3 border-t border-border text-[10px] font-medium" style={{ color: GOLD }}>scentstack.app/u/alex</div>
                  </div>
                </div>
              </div>
              <div>
                <p className="eyebrow mb-4">Shareable Scent Cards</p>
                <h3 className="text-3xl md:text-4xl font-normal serif mb-4 leading-tight">
                  Share your collection.<br />
                  <em className="italic" style={{ color: GOLD }}>Start conversations.</em>
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Generate a beautiful card showing your full wardrobe, signature notes, and favourite stacks. Built for the moment someone asks &ldquo;what are you wearing?&rdquo;
                </p>
                <Link href="/signup">
                  <button className="btn-gold px-6 py-2.5 text-sm mt-2">Create Your Card <ChevronRight size={13} className="inline ml-1" /></button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6"><div className="rule opacity-60" /></div>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="eyebrow mb-3">How It Works</p>
              <h2 className="text-4xl md:text-5xl font-normal serif">
                Set up in minutes.<em className="italic" style={{ color: GOLD }}> Use it every day.</em>
              </h2>
            </div>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { step:'01', icon:Search,       title:'Add Your Bottles',      body:'Search 70,000+ fragrances. Add every perfume, decant, and sample in seconds.' },
                { step:'02', icon:FlaskConical,  title:'Notes Decoded',         body:'Every top, heart, and base note mapped automatically — no manual entry.' },
                { step:'03', icon:Layers,        title:'Get Stack Suggestions', body:'See which perfumes pair perfectly — scored by chemistry, ranked for you.' },
                { step:'04', icon:CalendarDays,  title:'Pick by Occasion',      body:'Date, office, brunch — we pull the perfect stack from what you already own.' },
              ].map(({ step, icon: Icon, title, body }) => (
                <div key={step} className="panel p-6 flex flex-col gap-4 lift">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: GOLD_BG }}>
                      <Icon size={17} strokeWidth={1.5} style={{ color: GOLD }} />
                    </div>
                    <span className="text-3xl font-light serif text-muted-foreground/20">{step}</span>
                  </div>
                  <h3 className="font-semibold text-sm">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6"><div className="rule opacity-60" /></div>

        {/* NOTE EDUCATION */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="eyebrow mb-4">Fragrance Science</p>
              <h2 className="text-4xl md:text-5xl font-normal leading-tight mb-5 serif">
                The architecture of an{' '}<em className="italic" style={{ color: GOLD }}>unforgettable scent.</em>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The scents that linger in memory are layered — a centuries-old technique now powered by data. The key is knowing which notes complement each other vs. clash.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                ScentStack runs this analysis across your entire collection — every possible combination, instantly surfaced and ranked.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { icon:Zap,     term:'Top Notes',   body:'The opening impression — citrus, herbs, light florals. They fade in 15–30 min but define your first impression completely.' },
                { icon:Sparkles,term:'Heart Notes',  body:'The main character. Florals, spices, soft rose. This is what people smell on you hours into the day.' },
                { icon:Shield,  term:'Base Notes',   body:'Your lasting signature — musks, woods, vanilla, amber. These anchor the stack and are the foundation of every iconic combo.' },
              ].map(({ icon: Icon, term, body }) => (
                <div key={term} className="panel p-5 flex gap-4">
                  <div className="mt-0.5 shrink-0 w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: GOLD_BG }}>
                    <Icon size={15} strokeWidth={1.5} style={{ color: GOLD }} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-1.5">{term}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6"><div className="rule opacity-60" /></div>

        {/* TESTIMONIALS */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="eyebrow mb-3">Reviews</p>
              <h2 className="text-4xl md:text-5xl font-normal serif">What collectors are saying.</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { quote:'I own 23 perfumes and was only reaching for four. This showed me the perfect scent for every occasion already sitting on my shelf.', name:'Sophia R.', detail:'23-bottle collector', avatar: PHOTOS.avatar1 },
                { quote:'The layering suggestions are genuinely brilliant. Found a combo I\'ve had for years that smells completely new — everyone asks what I\'m wearing now.', name:'Maya K.',   detail:'Niche fragrance enthusiast', avatar: PHOTOS.avatar2 },
                { quote:'The occasion planner is the most useful feature. I pick where I\'m going and it builds a stack from what I already own. Saves me 10 min every morning.', name:'Jade T.',   detail:'Beauty content creator', avatar: PHOTOS.avatar3 },
              ].map(({ quote, name, detail, avatar }) => (
                <div key={name} className="panel p-6 flex flex-col gap-4">
                  <div className="flex gap-0.5" style={{ color: GOLD }}>
                    {[1,2,3,4,5].map(s => <Star key={s} size={11} fill="currentColor" strokeWidth={0} />)}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed flex-1">&ldquo;{quote}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-3 border-t border-border">
                    <img src={avatar} alt={name} className="w-9 h-9 rounded-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
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

        <div className="max-w-4xl mx-auto px-6"><div className="rule opacity-60" /></div>

        {/* PRICING */}
        <section id="pricing" className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="eyebrow mb-3">Pricing</p>
              <h2 className="text-4xl md:text-5xl font-normal serif">Start free. Upgrade when ready.</h2>
              <p className="mt-3 text-muted-foreground text-sm">No commitment. Cancel anytime.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name:'Free', price:'$0', period:'forever',
                  description:'For the casual collector',
                  features:['Up to 3 fragrances','3 layering suggestions/day','Basic occasion matching','70,000+ fragrance search'],
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
                  features:['Everything in Pro','Public collection profile','Wishlist & ownership tracking','Bottle level tracking','Stack history and favourites','Priority support'],
                  cta:'Go Collector', href:'/signup?plan=collector', highlighted:false,
                },
              ].map((plan) => (
                <div key={plan.name} className={`rounded-2xl p-8 flex flex-col ${
                  plan.highlighted
                    ? 'panel-glow'
                    : 'panel'
                }`}>
                  {plan.highlighted && (
                    <span className="chip w-fit mb-5 text-[10px]">Most Popular</span>
                  )}
                  <h3 className="text-2xl font-normal mb-1 serif">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground mb-6">{plan.description}</p>
                  <div className="mb-8">
                    <span className="text-4xl font-normal serif" style={plan.highlighted ? { color: GOLD } : {}}>{plan.price}</span>
                    <span className="text-sm text-muted-foreground ml-1.5">{plan.period}</span>
                  </div>
                  <ul className="space-y-3.5 mb-9 flex-1">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <Check size={12} className="mt-1 shrink-0" style={{ color: GOLD }} strokeWidth={2.5} />{f}
                      </li>
                    ))}
                  </ul>
                  <Link href={plan.href}>
                    {plan.highlighted
                      ? <button className="btn-gold w-full py-2.5 text-xs">{plan.cta}</button>
                      : <button className="w-full py-2.5 text-xs font-semibold rounded-full border border-border hover:border-[hsl(42_85%_68%_/_0.35)] transition-colors">{plan.cta}</button>
                    }
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6"><div className="rule opacity-60" /></div>

        {/* FAQ */}
        <section id="faq" className="py-24 px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-14">
              <p className="eyebrow mb-3">FAQ</p>
              <h2 className="text-4xl md:text-5xl font-normal serif">Common questions.</h2>
            </div>
            <div className="space-y-2">
              {[
                { q:'Do I have to own these perfumes already?', a:'Yes — ScentStack is built around the collection you already own. You add your bottles, and we do everything else. You can also wishlist fragrances and get layering suggestions that include them.' },
                { q:'How does it know what notes are in my perfumes?', a:'We use a database of over 70,000 fragrances with verified top, heart, and base note data. When you add a bottle, we automatically pull its full note profile — no manual entry required.' },
                { q:'What is a scent card?', a:'A shareable page showing your fragrance wardrobe, signature notes, and favourite stacks — with its own URL. Post it on TikTok, put it in your bio, or send it when someone asks what you wear.' },
                { q:'Can I use this if I only own a few perfumes?', a:'Absolutely. The free plan supports up to 3 fragrances, which is plenty to start getting layering suggestions and occasion recommendations.' },
                { q:'Is there a mobile app?', a:'ScentStack is a fully responsive web app that works perfectly on any phone — no download needed. A native app is on the roadmap.' },
                { q:'Can I cancel my subscription anytime?', a:'Yes, any time, no questions asked. Your collection data stays yours and will still be accessible on the free plan after you cancel.' },
              ].map(({ q, a }) => <FAQItem key={q} q={q} a={a} />)}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden">
              <img src={PHOTOS.ctaBg} alt="" className="w-full h-72 object-cover brightness-40" />
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 px-8 text-center"
                style={{ background: 'linear-gradient(to top, hsl(220 18% 6% / 0.95), hsl(220 18% 6% / 0.5) 60%, transparent)' }}
              >
                <h2 className="text-4xl md:text-5xl font-normal text-white serif mb-4 text-balance">
                  Your signature stack is already in your wardrobe.
                </h2>
                <p className="text-white/60 text-sm mb-8 max-w-md">
                  Start free. Add your collection. Discover combinations you never knew existed.
                </p>
                <Link href="/signup">
                  <button className="btn-gold px-10 py-3 text-sm">Build My Wardrobe</button>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-border py-12 px-6" style={{ background: 'hsl(220 18% 5%)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: GOLD }}>
                  <span className="text-[hsl(220_18%_6%)] text-[10px] font-bold">S</span>
                </div>
                <p className="text-sm font-semibold">ScentStack</p>
              </div>
              <p className="text-xs text-muted-foreground">The intelligent fragrance wardrobe.</p>
            </div>
            <div className="flex gap-6 text-xs text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
            </div>
          </div>
          <div className="rule opacity-30 mt-8 mb-5" />
          <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} ScentStack. All rights reserved.</p>
        </div>
      </footer>

    </div>
  )
}
