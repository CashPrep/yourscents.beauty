'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Search, Layers, CalendarDays, FlaskConical,
  ArrowRight, Check, Sparkles, Star,
  ChevronRight, Plus, Minus, Zap, Shield, Globe,
  Droplets, Wind, Flame, Clock, TrendingUp, Info,
  BookOpen, Cpu, Database, Activity,
} from 'lucide-react'

const G = 'hsl(42 85% 68%)'
const G_DIM = 'hsl(42 55% 45%)'
const G_BG = 'hsl(42 85% 68% / 0.10)'
const G_BORDER = 'hsl(42 85% 68% / 0.25)'

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

// ─── PERFUME DATA ────────────────────────────────────────────────────────────
const PERFUMES = [
  {
    id: 'bleu',
    name: 'Bleu de Chanel',
    house: 'Chanel',
    family: 'Woody Aromatic',
    longevity: 88,
    projection: 72,
    complexity: 65,
    warmth: 55,
    freshness: 80,
    notes: { top: ['Grapefruit', 'Lemon', 'Mint', 'Pink Pepper'], heart: ['Ginger', 'Nutmeg', 'Jasmine', 'Iso E Super'], base: ['Incense', 'Vetiver', 'Cedar', 'Sandalwood', 'Patchouli', 'White Musk'] },
    layersWith: ['sauvage', 'terra'],
    occasions: ['office', 'casual', 'interview', 'travel'],
    layerOrder: 'base',
    tip: 'Apply first as a base layer — its cedar and vetiver create a woody canvas that lets fresher scents sit on top.',
    vibe: 'Crisp, clean, elevated',
  },
  {
    id: 'sauvage',
    name: 'Dior Sauvage',
    house: 'Dior',
    family: 'Fresh Spicy',
    longevity: 92,
    projection: 90,
    complexity: 70,
    warmth: 60,
    freshness: 85,
    notes: { top: ['Bergamot', 'Pepper'], heart: ['Lavender', 'Star Anise', 'Pink Pepper', 'Geranium', 'Sichuan Pepper', 'Elemi', 'Nutmeg'], base: ['Ambroxan', 'Cedar', 'Labdanum', 'Vetiver'] },
    layersWith: ['bleu', 'aventus'],
    occasions: ['date', 'night-out', 'office', 'gym'],
    layerOrder: 'top',
    tip: 'Spray last over a muskier base. Ambroxan in the drydown amplifies everything underneath it.',
    vibe: 'Magnetic, powerful, skin-close',
  },
  {
    id: 'aventus',
    name: 'Creed Aventus',
    house: 'Creed',
    family: 'Fruity Chypre',
    longevity: 85,
    projection: 80,
    complexity: 95,
    warmth: 65,
    freshness: 70,
    notes: { top: ['Pineapple', 'Bergamot', 'Black Currant', 'Apple'], heart: ['Rose', 'Dry Birch', 'Moroccan Jasmine', 'Patchouli'], base: ['Musk', 'Oakmoss', 'Ambergris', 'Vanilla'] },
    layersWith: ['sauvage', 'oud'],
    occasions: ['date', 'wedding', 'business', 'night-out'],
    layerOrder: 'mid',
    tip: 'Layer over a clean musky base. Its pineapple-bergamot top opens beautifully; let it breathe 5 min before adding a second scent.',
    vibe: 'Aspirational, bold, sophisticated',
  },
  {
    id: 'oud',
    name: 'Tom Ford Oud Wood',
    house: 'Tom Ford',
    family: 'Oriental Woody',
    longevity: 95,
    projection: 75,
    complexity: 90,
    warmth: 95,
    freshness: 20,
    notes: { top: ['Oud', 'Rosewood', 'Cardamom'], heart: ['Sandalwood', 'Vetiver', 'Tonka Bean'], base: ['Amber', 'Musk', 'Vanilla'] },
    layersWith: ['aventus', 'rose'],
    occasions: ['date', 'evening', 'winter', 'wedding'],
    layerOrder: 'base',
    tip: 'Always apply first — oud needs skin heat to bloom. Its amber and vanilla create a rich anchor for lighter florals or citrus on top.',
    vibe: 'Mysterious, smoky, ultra-luxurious',
  },
  {
    id: 'rose',
    name: 'Maison Margiela Replica — Flower Market',
    house: 'Maison Margiela',
    family: 'Floral Green',
    longevity: 65,
    projection: 55,
    complexity: 72,
    warmth: 45,
    freshness: 90,
    notes: { top: ['Pink Pepper', 'Bergamot', 'Lemon'], heart: ['Peony', 'Peach Blossom', 'Heliotrope', 'Rose'], base: ['Musk', 'Cashmere Wood', 'Sandalwood'] },
    layersWith: ['oud', 'bleu'],
    occasions: ['brunch', 'date', 'spring', 'casual'],
    layerOrder: 'top',
    tip: 'Apply over a warm woody base — the contrast between the soft rose heart and a rich base is what makes this combination stop people in their tracks.',
    vibe: 'Effortless, romantic, light',
  },
  {
    id: 'terra',
    name: 'Hermès Terre d\'Hermès',
    house: 'Hermès',
    family: 'Woody Citrus',
    longevity: 80,
    projection: 68,
    complexity: 78,
    warmth: 70,
    freshness: 62,
    notes: { top: ['Orange', 'Grapefruit', 'Flint'], heart: ['Pepper', 'Geranium', 'Benzyl Acetate'], base: ['Vetiver', 'Cedar', 'Benzoin', 'Tonka Bean'] },
    layersWith: ['bleu', 'rose'],
    occasions: ['office', 'casual', 'travel', 'autumn'],
    layerOrder: 'base',
    tip: 'Use as a subtle foundation layer. Its earthy vetiver and cedar work as a grounding force — pair with anything citrus on top for a natural accord.',
    vibe: 'Earthy, intellectual, natural',
  },
]

// ─── STACK SUGGESTIONS ───────────────────────────────────────────────────────
const STACKS = [
  {
    id: 's1',
    name: 'The Power Move',
    perfumes: ['sauvage', 'aventus'],
    compatibility: 94,
    occasions: ['date', 'night-out', 'business'],
    season: 'Year-round',
    description: 'Sauvage\'s electrifying Ambroxan backbone amplifies Aventus\' smoky birch and pineapple. The result is magnetic, aspirational, and incredibly long-lasting.',
    steps: ['Apply Aventus on pulse points (wrists, neck)', 'Wait 3 minutes for the top notes to settle', 'Lightly mist Sauvage across chest and one wrist', 'Let them merge naturally — do not rub'],
  },
  {
    id: 's2',
    name: 'Dark Romance',
    perfumes: ['oud', 'rose'],
    compatibility: 91,
    occasions: ['date', 'evening', 'wedding'],
    season: 'Autumn / Winter',
    description: 'Oud Wood\'s smoldering amber and vanilla base turns Flower Market\'s soft peony into something deeply intoxicating. A classic oriental-floral contrast that turns heads.',
    steps: ['Apply Oud Wood to wrists and neck — it needs heat to bloom', 'Wait 5 minutes for the resinous base to settle into skin', 'Add a single spray of Flower Market to the collarbone', 'The heat contrast between warm oud and fresh rose is the magic'],
  },
  {
    id: 's3',
    name: 'Clean Sophistication',
    perfumes: ['bleu', 'terra'],
    compatibility: 87,
    occasions: ['office', 'interview', 'casual', 'travel'],
    season: 'Spring / Summer',
    description: 'Both fragrances live in the woody-aromatic-citrus space, making them synergistic rather than competing. Bleu adds freshness, Terre adds earthiness and depth.',
    steps: ['Apply Terre d\'Hermès to wrists — let it anchor', 'Spray Bleu de Chanel on chest and neck', 'The grapefruit and cedar bridges between them naturally', 'Works especially well in warm weather when skin projects both'],
  },
  {
    id: 's4',
    name: 'Summer Night',
    perfumes: ['aventus', 'rose'],
    compatibility: 83,
    occasions: ['date', 'brunch', 'casual'],
    season: 'Spring / Summer',
    description: 'Aventus\' fruity-chypre brightness layered with Flower Market\'s clean florals is an effortlessly charming combination — confident but approachable.',
    steps: ['Apply Aventus first — the birch and pineapple need to open', 'Wait 2 minutes then apply Flower Market to the neck', 'Keep both applications light — this stack is about subtlety', 'Ideal for afternoon into evening events'],
  },
]

// ─── OCCASION DATA ───────────────────────────────────────────────────────────
const OCCASIONS = [
  { id: 'date',      label: 'Date Night',    icon: '🌹', stacks: ['s2', 's1'] },
  { id: 'office',    label: 'Office',        icon: '💼', stacks: ['s3', 's1'] },
  { id: 'night-out', label: 'Night Out',     icon: '🌙', stacks: ['s1', 's2'] },
  { id: 'casual',    label: 'Casual Day',    icon: '☀️', stacks: ['s3', 's4'] },
  { id: 'wedding',   label: 'Wedding',       icon: '✨', stacks: ['s2', 's1'] },
  { id: 'travel',    label: 'Travel',        icon: '✈️', stacks: ['s3', 's4'] },
  { id: 'brunch',    label: 'Brunch',        icon: '🌿', stacks: ['s4', 's3'] },
  { id: 'gym',       label: 'Gym / Sport',   icon: '⚡', stacks: ['s3'] },
]

// ─── LAYERING TIPS ───────────────────────────────────────────────────────────
const LAYERING_TIPS = [
  {
    icon: Droplets,
    title: 'Moisturise First',
    body: 'Apply an unscented lotion before layering. Dry skin eats fragrance — hydrated skin holds scent molecules 40% longer and makes layers blend more cohesively.',
  },
  {
    icon: Flame,
    title: 'Heaviest First',
    body: 'Always apply your base-heavy scent first (ouds, ambers, musks). These need body heat to bloom and create the foundation that lighter top notes sit on.',
  },
  {
    icon: Clock,
    title: 'Wait Between Layers',
    body: 'Give each scent 2–5 minutes between applications. This prevents the top notes from fighting each other and allows each fragrance to settle into your skin.',
  },
  {
    icon: Activity,
    title: 'Pulse Points Only',
    body: 'Apply to wrists, neck, inner elbows, and behind ears. These warm points project scent outward. Avoid rubbing — it crushes the top notes and breaks the accord.',
  },
  {
    icon: Wind,
    title: 'Layer by Longevity',
    body: 'Place shorter-lived scents (florals, citrus) on top of long-lasting bases (woody, oriental). As the top layer fades, the base continues to evolve and deepen.',
  },
  {
    icon: TrendingUp,
    title: 'Start Light, Build Up',
    body: 'You can always add more — you can never remove. Use half your usual number of sprays per fragrance when layering. One-spray-each is often the perfect starting point.',
  },
]

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

function NoteBar({ label, value, color = G }: { label: string; value: number; color?: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[10px] text-muted-foreground w-20 shrink-0 font-mono uppercase tracking-wider">{label}</span>
      <div className="flex-1 score-bar-bg">
        <div className="score-bar-fill" style={{ width: `${value}%`, background: `linear-gradient(90deg, ${color}88, ${color})` }} />
      </div>
      <span className="text-[10px] font-mono" style={{ color }}>{value}</span>
    </div>
  )
}

function PerfumeCard({ p }: { p: typeof PERFUMES[0] }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="panel lift overflow-hidden cursor-pointer" onClick={() => setExpanded(!expanded)}>
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <p className="eyebrow mb-1">{p.house}</p>
            <h3 className="text-base font-semibold leading-tight">{p.name}</h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">{p.family}</p>
          </div>
          <div className="shrink-0 flex flex-col items-end gap-1">
            <span className="chip text-[9px]" style={{ padding: '2px 8px' }}>{p.vibe.split(',')[0]}</span>
            <span className="text-[10px] text-muted-foreground font-mono">{p.layerOrder.toUpperCase()} LAYER</span>
          </div>
        </div>

        {/* Attribute Bars */}
        <div className="space-y-2 mb-4">
          <NoteBar label="Longevity" value={p.longevity} />
          <NoteBar label="Projection" value={p.projection} />
          <NoteBar label="Complexity" value={p.complexity} color="hsl(260 60% 70%)" />
          <NoteBar label="Warmth" value={p.warmth} color="hsl(20 80% 65%)" />
          <NoteBar label="Freshness" value={p.freshness} color="hsl(190 70% 60%)" />
        </div>

        {/* Notes Preview */}
        <div className="flex flex-wrap gap-1">
          {p.notes.top.slice(0, 2).map(n => (
            <span key={n} className="chip-muted" style={{ fontSize: '9px', padding: '2px 6px', borderColor: 'hsl(190 70% 60% / 0.3)', color: 'hsl(190 70% 65%)' }}>{n}</span>
          ))}
          {p.notes.heart.slice(0, 2).map(n => (
            <span key={n} className="chip-muted" style={{ fontSize: '9px', padding: '2px 6px' }}>{n}</span>
          ))}
          {p.notes.base.slice(0, 2).map(n => (
            <span key={n} className="chip-muted" style={{ fontSize: '9px', padding: '2px 6px', borderColor: 'hsl(30 80% 55% / 0.3)', color: 'hsl(30 80% 60%)' }}>{n}</span>
          ))}
          <span className="chip-muted" style={{ fontSize: '9px', padding: '2px 6px' }}>+{p.notes.top.length + p.notes.heart.length + p.notes.base.length - 6} more</span>
        </div>

        {/* Expand hint */}
        <p className="text-[10px] text-muted-foreground mt-3 flex items-center gap-1" style={{ color: G_DIM }}>
          {expanded ? <Minus size={10} /> : <Plus size={10} />}
          {expanded ? 'Hide deep analysis' : 'View deep analysis'}
        </p>
      </div>

      {/* Expanded Detail */}
      {expanded && (
        <div className="border-t border-border px-5 pb-5 pt-4 space-y-5" onClick={e => e.stopPropagation()}>
          {/* Full note pyramid */}
          <div>
            <p className="eyebrow mb-3">Note Pyramid</p>
            <div className="space-y-3">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <Wind size={10} style={{ color: 'hsl(190 70% 60%)' }} />
                  <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'hsl(190 70% 60%)' }}>Top Notes — 0–30 min</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {p.notes.top.map(n => <span key={n} className="chip" style={{ fontSize: '10px', padding: '2px 8px', background: 'hsl(190 70% 60% / 0.08)', color: 'hsl(190 70% 65%)', borderColor: 'hsl(190 70% 60% / 0.25)' }}>{n}</span>)}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <Sparkles size={10} style={{ color: G }} />
                  <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: G }}>Heart Notes — 30 min–3 hr</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {p.notes.heart.map(n => <span key={n} className="chip" style={{ fontSize: '10px', padding: '2px 8px' }}>{n}</span>)}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <Flame size={10} style={{ color: 'hsl(30 80% 60%)' }} />
                  <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'hsl(30 80% 60%)' }}>Base Notes — 3 hr+</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {p.notes.base.map(n => <span key={n} className="chip" style={{ fontSize: '10px', padding: '2px 8px', background: 'hsl(30 80% 55% / 0.08)', color: 'hsl(30 80% 65%)', borderColor: 'hsl(30 80% 55% / 0.25)' }}>{n}</span>)}
                </div>
              </div>
            </div>
          </div>

          {/* Layering tip */}
          <div className="rounded-xl p-4" style={{ background: G_BG, border: `1px solid ${G_BORDER}` }}>
            <p className="eyebrow mb-1.5">Layering Guide</p>
            <p className="text-[11px] text-muted-foreground leading-relaxed">{p.tip}</p>
          </div>

          {/* Pairs well with */}
          <div>
            <p className="eyebrow mb-2">Stacks Best With</p>
            <div className="flex flex-wrap gap-1.5">
              {p.layersWith.map(id => {
                const match = PERFUMES.find(x => x.id === id)
                return match ? (
                  <span key={id} className="chip" style={{ fontSize: '10px', padding: '3px 10px' }}>{match.name}</span>
                ) : null
              })}
            </div>
          </div>

          {/* Occasions */}
          <div>
            <p className="eyebrow mb-2">Best For</p>
            <div className="flex flex-wrap gap-1.5">
              {p.occasions.map(o => {
                const occ = OCCASIONS.find(x => x.id === o)
                return occ ? (
                  <span key={o} className="chip-muted" style={{ fontSize: '10px', padding: '3px 10px' }}>{occ.icon} {occ.label}</span>
                ) : null
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

  const scoreColor = stack.compatibility >= 90 ? 'hsl(142 70% 55%)' : stack.compatibility >= 80 ? G : 'hsl(30 80% 60%)'

  return (
    <div className="panel-glow lift overflow-hidden">
      <div className="p-6">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <p className="eyebrow mb-1">Recommended Stack</p>
            <h3 className="text-xl font-medium serif">{stack.name}</h3>
          </div>
          <div className="text-right shrink-0">
            <p className="text-2xl font-light serif" style={{ color: scoreColor }}>{stack.compatibility}%</p>
            <p className="text-[10px] text-muted-foreground">compatibility</p>
          </div>
        </div>

        {/* Compatibility bar */}
        <div className="score-bar-bg mb-4">
          <div className="score-bar-fill" style={{ width: `${stack.compatibility}%`, background: `linear-gradient(90deg, ${scoreColor}88, ${scoreColor})` }} />
        </div>

        {/* Perfume pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {perfumes.map((p, i) => (
            <div key={p.id} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-muted-foreground text-xs">+</span>}
              <span className="chip">{p.name}</span>
            </div>
          ))}
        </div>

        {/* Season + description */}
        <p className="text-[11px] font-mono text-muted-foreground mb-2">{stack.season}</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{stack.description}</p>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 flex items-center gap-1.5 text-[11px] font-semibold transition-colors"
          style={{ color: G }}
        >
          {expanded ? <Minus size={11} /> : <Plus size={11} />}
          {expanded ? 'Hide application steps' : 'Show application steps'}
        </button>
      </div>

      {/* Steps */}
      {expanded && (
        <div className="border-t border-border px-6 pb-6 pt-4">
          <p className="eyebrow mb-3">How to Apply</p>
          <ol className="space-y-2.5">
            {stack.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="text-[10px] font-mono mt-0.5 w-4 shrink-0" style={{ color: G }}>{String(i + 1).padStart(2, '0')}</span>
                {step}
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
      <div className="grid grid-cols-4 gap-2 mb-8">
        {OCCASIONS.map(o => (
          <button
            key={o.id}
            onClick={() => setSelected(selected === o.id ? null : o.id)}
            className={`occasion-btn${selected === o.id ? ' active' : ''}`}
          >
            <span className="text-xl">{o.icon}</span>
            <span className="text-[11px] font-medium leading-tight">{o.label}</span>
          </button>
        ))}
      </div>

      {selected && matchedStacks.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: G }} />
            <p className="text-sm text-muted-foreground">
              Best stacks for <strong className="text-foreground">{occasion?.label}</strong> from your wardrobe
            </p>
          </div>
          {matchedStacks.map(s => <StackCard key={s.id} stack={s} />)}
        </div>
      )}

      {selected && matchedStacks.length === 0 && (
        <div className="panel p-8 text-center">
          <p className="text-sm text-muted-foreground">Add more fragrances to your wardrobe to unlock stacks for this occasion.</p>
        </div>
      )}
    </div>
  )
}

function InventorySuggester() {
  const inventory = ['bleu', 'sauvage', 'aventus']
  const inventoryPerfumes = PERFUMES.filter(p => inventory.includes(p.id))
  const suggestions = STACKS.filter(s =>
    s.perfumes.every(pid => inventory.includes(pid))
  )

  return (
    <div>
      <div className="panel p-4 mb-6">
        <p className="eyebrow mb-2">Your Demo Wardrobe</p>
        <div className="flex flex-wrap gap-2">
          {inventoryPerfumes.map(p => (
            <div key={p.id} className="flex items-center gap-2 rounded-full px-3 py-1.5" style={{ background: G_BG, border: `1px solid ${G_BORDER}` }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: G }} />
              <span className="text-[11px] font-medium">{p.name}</span>
            </div>
          ))}
        </div>
      </div>

      {suggestions.length > 0 ? (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground mb-2">Stacks you can build <strong className="text-foreground">right now</strong> from bottles you own:</p>
          {suggestions.map(s => <StackCard key={s.id} stack={s} />)}
        </div>
      ) : (
        <div className="panel p-8 text-center">
          <p className="text-sm text-muted-foreground">Add more fragrances to unlock inventory-based suggestions.</p>
        </div>
      )}
    </div>
  )
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
          ? <Minus size={14} className="shrink-0" style={{ color: G }} />
          : <Plus size={14} className="shrink-0 text-muted-foreground" />}
      </div>
      {open && <p className="text-sm text-muted-foreground leading-relaxed mt-3 pt-3 border-t border-border">{a}</p>}
    </button>
  )
}

function EmailCapture() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const submit = (e: React.FormEvent) => { e.preventDefault(); if (email) setDone(true) }
  return done ? (
    <div className="text-center py-4">
      <p className="text-sm font-semibold mb-1" style={{ color: G }}>You&apos;re on the list.</p>
      <p className="text-xs text-muted-foreground">Your free scent profile is on its way.</p>
    </div>
  ) : (
    <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <Input type="email" required placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)}
        className="rounded-full flex-1 text-sm px-5 bg-card border-border" />
      <button type="submit" className="btn-gold px-7 py-2.5 text-sm shrink-0">Get Free Profile</button>
    </form>
  )
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────
export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'occasion' | 'inventory' | 'explore'>('occasion')

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: G }}>
              <span className="text-[hsl(220_18%_6%)] text-xs font-bold">S</span>
            </div>
            <span className="text-base font-semibold tracking-tight">ScentStack</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <Link href="#stack" className="hover:text-foreground transition-colors">Stack Builder</Link>
            <Link href="#fragrances" className="hover:text-foreground transition-colors">Fragrances</Link>
            <Link href="#tips" className="hover:text-foreground transition-colors">Layering Tips</Link>
            <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block">Sign in</Link>
            <Link href="/signup"><button className="btn-gold px-5 py-2 text-xs">Start Free</button></Link>
          </div>
        </div>
      </header>

      <main>

        {/* ── HERO ── */}
        <section className="hero-bg pt-36 pb-28 px-6 relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0" style={{
            backgroundImage: 'linear-gradient(hsl(220 14% 15% / 0.35) 1px, transparent 1px), linear-gradient(90deg, hsl(220 14% 15% / 0.35) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 0%, transparent 100%)'
          }} />
          {/* Scanline pulse */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${G}, transparent)`, animation: 'none', opacity: 0.4 }} />

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="chip flex items-center gap-1.5">
                  <Cpu size={9} style={{ color: G }} />
                  <span>70,000+ fragrances indexed</span>
                </div>
                <div className="chip" style={{ background: 'hsl(142 70% 55% / 0.1)', color: 'hsl(142 70% 55%)', borderColor: 'hsl(142 70% 55% / 0.25)' }}>
                  <span style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '50%', background: 'hsl(142 70% 55%)', marginRight: 5 }} />
                  Live
                </div>
              </div>
              <h1 className="text-5xl md:text-[3.5rem] leading-[1.06] font-normal text-balance mb-6 serif">
                Your fragrance wardrobe,{' '}
                <em className="italic" style={{ color: G }}>intelligently layered.</em>
              </h1>
              <p className="text-base text-muted-foreground max-w-md leading-relaxed mb-8">
                ScentStack decodes every note in your collection and tells you exactly how to stack them — by vibe, occasion, or chemistry. No guesswork.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-3 mb-12">
                <Link href="/signup"><button className="btn-gold px-8 py-3 text-sm">Build My Wardrobe — Free</button></Link>
                <Link href="#stack" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group h-11 px-2">
                  Try the stack builder <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
              {/* Live stat row */}
              <div className="flex items-center gap-5">
                <div className="flex -space-x-2">
                  {[PHOTOS.avatar1, PHOTOS.avatar2, PHOTOS.avatar3].map((src, i) => (
                    <img key={i} src={src} alt="" className="w-8 h-8 rounded-full border-2 border-background object-cover" />
                  ))}
                </div>
                <div className="h-6 w-px" style={{ background: 'hsl(220 14% 20%)' }} />
                <div>
                  <div className="flex gap-0.5" style={{ color: G }}>
                    {[1,2,3,4,5].map(s => <Star key={s} size={11} fill="currentColor" strokeWidth={0} />)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">Trusted by serious collectors</p>
                </div>
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative">
              <div className="aspect-[4/5] w-full max-w-md ml-auto overflow-hidden rounded-2xl" style={{ boxShadow: '0 24px 80px hsl(0 0% 0% / 0.55)' }}>
                <img src={PHOTOS.hero} alt="Fragrance collection" className="w-full h-full object-cover brightness-75" />
              </div>
              {/* Floating scent analysis card */}
              <div className="glass absolute -bottom-4 -left-4 md:-left-10 px-5 py-4 min-w-[160px]">
                <p className="eyebrow mb-2">Note Analysis</p>
                <div className="space-y-1.5">
                  <NoteBar label="Longevity" value={92} />
                  <NoteBar label="Projection" value={88} />
                </div>
              </div>
              {/* Floating occasion pill */}
              <div className="glass absolute top-6 -right-0 md:-right-6 px-4 py-3 max-w-[190px]">
                <p className="eyebrow mb-1.5">Tonight&apos;s stack</p>
                <p className="text-sm font-medium serif">Dark Romance</p>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {['Oud', 'Rose', 'Amber'].map(n => (
                    <span key={n} className="chip" style={{ fontSize: '10px', padding: '2px 8px' }}>{n}</span>
                  ))}
                </div>
                <div className="mt-2 flex items-center gap-1.5">
                  <div className="score-bar-bg flex-1"><div className="score-bar-fill" style={{ width: '91%' }} /></div>
                  <span className="text-[10px] font-mono" style={{ color: G }}>91%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TRUST BAR ── */}
        <section className="py-10 px-6 border-y border-border" style={{ background: 'hsl(220 16% 8%)' }}>
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { stat: '70,000+',            label: 'Fragrances indexed' },
              { stat: 'Top · Heart · Base',  label: 'Every note decoded' },
              { stat: 'Unlimited',           label: 'Layering combos' },
              { stat: 'Free to start',       label: 'No card required' },
            ].map(({ stat, label }) => (
              <div key={label}>
                <p className="text-lg md:text-xl font-medium serif mb-1" style={{ color: G }}>{stat}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── STACK BUILDER ── */}
        <section id="stack" className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="eyebrow mb-3">Stack Intelligence</p>
              <h2 className="text-4xl md:text-5xl font-normal serif">
                Build the perfect stack.{' '}
                <em className="italic" style={{ color: G }}>Every time.</em>
              </h2>
              <p className="mt-4 text-muted-foreground text-sm max-w-lg mx-auto">
                Choose an occasion, explore your inventory, or browse curated combinations — all scored by note compatibility.
              </p>
            </div>

            {/* Tab switcher */}
            <div className="flex items-center gap-1 p-1 rounded-xl mb-10 w-fit mx-auto" style={{ background: 'hsl(220 16% 8%)', border: '1px solid hsl(220 14% 15%)' }}>
              {([
                { id: 'occasion', label: 'By Occasion', icon: CalendarDays },
                { id: 'inventory', label: 'From My Wardrobe', icon: Layers },
                { id: 'explore', label: 'Explore All', icon: Sparkles },
              ] as const).map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === id
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  style={activeTab === id ? { background: G_BG, color: G, border: `1px solid ${G_BORDER}` } : {}}
                >
                  <Icon size={13} />
                  {label}
                </button>
              ))}
            </div>

            {activeTab === 'occasion' && <OccasionPlanner />}
            {activeTab === 'inventory' && <InventorySuggester />}
            {activeTab === 'explore' && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground mb-2">All curated stacks, ranked by compatibility:</p>
                {[...STACKS].sort((a, b) => b.compatibility - a.compatibility).map(s => <StackCard key={s.id} stack={s} />)}
              </div>
            )}
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6"><div className="rule opacity-60" /></div>

        {/* ── FRAGRANCE PROFILES ── */}
        <section id="fragrances" className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="eyebrow mb-3">Fragrance Intelligence</p>
              <h2 className="text-4xl md:text-5xl font-normal serif">
                Deep scent profiles.{' '}
                <em className="italic" style={{ color: G }}>Every bottle.</em>
              </h2>
              <p className="mt-4 text-muted-foreground text-sm max-w-lg mx-auto">
                Every fragrance gets a full note pyramid, attribute analysis, and personalised layering guidance. Click any card to expand.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {PERFUMES.map(p => <PerfumeCard key={p.id} p={p} />)}
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6"><div className="rule opacity-60" /></div>

        {/* ── LAYERING TIPS ── */}
        <section id="tips" className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="eyebrow mb-3">Master the Art</p>
              <h2 className="text-4xl md:text-5xl font-normal serif">
                How to layer like{' '}
                <em className="italic" style={{ color: G }}>a pro.</em>
              </h2>
              <p className="mt-4 text-muted-foreground text-sm max-w-lg mx-auto">
                The difference between a great stack and a great fragrance is technique. These six principles are what separate collectors from enthusiasts.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {LAYERING_TIPS.map(({ icon: Icon, title, body }, i) => (
                <div key={title} className="panel p-6 lift flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: G_BG }}>
                      <Icon size={16} strokeWidth={1.5} style={{ color: G }} />
                    </div>
                    <span className="text-3xl font-light serif text-muted-foreground/15">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="text-sm font-semibold">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">{body}</p>
                </div>
              ))}
            </div>

            {/* Advanced tip callout */}
            <div className="mt-8 rounded-2xl p-8 grid md:grid-cols-2 gap-8 items-center" style={{ background: G_BG, border: `1px solid ${G_BORDER}` }}>
              <div>
                <p className="eyebrow mb-2">Pro Tip</p>
                <h3 className="text-2xl font-normal serif mb-3">The skin chemistry variable.</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Every person&apos;s skin pH, diet, and moisture level changes how a fragrance opens and evolves. Always test a new stack on your own skin before committing to it — what works perfectly on someone else may open differently on you.
                </p>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Oily skin', note: 'Amplifies musky and heavy base notes — use lighter application' },
                  { label: 'Dry skin', note: 'Eats top notes fast — moisturise first, apply more liberally' },
                  { label: 'Warm body temp', note: 'Projects heavier notes further — ideal for subtle orientals' },
                ].map(({ label, note }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: G }} />
                    <div>
                      <p className="text-xs font-semibold mb-0.5">{label}</p>
                      <p className="text-xs text-muted-foreground">{note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6"><div className="rule opacity-60" /></div>

        {/* ── NOTE EDUCATION ── */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="eyebrow mb-4">Fragrance Science</p>
              <h2 className="text-4xl md:text-5xl font-normal leading-tight mb-5 serif">
                The architecture of an{' '}<em className="italic" style={{ color: G }}>unforgettable scent.</em>
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
                { icon: Wind,     color: 'hsl(190 70% 60%)', term: 'Top Notes',  timing: '0–30 min',    body: 'The opening impression — citrus, herbs, light florals. They fade fast but define your first impression entirely. In layering, they ride on top of the stack.' },
                { icon: Sparkles, color: G,                   term: 'Heart Notes',timing: '30 min–3 hr', body: 'The main character. Florals, spices, soft rose. This is what people smell on you hours into the day — and what makes a fragrance signature.' },
                { icon: Flame,    color: 'hsl(30 80% 60%)',   term: 'Base Notes', timing: '3 hr+',       body: 'Your lasting signature — musks, woods, vanilla, amber. These anchor the stack, fuse with skin, and are the foundation of every iconic layering combo.' },
              ].map(({ icon: Icon, color, term, timing, body }) => (
                <div key={term} className="panel p-5 flex gap-4">
                  <div className="mt-0.5 shrink-0 w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color.replace(')', '')} / 0.12)`.replace('hsl(', 'hsl(') }}>
                    <Icon size={15} strokeWidth={1.5} style={{ color }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <h3 className="text-sm font-semibold">{term}</h3>
                      <span className="text-[10px] font-mono text-muted-foreground">{timing}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6"><div className="rule opacity-60" /></div>

        {/* ── HOW IT WORKS ── */}
        <section id="how-it-works" className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="eyebrow mb-3">How It Works</p>
              <h2 className="text-4xl md:text-5xl font-normal serif">
                Set up in minutes.<em className="italic" style={{ color: G }}> Use it every day.</em>
              </h2>
            </div>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { step: '01', icon: Search,      title: 'Add Your Bottles',      body: 'Search 70,000+ fragrances. Add every perfume, decant, and sample in seconds.' },
                { step: '02', icon: FlaskConical, title: 'Notes Decoded',         body: 'Every top, heart, and base note mapped automatically — no manual entry.' },
                { step: '03', icon: Layers,       title: 'Get Stack Suggestions', body: 'See which perfumes pair perfectly — scored by chemistry, ranked for you.' },
                { step: '04', icon: CalendarDays, title: 'Pick by Occasion',      body: 'Date, office, brunch — we pull the perfect stack from what you already own.' },
              ].map(({ step, icon: Icon, title, body }) => (
                <div key={step} className="panel p-6 flex flex-col gap-4 lift">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: G_BG }}>
                      <Icon size={17} strokeWidth={1.5} style={{ color: G }} />
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

        {/* ── TESTIMONIALS ── */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="eyebrow mb-3">Reviews</p>
              <h2 className="text-4xl md:text-5xl font-normal serif">What collectors are saying.</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { quote: 'I own 23 perfumes and was only reaching for four. This showed me the perfect scent for every occasion already sitting on my shelf.', name: 'Sophia R.', detail: '23-bottle collector', avatar: PHOTOS.avatar1 },
                { quote: "The layering suggestions are genuinely brilliant. Found a combo I've had for years that smells completely new — everyone asks what I'm wearing now.", name: 'Maya K.', detail: 'Niche fragrance enthusiast', avatar: PHOTOS.avatar2 },
                { quote: "The occasion planner is the most useful feature. I pick where I'm going and it builds a stack from what I already own. Saves me 10 min every morning.", name: 'Jade T.', detail: 'Beauty content creator', avatar: PHOTOS.avatar3 },
              ].map(({ quote, name, detail, avatar }) => (
                <div key={name} className="panel p-6 flex flex-col gap-4">
                  <div className="flex gap-0.5" style={{ color: G }}>
                    {[1,2,3,4,5].map(s => <Star key={s} size={11} fill="currentColor" strokeWidth={0} />)}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed flex-1">&ldquo;{quote}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-3 border-t border-border">
                    <img src={avatar} alt={name} className="w-9 h-9 rounded-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
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

        {/* ── PRICING ── */}
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
                  <h3 className="text-2xl font-normal mb-1 serif">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground mb-6">{plan.description}</p>
                  <div className="mb-8">
                    <span className="text-4xl font-normal serif" style={plan.highlighted ? { color: G } : {}}>{plan.price}</span>
                    <span className="text-sm text-muted-foreground ml-1.5">{plan.period}</span>
                  </div>
                  <ul className="space-y-3.5 mb-9 flex-1">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <Check size={12} className="mt-1 shrink-0" style={{ color: G }} strokeWidth={2.5} />{f}
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

        {/* ── FAQ ── */}
        <section id="faq" className="py-24 px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-14">
              <p className="eyebrow mb-3">FAQ</p>
              <h2 className="text-4xl md:text-5xl font-normal serif">Common questions.</h2>
            </div>
            <div className="space-y-2">
              {[
                { q: 'Do I have to own these perfumes already?', a: 'Yes — ScentStack is built around the collection you already own. You add your bottles, and we do everything else. You can also wishlist fragrances and get layering suggestions that include them.' },
                { q: 'How does it know what notes are in my perfumes?', a: 'We use a database of over 70,000 fragrances with verified top, heart, and base note data. When you add a bottle, we automatically pull its full note profile — no manual entry required.' },
                { q: 'How are stack compatibility scores calculated?', a: 'Compatibility scores are based on note family harmony, shared molecular families (e.g. both containing Ambroxan), longevity matching, and seasonal/occasion alignment. Scores above 85% are considered excellent pairings.' },
                { q: 'What is a scent card?', a: 'A shareable page showing your fragrance wardrobe, signature notes, and favourite stacks — with its own URL. Post it on TikTok, put it in your bio, or send it when someone asks what you wear.' },
                { q: 'Can I use this if I only own a few perfumes?', a: 'Absolutely. The free plan supports up to 3 fragrances, which is plenty to start getting layering suggestions and occasion recommendations.' },
                { q: 'Is there a mobile app?', a: 'ScentStack is a fully responsive web app that works perfectly on any phone — no download needed. A native app is on the roadmap.' },
                { q: 'Can I cancel my subscription anytime?', a: 'Yes, any time, no questions asked. Your collection data stays yours and will still be accessible on the free plan after you cancel.' },
              ].map(({ q, a }) => <FAQItem key={q} q={q} a={a} />)}
            </div>
          </div>
        </section>

        {/* ── EMAIL CAPTURE ── */}
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

        {/* ── FINAL CTA ── */}
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden">
              <img src={PHOTOS.ctaBg} alt="" className="w-full h-72 object-cover brightness-40" />
              <div
                className="absolute inset-0 flex flex-col items-center justify-end pb-12 px-8 text-center"
                style={{ background: 'linear-gradient(to top, hsl(220 18% 6% / 0.95), hsl(220 18% 6% / 0.5) 60%, transparent)' }}
              >
                <h2 className="text-4xl md:text-5xl font-normal text-white serif mb-4 text-balance">
                  Your signature stack is already in your wardrobe.
                </h2>
                <p className="text-white/60 text-sm mb-8 max-w-md">
                  Start free. Add your collection. Discover combinations you never knew existed.
                </p>
                <Link href="/signup"><button className="btn-gold px-10 py-3 text-sm">Build My Wardrobe</button></Link>
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
                <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: G }}>
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
