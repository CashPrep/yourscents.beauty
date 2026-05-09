'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Sparkles, Plus, Layers, Calendar, LogOut, Star, TrendingUp, Dna, Share2, Zap, Brain, CloudSun, ExternalLink, Lock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import AddFragranceModal from './AddFragranceModal'
import WardrobeCard from './WardrobeCard'
import OccasionPlanner from './OccasionPlanner'
import ScentDNA from './ScentDNA'
import ScentOfTheDay from './ScentOfTheDay'
import DiscoveryFeed from './DiscoveryFeed'
import StackSuggestions from './StackSuggestions'
import MoodMatcher from './MoodMatcher'
import SeasonalRotation from './SeasonalRotation'

// ── Brand tokens ────────────────────────────────────────────────────────────
const ROSE        = 'hsl(8 48% 72%)'
const ROSE_BG     = 'hsl(8 56% 76% / 0.12)'
const ROSE_BORDER = 'hsl(8 56% 76% / 0.32)'
const ROSE_DEEP   = 'hsl(3 40% 58%)'
const CREAM       = 'hsl(18 50% 97%)'
const FOREGROUND  = 'hsl(5 25% 22%)'
const MUTED       = 'hsl(8 15% 52%)'

const FREE_LIMIT = 3

interface Props {
  user: any
  wardrobe: any[]
  profile: any
}

type Tab = 'wardrobe' | 'stacks' | 'occasions' | 'discover' | 'dna' | 'mood' | 'seasonal'

const SORT_OPTIONS = [
  { value: 'recent', label: 'Recently Added' },
  { value: 'name',   label: 'Name A–Z' },
  { value: 'brand',  label: 'Brand A–Z' },
  { value: 'rating', label: 'Top Rated' },
]

const ACCORD_FILTERS = ['all','floral','fresh','woody','sweet','musky','fruity','spicy','aromatic']

// ── Free plan upgrade gate banner ───────────────────────────────────────────
function FreePlanGate() {
  return (
    <div
      className="rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      style={{
        background: `linear-gradient(135deg, hsl(8 56% 76% / 0.10), hsl(8 56% 76% / 0.18))`,
        border: `1.5px solid ${ROSE_BORDER}`,
        boxShadow: `0 4px 24px hsl(8 56% 76% / 0.12)`,
      }}
    >
      <div className="flex items-start gap-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: ROSE_BG, border: `1px solid ${ROSE_BORDER}` }}
        >
          <Lock className="h-4 w-4" style={{ color: ROSE_DEEP }} />
        </div>
        <div>
          <p className="text-sm font-semibold mb-1" style={{ color: FOREGROUND }}>
            You&apos;ve reached the 3-fragrance limit
          </p>
          <p className="text-xs leading-relaxed" style={{ color: MUTED }}>
            Free plan includes up to {FREE_LIMIT} fragrances. Upgrade to Pro for an unlimited wardrobe,
            full stack scoring, and shareable scent cards.
          </p>
        </div>
      </div>
      <Link href="/api/checkout?plan=pro" className="shrink-0">
        <button className="btn-gold flex items-center gap-2 px-5 py-2.5 text-xs whitespace-nowrap">
          Upgrade to Pro
          <ArrowRight className="h-3 w-3" />
        </button>
      </Link>
    </div>
  )
}

// ── Scent card share panel ───────────────────────────────────────────────────
// Display text reflects the real deployed domain via window.location.host.
function ScentCardPanel({ userId, copied, onCopy }: { userId: string; copied: boolean; onCopy: () => void }) {
  const host = typeof window !== 'undefined' ? window.location.host : 'yourscents.beauty'
  const shortId = userId.slice(0, 8)
  return (
    <div
      className="rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6"
      style={{
        background: 'hsl(0 0% 100%)',
        border: `1px solid ${ROSE_BORDER}`,
        boxShadow: `0 4px 20px hsl(8 56% 76% / 0.10)`,
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: ROSE_BG }}
        >
          <Share2 className="h-4 w-4" style={{ color: ROSE }} />
        </div>
        <div>
          <p className="text-sm font-semibold mb-0.5" style={{ color: FOREGROUND }}>Your Scent Card</p>
          <p className="text-[11px] font-mono truncate max-w-[220px]" style={{ color: MUTED }}>
            {host}/u/{shortId}…
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <a
          href={`/u/${userId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-full transition-colors"
          style={{ background: ROSE_BG, color: ROSE_DEEP, border: `1px solid ${ROSE_BORDER}` }}
        >
          <ExternalLink className="h-3 w-3" />
          Preview
        </a>
        <button
          onClick={onCopy}
          className="btn-gold flex items-center gap-1.5 text-xs px-4 py-2"
        >
          <Share2 className="h-3 w-3" />
          {copied ? 'Copied! 🌸' : 'Copy Link'}
        </button>
      </div>
    </div>
  )
}

export default function DashboardClient({ user, wardrobe: initialWardrobe, profile }: Props) {
  const router = useRouter()
  const supabase = createClient()
  const [wardrobe, setWardrobe]           = useState(initialWardrobe)
  const [showAddModal, setShowAddModal]   = useState(false)
  const [activeTab, setActiveTab]         = useState<Tab>('wardrobe')
  const [sort, setSort]                   = useState('recent')
  const [accordFilter, setAccordFilter]   = useState('all')
  const [copied, setCopied]               = useState(false)
  const [addBlocked, setAddBlocked]       = useState(false)
  const plan = profile?.plan || 'free'
  const isFree = plan === 'free'
  const atLimit = isFree && wardrobe.length >= FREE_LIMIT

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const handleFragranceAdded = (item: any) => {
    setWardrobe((prev: any[]) => [item, ...prev])
    setShowAddModal(false)
    setAddBlocked(false)
  }

  const handleAddClick = () => {
    if (atLimit) {
      setAddBlocked(true)
      return
    }
    setShowAddModal(true)
  }

  const handleRemove = async (id: string) => {
    await fetch('/api/wardrobe', { method: 'DELETE', body: JSON.stringify({ id }), headers: { 'Content-Type': 'application/json' } })
    setWardrobe((prev: any[]) => prev.filter((i: any) => i.id !== id))
    setAddBlocked(false)
  }

  const handleRatingUpdate = (id: string, rating: number, note: string) => {
    setWardrobe((prev: any[]) => prev.map((i: any) => i.id === id ? { ...i, rating, personal_note: note } : i))
  }

  const handleShare = () => {
    const url = `${window.location.origin}/u/${user.id}`
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const displayWardrobe = [...wardrobe]
    .filter((item: any) => accordFilter === 'all' || (item.accords || []).some((a: string) => a.toLowerCase().includes(accordFilter)))
    .sort((a: any, b: any) => {
      if (sort === 'name')   return a.fragrance_name.localeCompare(b.fragrance_name)
      if (sort === 'brand')  return a.brand.localeCompare(b.brand)
      if (sort === 'rating') return (b.rating || 0) - (a.rating || 0)
      return 0
    })

  const tabs: { id: Tab; label: string; icon: any; badge?: number; isNew?: boolean }[] = [
    { id: 'wardrobe',  label: 'Wardrobe',  icon: Star,       badge: wardrobe.length },
    { id: 'stacks',    label: 'Stacks',    icon: Layers },
    { id: 'occasions', label: 'Occasions', icon: Calendar },
    { id: 'mood',      label: 'Mood',      icon: Brain,      isNew: true },
    { id: 'seasonal',  label: 'Seasonal',  icon: CloudSun,   isNew: true },
    { id: 'discover',  label: 'Discover',  icon: TrendingUp },
    { id: 'dna',       label: 'Scent DNA', icon: Dna },
  ]

  const avgRating = wardrobe.filter((i: any) => i.rating).length
    ? (wardrobe.filter((i: any) => i.rating).reduce((s: number, i: any) => s + (i.rating || 0), 0) / wardrobe.filter((i: any) => i.rating).length).toFixed(1)
    : null

  const planLabel = plan.charAt(0).toUpperCase() + plan.slice(1)
  const planStyle =
    plan === 'collector' ? { background: 'hsl(8 56% 76% / 0.18)', color: ROSE_DEEP, border: `1px solid ${ROSE_BORDER}` } :
    plan === 'pro'       ? { background: 'hsl(3 40% 58% / 0.15)', color: ROSE_DEEP, border: `1px solid hsl(3 40% 58% / 0.30)` } :
                           { background: ROSE_BG, color: MUTED, border: `1px solid ${ROSE_BORDER}` }

  return (
    <div
      className="min-h-screen"
      style={{
        background: CREAM,
        backgroundImage:
          'radial-gradient(ellipse 70% 40% at 50% -5%, hsl(8 56% 76% / 0.12) 0%, transparent 65%), radial-gradient(ellipse 50% 30% at 100% 100%, hsl(13 48% 65% / 0.08) 0%, transparent 60%)',
      }}
    >
      {/* ── Header ── */}
      <header
        className="border-b sticky top-0 z-40"
        style={{ background: 'hsl(18 60% 98% / 0.88)', backdropFilter: 'blur(18px)', borderColor: 'hsl(10 30% 88%)' }}
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Image src="/logo.png" alt="Your Scents" width={120} height={44} className="h-10 w-auto object-contain" />
            </Link>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={planStyle}>
              {planLabel}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-colors"
              style={{ background: ROSE_BG, color: ROSE_DEEP, border: `1px solid ${ROSE_BORDER}` }}
            >
              <Share2 className="h-3 w-3" />
              {copied ? 'Copied! 🌸' : 'My Scent Card'}
            </button>
            <span className="text-xs hidden sm:block" style={{ color: MUTED }}>{user.email}</span>
            <Button variant="ghost" size="icon" onClick={handleLogout} className="h-8 w-8">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">

        {wardrobe.length > 0 && (
          <ScentCardPanel userId={user.id} copied={copied} onCopy={handleShare} />
        )}

        {wardrobe.length > 0 && (
          <div className="mb-6"><ScentOfTheDay wardrobe={wardrobe} /></div>
        )}

        {/* ── Stats row ── */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Bottles',    value: isFree ? `${wardrobe.length} / ${FREE_LIMIT}` : `${wardrobe.length}`, icon: Star },
            { label: 'Avg Rating', value: avgRating ? `${avgRating}/5` : '—', icon: Sparkles },
            { label: 'Plan',       value: planLabel, icon: Zap },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="panel-glow rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Icon className="h-3.5 w-3.5" style={{ color: ROSE }} />
                <span className="text-[11px] font-medium" style={{ color: MUTED }}>{label}</span>
              </div>
              <p className="text-lg font-semibold tracking-tight serif" style={{ color: FOREGROUND }}>{value}</p>
            </div>
          ))}
        </div>

        {atLimit && (
          <div className="mb-6"><FreePlanGate /></div>
        )}

        {/* ── Tabs ── */}
        <div className="flex gap-1 mb-6 overflow-x-auto pb-1">
          {tabs.map(({ id, label, icon: Icon, badge, isNew }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-medium whitespace-nowrap transition-all"
              style={
                activeTab === id
                  ? { background: ROSE_BG, color: ROSE_DEEP, border: `1px solid ${ROSE_BORDER}` }
                  : { color: MUTED, border: '1px solid transparent' }
              }
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
              {badge !== undefined && badge > 0 && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: ROSE_BG, color: ROSE_DEEP }}>
                  {badge}
                </span>
              )}
              {isNew && (
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: ROSE, color: '#fff' }}>
                  NEW
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── Tab: Wardrobe ── */}
        {activeTab === 'wardrobe' && (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div className="flex gap-2 flex-wrap">
                {ACCORD_FILTERS.map(f => (
                  <button
                    key={f}
                    onClick={() => setAccordFilter(f)}
                    className="text-[11px] px-3 py-1.5 rounded-full capitalize transition-colors"
                    style={
                      accordFilter === f
                        ? { background: ROSE_BG, color: ROSE_DEEP, border: `1px solid ${ROSE_BORDER}` }
                        : { background: 'hsl(18 40% 93%)', color: MUTED, border: '1px solid hsl(10 25% 86%)' }
                    }
                  >
                    {f}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  className="text-[12px] bg-card border border-border rounded-lg px-3 py-1.5"
                  style={{ color: FOREGROUND }}
                >
                  {SORT_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                <button
                  onClick={handleAddClick}
                  className="flex items-center gap-1.5 text-xs px-4 py-2 rounded-full font-semibold transition-all"
                  style={
                    atLimit
                      ? { background: ROSE_BG, color: ROSE_DEEP, border: `1px solid ${ROSE_BORDER}`, cursor: 'default' }
                      : undefined
                  }
                  title={atLimit ? 'Upgrade to add more fragrances' : 'Add fragrance'}
                >
                  {atLimit
                    ? <><Lock className="h-3 w-3" /> Upgrade</>
                    : <><Plus className="h-3.5 w-3.5" /> Add</>
                  }
                </button>
              </div>
            </div>

            {addBlocked && atLimit && (
              <div className="mb-5"><FreePlanGate /></div>
            )}

            {displayWardrobe.length === 0 && (
              <div
                className="text-center py-20 rounded-2xl border border-dashed"
                style={{ borderColor: ROSE_BORDER }}
              >
                <Sparkles className="h-10 w-10 mx-auto mb-4" style={{ color: ROSE }} />
                <p className="text-sm font-medium mb-2" style={{ color: FOREGROUND }}>Your wardrobe is empty</p>
                <p className="text-xs mb-6" style={{ color: MUTED }}>Add your first fragrance to get started</p>
                <button onClick={() => setShowAddModal(true)} className="btn-gold text-sm px-6 py-2.5">
                  Add Fragrance ✨
                </button>
              </div>
            )}

            {displayWardrobe.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayWardrobe.map((item: any) => (
                  <WardrobeCard
                    key={item.id}
                    item={item}
                    onRemove={handleRemove}
                    onRatingUpdate={handleRatingUpdate}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'stacks'    && <StackSuggestions wardrobe={wardrobe} />}
        {activeTab === 'occasions' && <OccasionPlanner wardrobe={wardrobe} />}
        {activeTab === 'mood'      && <MoodMatcher wardrobe={wardrobe} />}
        {activeTab === 'seasonal'  && <SeasonalRotation wardrobe={wardrobe} />}
        {activeTab === 'discover'  && <DiscoveryFeed wardrobe={wardrobe} />}
        {activeTab === 'dna'       && <ScentDNA wardrobe={wardrobe} />}

      </div>

      {showAddModal && (
        <AddFragranceModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleFragranceAdded}
          wardrobe={wardrobe}
        />
      )}
    </div>
  )
}
