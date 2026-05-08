'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import {
  Search, Layers, CalendarDays, FlaskConical,
  ArrowRight, Check, Sparkles, Heart,
  Plus, Minus, Droplets, Wind, Flame, Clock, TrendingUp,
  Activity, Cpu,
} from 'lucide-react'

// ── Rose palette tokens (matches globals.css YS logo colors) ────────────────
const R       = 'hsl(8 48% 72%)'       // dusty rose
const R_DEEP  = 'hsl(3 40% 58%)'       // mauve rose
const R_BG    = 'hsl(8 56% 76% / 0.12)'
const R_BORDER = 'hsl(8 56% 76% / 0.32)'

const LOGO_URL = 'https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/67238f7d-e958-42c4-9876-33b89144adfd.png'

const PHOTOS = {
  hero:  'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=900&q=90&fit=crop',
  ctaBg: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=1400&q=85&fit=crop',
}

const PERFUMES = [
  {
    id: 'bleu', name: 'Bleu de Chanel', house: 'Chanel', family: 'Woody Aromatic',
    longevity: 88, projection: 72, complexity: 65, warmth: 55, freshness: 80,
    notes: { top: ['Grapefruit', 'Lemon', 'Mint', 'Pink Pepper'], heart: ['Ginger', 'Nutmeg', 'Jasmine', 'Iso E Super'], base: ['Incense', 'Vetiver', 'Cedar', 'Sandalwood', 'Patchouli', 'White Musk'] },
    layersWith: ['sauvage', 'terra'], occasions: ['office', 'casual', 'interview', 'travel'], layerOrder: 'base',
    tip: 'Apply first as a base layer — its cedar and vetiver create a woody canvas that lets fresher scents sit on top.',
    vibe: 'Crisp, clean, elevated',
  },
  {
    id: 'sauvage', name: 'Dior Sauvage', house: 'Dior', family: 'Fresh Spicy',
    longevity: 92, projection: 90, complexity: 70, warmth: 60, freshness: 85,
    notes: { top: ['Bergamot', 'Pepper'], heart: ['Lavender', 'Star Anise', 'Pink Pepper', 'Geranium', 'Sichuan Pepper', 'Elemi', 'Nutmeg'], base: ['Ambroxan', 'Cedar', 'Labdanum', 'Vetiver'] },
    layersWith: ['bleu', 'aventus'], occasions: ['date', 'night-out', 'office', 'gym'], layerOrder: 'top',
    tip: 'Spray last over a muskier base. Ambroxan in the drydown amplifies everything underneath it.',
    vibe: 'Magnetic, powerful, skin-close',
  },
  {
    id: 'aventus', name: 'Creed Aventus', house: 'Creed', family: 'Fruity Chypre',
    longevity: 85, projection: 80, complexity: 95, warmth: 65, freshness: 70,
    notes: { top: ['Pineapple', 'Bergamot', 'Black Currant', 'Apple'], heart: ['Rose', 'Dry Birch', 'Moroccan Jasmine', 'Patchouli'], base: ['Musk', 'Oakmoss', 'Ambergris', 'Vanilla'] },
    layersWith: ['sauvage', 'oud'], occasions: ['date', 'wedding', 'business', 'night-out'], layerOrder: 'mid',
    tip: 'Layer over a clean musky base. Its pineapple-bergamot top opens beautifully; let it breathe 5 min before adding a second scent.',
    vibe: 'Aspirational, bold, sophisticated',
  },
  {
    id: 'oud', name: 'Tom Ford Oud Wood', house: 'Tom Ford', family: 'Oriental Woody',
    longevity: 95, projection: 75, complexity: 90, warmth: 95, freshness: 20,
    notes: { top: ['Oud', 'Rosewood', 'Cardamom'], heart: ['Sandalwood', 'Vetiver', 'Tonka Bean'], base: ['Amber', 'Musk', 'Vanilla'] },
    layersWith: ['aventus', 'rose'], occasions: ['date', 'evening', 'winter', 'wedding'], layerOrder: 'base',
    tip: 'Always apply first — oud needs skin heat to bloom. Its amber and vanilla create a rich anchor for lighter florals or citrus on top.',
    vibe: 'Mysterious, smoky, ultra-luxurious',
  },
  {
    id: 'rose', name: 'Replica — Flower Market', house: 'Maison Margiela', family: 'Floral Green',
    longevity: 65, projection: 55, complexity: 72, warmth: 45, freshness: 90,
    notes: { top: ['Pink Pepper', 'Bergamot', 'Lemon'], heart: ['Peony', 'Peach Blossom', 'Heliotrope', 'Rose'], base: ['Musk', 'Cashmere Wood', 'Sandalwood'] },
    layersWith: ['oud', 'bleu'], occasions: ['brunch', 'date', 'spring', 'casual'], layerOrder: 'top',
    tip: 'Apply over a warm woody base — the contrast between the soft rose heart and a rich base is what makes this combination stop people in their tracks.',
    vibe: 'Effortless, romantic, light',
  },
  {
    id: 'terra', name: "Terre d'Hermès", house: 'Hermès', family: 'Woody Citrus',
    longevity: 80, projection: 68, complexity: 78, warmth: 70, freshness: 62,
    notes: { top: ['Orange', 'Grapefruit', 'Flint'], heart: ['Pepper', 'Geranium', 'Benzyl Acetate'], base: ['Vetiver', 'Cedar', 'Benzoin', 'Tonka Bean'] },
    layersWith: ['bleu', 'rose'], occasions: ['office', 'casual', 'travel', 'autumn'], layerOrder: 'base',
    tip: 'Use as a subtle foundation layer. Its earthy vetiver and cedar work as a grounding force — pair with anything citrus on top for a natural accord.',
    vibe: 'Earthy, intellectual, natural',
  },
]

const STACKS = [
  {
    id: 's1', name: 'The Power Move', perfumes: ['sauvage', 'aventus'], compatibility: 94,
    occasions: ['date', 'night-out', 'business'], season: 'Year-round',
    description: "Sauvage's electrifying Ambroxan backbone amplifies Aventus' smoky birch and pineapple. The result is magnetic, aspirational, and incredibly long-lasting.",
    steps: ['Apply Aventus on pulse points (wrists, neck)', 'Wait 3 minutes for the top notes to settle', 'Lightly mist Sauvage across chest and one wrist', 'Let them merge naturally — do not rub'],
  },
  {
    id: 's2', name: 'Dark Romance', perfumes: ['oud', 'rose'], compatibility: 91,
    occasions: ['date', 'evening', 'wedding'], season: 'Autumn / Winter',
    description: "Oud Wood's smoldering amber and vanilla base turns Flower Market's soft peony into something deeply intoxicating. A classic oriental-floral contrast that turns heads.",
    steps: ['Apply Oud Wood to wrists and neck — it needs heat to bloom', 'Wait 5 minutes for the resinous base to settle into skin', 'Add a single spray of Flower Market to the collarbone', 'The heat contrast between warm oud and fresh rose is the magic'],
  },
  {
    id: 's3', name: 'Clean Sophistication', perfumes: ['bleu', 'terra'], compatibility: 87,
    occasions: ['office', 'interview', 'casual', 'travel'], season: 'Spring / Summer',
    description: 'Both fragrances live in the woody-aromatic-citrus space, making them synergistic rather than competing. Bleu adds freshness, Terre adds earthiness and depth.',
    steps: ["Apply Terre d'Hermès to wrists — let it anchor", 'Spray Bleu de Chanel on chest and neck', 'The grapefruit and cedar bridges between them naturally', 'Works especially well in warm weather when skin projects both'],
  },
  {
    id: 's4', name: 'Summer Night', perfumes: ['aventus', 'rose'], compatibility: 83,
    occasions: ['date', 'brunch', 'casual'], season: 'Spring / Summer',
    description: "Aventus' fruity-chypre brightness layered with Flower Market's clean florals is an effortlessly charming combination — confident but approachable.",
    steps: ['Apply Aventus first — the birch and pineapple need to open', 'Wait 2 minutes then apply Flower Market to the neck', 'Keep both applications light — this stack is about subtlety', 'Ideal for afternoon into evening events'],
  },
]

const OCCASIONS = [
  { id: 'date',      label: 'Date Night',  icon: '🌹', stacks: ['s2', 's1'] },
  { id: 'office',    label: 'Office',      icon: '💼', stacks: ['s3', 's1'] },
  { id: 'night-out', label: 'Night Out',   icon: '🌙', stacks: ['s1', 's2'] },
  { id: 'casual',    label: 'Casual Day',  icon: '☀️', stacks: ['s3', 's4'] },
  { id: 'wedding',   label: 'Wedding',     icon: '✨', stacks: ['s2', 's1'] },
  { id: 'travel',    label: 'Travel',      icon: '✈️', stacks: ['s3', 's4'] },
  { id: 'brunch',    label: 'Brunch',      icon: '🌿', stacks: ['s4', 's3'] },
  { id: 'gym',       label: 'Gym',         icon: '⚡', stacks: ['s3'] },
]

const LAYERING_TIPS = [
  { icon: Droplets,   title: 'Moisturise First',       body: 'Apply an unscented lotion before layering. Dry skin eats fragrance — hydrated skin holds scent molecules longer and makes layers blend more cohesively.' },
  { icon: Flame,      title: 'Heaviest First',          body: 'Always apply your base-heavy scent first (ouds, ambers, musks). These need body heat to bloom and create the foundation that lighter top notes sit on.' },
  { icon: Clock,      title: 'Wait Between Layers',     body: 'Give each scent 2–5 minutes between applications. This prevents the top notes from fighting each other and allows each fragrance to open fully.' },
  { icon: Activity,   title: 'Pulse Points Only',       body: 'Apply to wrists, neck, inner elbows, and behind ears. These warm points project scent outward. Never rub — it crushes the top notes and breaks the accord.' },
  { icon: Wind,       title: 'Layer by Longevity',      body: 'Place shorter-lived scents (florals, citrus) on top of long-lasting bases (woody, oriental). As the top layer fades, the base continues to evolve and deepen.' },
  { icon: TrendingUp, title: 'Start Light, Build Up',   body: 'You can always add more — you can never remove. Use half your usual sprays per fragrance when layering. One-spray-each is often the perfect starting point.' },
]

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

function NoteBar({ label, value, color = R }: { label: string; value: number; color?: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[10px] text-muted-foreground w-20 shrink-0 uppercase tracking-wider">{label}</span>
      <div className="flex-1 score-bar-bg">
        <div className="score-bar-fill" style={{ width: `${value}%`, background: `linear-gradient(90deg, ${color}88, ${color})` }} />
      </div>
      <span className="text-[10px] tabular-nums" style={{ color }}>{value}</span>
    </div>
  )
}

function PerfumeCard({ p }: { p: typeof PERFUMES[0] }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="panel overflow-hidden transition-all duration-200" style={expanded ? { borderColor: R_BORDER } : {}}>
      <button className="w-full text-left p-6" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-start justify-between gap-3 mb-5">
          <div>
            <p className="eyebrow mb-1.5">{p.house}</p>
            <h3 className="text-[15px] font-semibold leading-snug tracking-tight">{p.name}</h3>
            <p className="text-xs text-muted-foreground mt-1">{p.family}</p>
          </div>
          <div className="shrink-0 flex flex-col items-end gap-1.5 pt-0.5">
            <span className="chip" style={{ fontSize: '9px', padding: '2px 9px' }}>{p.vibe.split(',')[0]}</span>
            <span className="text-[9px] tracking-wider" style={{ color: R_DEEP }}>{p.layerOrder.toUpperCase()} LAYER</span>
          </div>
        </div>
        <div className="space-y-2.5 mb-5">
          <NoteBar label="Longevity"  value={p.longevity} />
          <NoteBar label="Projection" value={p.projection} />
          <NoteBar label="Complexity" value={p.complexity} color="hsl(340 50% 68%)" />
          <NoteBar label="Warmth"     value={p.warmth}     color="hsl(13 55% 62%)" />
          <NoteBar label="Freshness"  value={p.freshness}  color="hsl(190 45% 58%)" />
        </div>
        <div className="flex flex-wrap gap-1 mb-4">
          {p.notes.top.slice(0, 3).map(n => (
            <span key={n} style={{ fontSize: '10px', padding: '2px 8px', background: 'hsl(190 45% 58% / 0.08)', color: 'hsl(190 45% 52%)', border: '1px solid hsl(190 45% 58% / 0.22)', borderRadius: '999px' }}>{n}</span>
          ))}
          {(p.notes.heart.length + p.notes.base.length) > 0 && (
            <span style={{ fontSize: '10px', padding: '2px 8px', background: 'hsl(18 40% 93%)', color: 'hsl(8 15% 52%)', border: '1px solid hsl(10 25% 86%)', borderRadius: '999px' }}>
              +{p.notes.heart.length + p.notes.base.length} more
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5" style={{ color: expanded ? R : R_DEEP }}>
          {expanded ? <Minus size={11} strokeWidth={2} /> : <Plus size={11} strokeWidth={2} />}
          <span className="text-[10px] font-semibold tracking-wide">{expanded ? 'HIDE ANALYSIS' : 'FULL ANALYSIS'}</span>
        </div>
      </button>

      {expanded && (
        <div className="border-t px-6 pb-6 pt-5 space-y-6" style={{ borderColor: 'hsl(10 30% 88%)' }} onClick={e => e.stopPropagation()}>
          <div>
            <p className="eyebrow mb-4">Note Pyramid</p>
            <div className="space-y-4">
              {[
                { icon: Wind,     color: 'hsl(190 45% 58%)', label: 'Top Notes',   timing: '0–30 min',    notes: p.notes.top },
                { icon: Sparkles, color: R,                   label: 'Heart Notes', timing: '30 min–3 hr', notes: p.notes.heart },
                { icon: Flame,    color: 'hsl(13 55% 62%)',   label: 'Base Notes',  timing: '3 hr+',       notes: p.notes.base },
              ].map(({ icon: Icon, color, label, timing, notes }) => (
                <div key={label}>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon size={10} style={{ color }} strokeWidth={2} />
                    <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color }}>{label}</span>
                    <span className="text-[10px] text-muted-foreground ml-auto">{timing}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {notes.map(n => (
                      <span key={n} style={{ fontSize: '10px', padding: '2px 8px', background: `${color.slice(0,-1)} / 0.09)`, color, border: `1px solid ${color.slice(0,-1)} / 0.22)`, borderRadius: '999px' }}>{n}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl p-4" style={{ background: R_BG, border: `1px solid ${R_BORDER}` }}>
            <p className="eyebrow mb-2">Layering Guide</p>
            <p className="text-[12px] text-muted-foreground leading-relaxed">{p.tip}</p>
          </div>
          <div>
            <p className="eyebrow mb-2.5">Stacks Best With</p>
            <div className="flex flex-wrap gap-1.5">
              {p.layersWith.map(id => {
                const match = PERFUMES.find(x => x.id === id)
                return match ? <span key={id} className="chip" style={{ fontSize: '10px', padding: '3px 10px' }}>{match.name}</span> : null
              })}
            </div>
          </div>
          <div>
            <p className="eyebrow mb-2.5">Best For</p>
            <div className="flex flex-wrap gap-1.5">
              {p.occasions.map(o => {
                const occ = OCCASIONS.find(x => x.id === o)
                return occ ? <span key={o} className="chip-muted" style={{ fontSize: '10px', padding: '3px 10px' }}>{occ.icon} {occ.label}</span> : null
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function StackCard({ stack }: { stack: typeof STACKS[0] }) {
  const perfumes = stack.perfumes.map(id => PERFUMES.find(p => p.id === id)!).filter(Boolean)
  const [expanded, setExpanded] = useState(false)
  const scoreColor = stack.compatibility >= 90 ? 'hsl(142 45% 52%)' : stack.compatibility >= 80 ? R : 'hsl(13 55% 62%)'

  return (
    <div className="panel-glow overflow-hidden transition-all duration-200">
      <div className="p-7">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <p className="eyebrow mb-1.5">Curated Stack</p>
            <h3 className="text-xl font-normal serif leading-tight">{stack.name}</h3>
          </div>
          <div className="text-right shrink-0">
            <p className="text-3xl font-light serif leading-none" style={{ color: scoreColor }}>{stack.compatibility}<span className="text-base ml-0.5">%</span></p>
            <p className="text-[10px] text-muted-foreground mt-0.5">MATCH</p>
          </div>
        </div>
        <div className="score-bar-bg mb-5">
          <div className="score-bar-fill" style={{ width: `${stack.compatibility}%`, background: `linear-gradient(90deg, ${scoreColor}66, ${scoreColor})` }} />
        </div>
        <div className="flex flex-wrap items-center gap-2 mb-5">
          {perfumes.map((p, i) => (
            <div key={p.id} className="flex items-center gap-2">
              {i > 0 && <span className="text-xs" style={{ color: R_DEEP }}>+</span>}
              <span className="chip" style={{ padding: '4px 12px', fontSize: '11px' }}>{p.name}</span>
            </div>
          ))}
        </div>
        <p className="text-[10px] tracking-wider text-muted-foreground mb-3">{stack.season.toUpperCase()}</p>
        <p className="text-[13px] text-muted-foreground leading-relaxed">{stack.description}</p>
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-5 flex items-center gap-2 text-[11px] font-semibold tracking-wide transition-colors"
          style={{ color: expanded ? R : R_DEEP }}
        >
          {expanded ? <Minus size={11} strokeWidth={2.5} /> : <Plus size={11} strokeWidth={2.5} />}
          {expanded ? 'HIDE STEPS' : 'HOW TO APPLY'}
        </button>
      </div>
      {expanded && (
        <div className="border-t px-7 pb-7 pt-5" style={{ borderColor: 'hsl(10 30% 88%)', background: 'hsl(10 55% 97%)' }}>
          <p className="eyebrow mb-4">Application Steps</p>
          <ol className="space-y-3">
            {stack.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="text-[10px] tabular-nums shrink-0 mt-0.5" style={{ color: R }}>{String(i + 1).padStart(2, '0')}</span>
                <p className="text-[13px] text-muted-foreground leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}

function OccasionPlanner() {
  const [selected, setSelected] = useState<string | null>(null)
  const occasion = OCCASIONS.find(o => o.id === selected)
  const matchedStacks = occasion ? STACKS.filter(s => occasion.stacks.includes(s.id)) : []
  return (
    <div>
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-10">
        {OCCASIONS.map(o => (
          <button key={o.id} onClick={() => setSelected(selected === o.id ? null : o.id)} className={`occasion-btn${selected === o.id ? ' active' : ''}`}>
            <span className="text-xl leading-none">{o.icon}</span>
            <span className="text-[11px] font-medium leading-tight">{o.label}</span>
          </button>
        ))}
      </div>
      {selected && matchedStacks.length > 0 && (
        <div className="space-y-5">
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: R }} />
            <p className="text-sm text-muted-foreground">Best stacks for <strong className="text-foreground">{occasion?.label}</strong></p>
          </div>
          {matchedStacks.map(s => <StackCard key={s.id} stack={s} />)}
        </div>
      )}
      {selected && matchedStacks.length === 0 && (
        <div className="panel p-10 text-center">
          <p className="text-sm text-muted-foreground">Add more fragrances to your wardrobe to unlock stacks for this occasion.</p>
        </div>
      )}
    </div>
  )
}

function InventorySuggester() {
  const inventory = ['bleu', 'sauvage', 'aventus']
  const inventoryPerfumes = PERFUMES.filter(p => inventory.includes(p.id))
  const suggestions = STACKS.filter(s => s.perfumes.every(pid => inventory.includes(pid)))
  return (
    <div>
      <div className="panel p-5 mb-8">
        <p className="eyebrow mb-3">Your Demo Wardrobe</p>
        <div className="flex flex-wrap gap-2">
          {inventoryPerfumes.map(p => (
            <div key={p.id} className="flex items-center gap-2 rounded-full px-3.5 py-1.5" style={{ background: R_BG, border: `1px solid ${R_BORDER}` }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: R }} />
              <span className="text-[12px] font-medium">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
      {suggestions.length > 0 ? (
        <div className="space-y-5">
          <p className="text-sm text-muted-foreground">Stacks you can build <strong className="text-foreground">right now</strong> from bottles you own:</p>
          {suggestions.map(s => <StackCard key={s.id} stack={s} />)}
        </div>
      ) : (
        <div className="panel p-10 text-center">
          <p className="text-sm text-muted-foreground">Add more fragrances to unlock inventory-based suggestions.</p>
        </div>
      )}
    </div>
  )
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <button onClick={() => setOpen(!open)} className="w-full text-left panel px-6 py-5 transition-colors" style={open ? { borderColor: R_BORDER } : {}}>
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-foreground">{q}</span>
        {open
          ? <Minus size={13} className="shrink-0" style={{ color: R }} strokeWidth={2.5} />
          : <Plus  size={13} className="shrink-0 text-muted-foreground" strokeWidth={2} />}
      </div>
      {open && (
        <p className="text-sm text-muted-foreground leading-relaxed mt-4 pt-4 border-t" style={{ borderColor: 'hsl(10 30% 88%)' }}>{a}</p>
      )}
    </button>
  )
}

function EmailCapture() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const submit = (e: React.FormEvent) => { e.preventDefault(); if (email) setDone(true) }
  return done ? (
    <div className="text-center py-4">
      <p className="text-sm font-semibold mb-1" style={{ color: R }}>You&apos;re on the list.</p>
      <p className="text-xs text-muted-foreground">Your free scent profile is on its way.</p>
    </div>
  ) : (
    <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <Input type="email" required placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} className="rounded-full flex-1 text-sm px-5 bg-card border-border h-11" />
      <button type="submit" className="btn-gold px-7 py-2.5 text-sm shrink-0">Get Free Profile</button>
    </form>
  )
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────
export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'occasion' | 'inventory' | 'explore'>('occasion')

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── NAV ── */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-border/50 bg-background/85 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo — full image, flush, no cropping */}
          <Link href="/" className="flex items-center gap-0">
            <img
              src={LOGO_URL}
              alt="Your Scents Logo"
              className="h-12 w-auto object-contain"
            />
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <Link href="#stack"      className="hover:text-foreground transition-colors">Stack Builder</Link>
            <Link href="#fragrances" className="hover:text-foreground transition-colors">Fragrances</Link>
            <Link href="#tips"       className="hover:text-foreground transition-colors">Layering Tips</Link>
            <Link href="#pricing"    className="hover:text-foreground transition-colors">Pricing</Link>
            <Link href="/blog"       className="hover:text-foreground transition-colors">Guides</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block">Sign in</Link>
            <Link href="/signup"><button className="btn-gold px-5 py-2 text-xs">Start Free</button></Link>
          </div>
        </div>
      </header>

      <main>

        {/* ── HERO ── */}
        <section className="hero-bg pt-40 pb-32 px-6 relative overflow-hidden">
          {/* Soft petal scanline */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-50" style={{ background: `linear-gradient(90deg, transparent, ${R}, transparent)` }} />

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center relative z-10">
            <div>
              {/* Badge — just fragrance count, no Live pill */}
              <div className="flex items-center gap-2 mb-8">
                <div className="chip flex items-center gap-1.5">
                  <Cpu size={9} style={{ color: R }} />
                  <span>70,000+ fragrances</span>
                </div>
              </div>

              <h1 className="text-5xl md:text-[3.5rem] leading-[1.08] font-normal text-balance mb-6 serif">
                Your fragrance wardrobe,{' '}
                <em className="italic" style={{ color: R }}>intelligently layered.</em>
              </h1>

              <p className="text-[15px] text-muted-foreground max-w-md leading-relaxed mb-10">
                Your Scents decodes every note in your collection and tells you exactly how to stack them — by vibe, occasion, or chemistry. No guesswork.
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-3 mb-14">
                <Link href="/signup">
                  <button className="btn-gold px-8 py-3 text-sm">Build My Wardrobe — Free</button>
                </Link>
                <Link href="#stack" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors h-11 px-2 group">
                  Try the stack builder
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative hidden md:block">
              <div className="aspect-[4/5] w-full max-w-sm ml-auto overflow-hidden rounded-2xl" style={{ boxShadow: '0 32px 80px hsl(8 30% 60% / 0.22)' }}>
                <img src={PHOTOS.hero} alt="Fragrance collection" className="w-full h-full object-cover" style={{ filter: 'brightness(0.92) saturate(0.9)' }} />
              </div>
              {/* Floating analysis card */}
              <div className="glass absolute -bottom-6 -left-8 px-5 py-4 min-w-[168px]">
                <p className="eyebrow mb-2.5">Note Analysis</p>
                <div className="space-y-2">
                  <NoteBar label="Longevity"  value={92} />
                  <NoteBar label="Projection" value={88} />
                </div>
              </div>
              {/* Floating stack pill */}
              <div className="glass absolute top-8 -right-6 px-4 py-3.5 max-w-[200px]">
                <p className="eyebrow mb-2">Tonight&apos;s stack</p>
                <p className="text-sm font-medium serif mb-2">Dark Romance</p>
                <div className="flex flex-wrap gap-1">
                  {['Oud', 'Rose', 'Amber'].map(n => (
                    <span key={n} className="chip" style={{ fontSize: '10px', padding: '2px 7px' }}>{n}</span>
                  ))}
                </div>
                <div className="mt-2.5 flex items-center gap-2">
                  <div className="score-bar-bg flex-1"><div className="score-bar-fill" style={{ width: '91%' }} /></div>
                  <span className="text-[10px]" style={{ color: R }}>91%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TRUST BAR ── */}
        <section className="py-12 px-6 border-y border-border" style={{ background: 'hsl(10 50% 95%)' }}>
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { stat: '70,000+',           label: 'Fragrances indexed' },
              { stat: 'Top · Heart · Base', label: 'Every note decoded' },
              { stat: 'Unlimited',          label: 'Layering combos' },
              { stat: 'Free to start',      label: 'No card required' },
            ].map(({ stat, label }) => (
              <div key={label}>
                <p className="text-lg font-medium serif mb-1" style={{ color: R_DEEP }}>{stat}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── STACK BUILDER ── */}
        <section id="stack" className="py-28 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="eyebrow mb-3">Stack Intelligence</p>
              <h2 className="text-4xl md:text-5xl font-normal serif mb-4">
                Build the perfect stack.{' '}
                <em className="italic" style={{ color: R }}>Every time.</em>
              </h2>
              <p className="text-muted-foreground text-sm max-w-lg mx-auto leading-relaxed">
                Choose an occasion, explore your inventory, or browse curated combinations — all scored by note compatibility.
              </p>
            </div>

            {/* Tab switcher */}
            <div className="flex justify-center mb-12">
              <div className="flex items-center gap-1 p-1 rounded-2xl" style={{ background: 'hsl(10 50% 95%)', border: '1px solid hsl(10 30% 88%)' }}>
                {([
                  { id: 'occasion',  label: 'By Occasion', icon: CalendarDays },
                  { id: 'inventory', label: 'My Wardrobe',  icon: Layers },
                  { id: 'explore',   label: 'Explore All',  icon: Sparkles },
                ] as const).map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-medium transition-all"
                    style={
                      activeTab === id
                        ? { background: R_BG, color: R_DEEP, border: `1px solid ${R_BORDER}` }
                        : { color: 'hsl(8 15% 52%)', border: '1px solid transparent' }
                    }
                  >
                    <Icon size={13} strokeWidth={activeTab === id ? 2 : 1.5} />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === 'occasion'  && <OccasionPlanner />}
            {activeTab === 'inventory' && <InventorySuggester />}
            {activeTab === 'explore'   && (
              <div className="space-y-5">
                <p className="text-sm text-muted-foreground">All curated stacks, ranked by compatibility:</p>
                {[...STACKS].sort((a, b) => b.compatibility - a.compatibility).map(s => <StackCard key={s.id} stack={s} />)}
              </div>
            )}
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6"><div className="rule opacity-50" /></div>

        {/* ── FRAGRANCE PROFILES ── */}
        <section id="fragrances" className="py-28 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="eyebrow mb-3">Fragrance Intelligence</p>
              <h2 className="text-4xl md:text-5xl font-normal serif mb-4">
                Deep scent profiles.{' '}
                <em className="italic" style={{ color: R }}>Every bottle.</em>
              </h2>
              <p className="text-muted-foreground text-sm max-w-lg mx-auto leading-relaxed">
                Every fragrance gets a full note pyramid, attribute analysis, and personalised layering guidance. Click any card to expand.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {PERFUMES.map(p => <PerfumeCard key={p.id} p={p} />)}
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6"><div className="rule opacity-50" /></div>

        {/* ── LAYERING TIPS ── */}
        <section id="tips" className="py-28 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="eyebrow mb-3">Master the Art</p>
              <h2 className="text-4xl md:text-5xl font-normal serif mb-4">
                How to layer like{' '}
                <em className="italic" style={{ color: R }}>a pro.</em>
              </h2>
              <p className="text-muted-foreground text-sm max-w-lg mx-auto leading-relaxed">
                The difference between a great stack and a great fragrance is technique. These six principles are what separate collectors from enthusiasts.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {LAYERING_TIPS.map(({ icon: Icon, title, body }, i) => (
                <div key={title} className="panel p-7 flex flex-col gap-5">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: R_BG }}>
                      <Icon size={16} strokeWidth={1.5} style={{ color: R }} />
                    </div>
                    <span className="text-3xl font-light serif" style={{ color: 'hsl(10 30% 88%)' }}>{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                </div>
              ))}
            </div>

            {/* Pro tip callout */}
            <div className="mt-8 rounded-2xl p-8 grid md:grid-cols-2 gap-10 items-center" style={{ background: R_BG, border: `1px solid ${R_BORDER}` }}>
              <div>
                <p className="eyebrow mb-3">Pro Tip</p>
                <h3 className="text-2xl font-normal serif mb-4">The skin chemistry variable.</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Every person&apos;s skin pH, diet, and moisture level changes how a fragrance opens and evolves. Always test a new stack on your own skin before committing to it — what works on someone else may open differently on you.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Oily skin',     note: 'Amplifies musky and heavy base notes — use a lighter hand with application' },
                  { label: 'Dry skin',       note: 'Eats top notes fast — moisturise first, apply a little more liberally' },
                  { label: 'Warm body temp', note: 'Projects heavier notes further — ideal for subtle orientals that need warmth' },
                ].map(({ label, note }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: R }} />
                    <div>
                      <p className="text-xs font-semibold mb-1">{label}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6"><div className="rule opacity-50" /></div>

        {/* ── NOTE EDUCATION ── */}
        <section className="py-28 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
            <div>
              <p className="eyebrow mb-4">Fragrance Science</p>
              <h2 className="text-4xl md:text-5xl font-normal leading-tight mb-6 serif">
                The architecture of an{' '}
                <em className="italic" style={{ color: R }}>unforgettable scent.</em>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4 text-[15px]">
                The scents that linger in memory are layered — a centuries-old technique now powered by data. The key is knowing which notes complement each other vs. clash.
              </p>
              <p className="text-muted-foreground leading-relaxed text-[15px]">
                Your Scents runs this analysis across your entire collection — every possible combination, instantly surfaced and ranked.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { icon: Wind,     color: 'hsl(190 45% 58%)', term: 'Top Notes',   timing: '0–30 min',    body: 'The opening impression — citrus, herbs, light florals. They fade fast but define your first impression entirely. In layering, they ride on top of the stack.' },
                { icon: Sparkles, color: R,                   term: 'Heart Notes', timing: '30 min–3 hr', body: 'The main character. Florals, spices, soft rose. This is what people smell on you hours into the day — and what makes a fragrance signature.' },
                { icon: Flame,    color: 'hsl(13 55% 62%)',   term: 'Base Notes',  timing: '3 hr+',       body: 'Your lasting signature — musks, woods, vanilla, amber. These anchor the stack, fuse with skin, and are the foundation of every iconic layering combo.' },
              ].map(({ icon: Icon, color, term, timing, body }) => (
                <div key={term} className="panel p-5 flex gap-4">
                  <div className="mt-0.5 shrink-0 w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color.slice(0,-1)} / 0.10)` }}>
                    <Icon size={15} strokeWidth={1.5} style={{ color }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5 mb-2">
                      <h3 className="text-sm font-semibold">{term}</h3>
                      <span className="text-[10px] text-muted-foreground">{timing}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6"><div className="rule opacity-50" /></div>

        {/* ── HOW IT WORKS ── */}
        <section id="how-it-works" className="py-28 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="eyebrow mb-3">How It Works</p>
              <h2 className="text-4xl md:text-5xl font-normal serif">
                Set up in minutes.<em className="italic" style={{ color: R }}> Use it every day.</em>
              </h2>
            </div>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { step: '01', icon: Search,      title: 'Add Your Bottles',      body: 'Search 70,000+ fragrances. Add every perfume, decant, and sample in seconds.' },
                { step: '02', icon: FlaskConical, title: 'Notes Decoded',         body: 'Every top, heart, and base note mapped automatically — no manual entry.' },
                { step: '03', icon: Layers,       title: 'Get Stack Suggestions', body: 'See which perfumes pair perfectly — scored by chemistry, ranked for you.' },
                { step: '04', icon: CalendarDays, title: 'Pick by Occasion',      body: 'Date, office, brunch — we pull the perfect stack from what you already own.' },
              ].map(({ step, icon: Icon, title, body }) => (
                <div key={step} className="panel p-7 flex flex-col gap-5">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: R_BG }}>
                      <Icon size={17} strokeWidth={1.5} style={{ color: R }} />
                    </div>
                    <span className="text-3xl font-light serif" style={{ color: 'hsl(10 30% 88%)' }}>{step}</span>
                  </div>
                  <h3 className="font-semibold text-sm tracking-tight">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6"><div className="rule opacity-50" /></div>

        {/* ── PRICING ── */}
        <section id="pricing" className="py-28 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="eyebrow mb-3">Pricing</p>
              <h2 className="text-4xl md:text-5xl font-normal serif mb-2">Start free. Upgrade when ready.</h2>
              <p className="text-muted-foreground text-sm">No commitment. Cancel anytime.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  name: 'Free', price: '$0', period: 'forever',
                  description: 'For the casual collector',
                  features: ['Up to 3 fragrances', '3 layering suggestions/day', 'Basic occasion matching', '70,000+ fragrance search'],
                  cta: 'Start for Free', href: '/signup', highlighted: false,
                },
                {
                  name: 'Pro', price: '$7.99', period: '/month',
                  description: 'For the serious collector',
                  features: ['Unlimited fragrance wardrobe', 'Unlimited layering combinations', 'Full occasion planner', 'Note compatibility scores', 'Shareable scent cards', 'Deep fragrance profiles'],
                  cta: 'Go Pro', href: '/signup?plan=pro', highlighted: true,
                },
                {
                  name: 'Collector', price: '$14.99', period: '/month',
                  description: 'For the obsessed',
                  features: ['Everything in Pro', 'Public collection profile', 'Wishlist & ownership tracking', 'Bottle level tracking', 'Stack history and favourites', 'Priority support'],
                  cta: 'Go Collector', href: '/signup?plan=collector', highlighted: false,
                },
              ].map(plan => (
                <div key={plan.name} className={`rounded-2xl p-8 flex flex-col ${plan.highlighted ? 'panel-glow' : 'panel'}`}>
                  {plan.highlighted && <span className="chip w-fit mb-5 text-[10px]">Most Popular</span>}
                  <h3 className="text-2xl font-normal mb-1.5 serif">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground mb-7">{plan.description}</p>
                  <div className="mb-8">
                    <span className="text-4xl font-normal serif" style={plan.highlighted ? { color: R_DEEP } : {}}>{plan.price}</span>
                    <span className="text-sm text-muted-foreground ml-2">{plan.period}</span>
                  </div>
                  <ul className="space-y-3.5 mb-9 flex-1">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <Check size={12} className="mt-1 shrink-0" style={{ color: R }} strokeWidth={2.5} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href={plan.href}>
                    {plan.highlighted
                      ? <button className="btn-gold w-full py-3 text-xs">{plan.cta}</button>
                      : <button className="w-full py-3 text-xs font-semibold rounded-full border border-border hover:border-rose-300 transition-colors">{plan.cta}</button>
                    }
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6"><div className="rule opacity-50" /></div>

        {/* ── FAQ ── */}
        <section id="faq" className="py-28 px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-14">
              <p className="eyebrow mb-3">FAQ</p>
              <h2 className="text-4xl md:text-5xl font-normal serif">Common questions.</h2>
            </div>
            <div className="space-y-2">
              {[
                { q: 'Do I have to own these perfumes already?', a: 'Yes — Your Scents is built around the collection you already own. You add your bottles, and we do everything else. You can also wishlist fragrances and get layering suggestions that include them.' },
                { q: 'How does it know what notes are in my perfumes?', a: 'We use a database of over 70,000 fragrances with verified top, heart, and base note data. When you add a bottle, we automatically pull its full note profile — no manual entry required.' },
                { q: 'How are stack compatibility scores calculated?', a: 'Compatibility scores are based on note family harmony, shared molecular families (e.g. both containing Ambroxan), longevity matching, and seasonal/occasion alignment. Scores above 85% are considered excellent pairings.' },
                { q: 'What is a scent card?', a: 'A shareable page showing your fragrance wardrobe, signature notes, and favourite stacks — with its own URL. Post it on TikTok, put it in your bio, or send it when someone asks what you wear.' },
                { q: 'Can I use this if I only own a few perfumes?', a: 'Absolutely. The free plan supports up to 3 fragrances, which is plenty to start getting layering suggestions and occasion recommendations.' },
                { q: 'Is there a mobile app?', a: 'Your Scents is a fully responsive web app that works perfectly on any phone — no download needed. A native app is on the roadmap.' },
                { q: 'Can I cancel my subscription anytime?', a: 'Yes, any time, no questions asked. Your collection data stays yours and will still be accessible on the free plan after you cancel.' },
              ].map(({ q, a }) => <FAQItem key={q} q={q} a={a} />)}
            </div>
          </div>
        </section>

        {/* ── EMAIL CAPTURE ── */}
        <section className="py-20 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <p className="eyebrow mb-3">Free Scent Profile</p>
            <h2 className="text-3xl md:text-4xl font-normal serif mb-4">Find your signature scent.</h2>
            <p className="text-muted-foreground text-sm mb-10 max-w-sm mx-auto leading-relaxed">
              Drop your email and we&apos;ll send you a free personalised fragrance profile — no subscription needed.
            </p>
            <EmailCapture />
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="py-8 px-6 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden">
              <img src={PHOTOS.ctaBg} alt="" className="w-full h-72 object-cover" style={{ filter: 'brightness(0.55) saturate(0.7)' }} />
              <div
                className="absolute inset-0 flex flex-col items-center justify-end pb-14 px-8 text-center"
                style={{ background: 'linear-gradient(to top, hsl(3 40% 25% / 0.92), hsl(3 40% 25% / 0.35) 55%, transparent)' }}
              >
                <h2 className="text-4xl md:text-5xl font-normal text-white serif mb-4 text-balance">
                  Your signature stack is already in your wardrobe.
                </h2>
                <p className="text-white/70 text-sm mb-9 max-w-md leading-relaxed">
                  Start free. Add your collection. Discover combinations you never knew existed.
                </p>
                <Link href="/signup">
                  <button className="btn-gold px-10 py-3 text-sm">Build My Wardrobe</button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY I BUILT THIS ── */}
        <section className="py-20 px-6">
          <div className="max-w-xl mx-auto text-center">
            <div className="flex justify-center mb-5">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: R_BG }}>
                <Heart size={20} strokeWidth={1.5} style={{ color: R }} fill={R} />
              </div>
            </div>
            <p className="eyebrow mb-4">Why I Built This</p>
            <div
              className="rounded-2xl px-10 py-10 text-left space-y-5"
              style={{ background: 'hsl(0 0% 100%)', border: `1px solid ${R_BORDER}`, boxShadow: `0 8px 40px hsl(8 56% 76% / 0.12)` }}
            >
              <p className="text-[15px] leading-relaxed text-foreground">
                I built this in honor of the most amazing girl in the entire world. She is brilliant, caring, loving, thoughtful — I could go on forever, but in short I love this girl.
              </p>
              <p className="text-[15px] leading-relaxed text-foreground italic serif">
                P.S. I love you to the moon and back 🌙
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border py-14 px-6" style={{ background: 'hsl(10 45% 95%)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
            <div>
              <img src={LOGO_URL} alt="Your Scents Logo" className="h-10 w-auto object-contain mb-2" />
              <p className="text-xs text-muted-foreground">The intelligent fragrance wardrobe.</p>
            </div>
            <div className="flex gap-6 text-xs text-muted-foreground">
              <Link href="/blog"    className="hover:text-foreground transition-colors">Guides</Link>
              <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link href="/terms"   className="hover:text-foreground transition-colors">Terms</Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
            </div>
          </div>
          <div className="rule opacity-30" />
          <p className="text-xs text-muted-foreground mt-5">&copy; {new Date().getFullYear()} Your Scents. All rights reserved.</p>
        </div>
      </footer>

    </div>
  )
}
