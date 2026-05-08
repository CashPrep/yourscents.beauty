'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Sparkles, Plus, Layers, Calendar, LogOut, Star, TrendingUp, Dna, Share2, Zap, Brain, CloudSun } from 'lucide-react'
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

// ── Brand tokens (matches globals.css) ────────────────────────────────────────
const ROSE       = 'hsl(8 48% 72%)'          // dusty rose primary
const ROSE_BG    = 'hsl(8 56% 76% / 0.12)'   // rose tint background
const ROSE_BORDER= 'hsl(8 56% 76% / 0.32)'   // rose border
const ROSE_DEEP  = 'hsl(3 40% 58%)'          // mauve rose deep
const CREAM      = 'hsl(18 50% 97%)'         // page background cream
const FOREGROUND = 'hsl(5 25% 22%)'          // warm near-black
const MUTED      = 'hsl(8 15% 52%)'          // muted text

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

export default function DashboardClient({ user, wardrobe: initialWardrobe, profile }: Props) {
  const router = useRouter()
  const supabase = createClient()
  const [wardrobe, setWardrobe]       = useState(initialWardrobe)
  const [showAddModal, setShowAddModal] = useState(false)
  const [activeTab, setActiveTab]     = useState<Tab>('wardrobe')
  const [sort, setSort]               = useState('recent')
  const [accordFilter, setAccordFilter] = useState('all')
  const [copied, setCopied]           = useState(false)
  const plan = profile?.plan || 'free'

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const handleFragranceAdded = (item: any) => {
    setWardrobe((prev: any[]) => [item, ...prev])
    setShowAddModal(false)
  }

  const handleRemove = async (id: string) => {
    await fetch('/api/wardrobe', { method: 'DELETE', body: JSON.stringify({ id }), headers: { 'Content-Type': 'application/json' } })
    setWardrobe((prev: any[]) => prev.filter((i: any) => i.id !== id))
  }

  const handleRatingUpdate = (id: string, rating: number, note: string) => {
    setWardrobe((prev: any[]) => prev.map((i: any) => i.id === id ? { ...i, rating, personal_note: note } : i))
  }

  const handleShare = () => {
    const url = `${window.location.origin}/u/${user.id}`
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
      {/* ── Sticky header ─────────────────────────────────────────────────── */}
      <header
        className="border-b sticky top-0 z-40"
        style={{
          background: 'hsl(18 60% 98% / 0.88)',
          backdropFilter: 'blur(18px)',
          borderColor: 'hsl(10 30% 88%)',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'hsl(18 67% 96%)' }}
            >
              <Image src="/logo.png" alt="Your Scents" width={22} height={22} className="object-contain" />
            </div>
            <span className="font-semibold text-sm tracking-tight serif" style={{ color: FOREGROUND }}>Your Scents</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold ml-1" style={planStyle}>
              {planLabel}
            </span>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-colors"
              style={{ background: ROSE_BG, color: ROSE_DEEP, border: `1px solid ${ROSE_BORDER}` }}
            >
              <Share2 className="h-3 w-3" />
              {copied ? 'Copied!' : 'Share'}
            </button>
            <span className="text-xs hidden sm:block" style={{ color: MUTED }}>{user.email}</span>
            <Button variant="ghost" size="icon" onClick={handleLogout} className="h-8 w-8">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">

        {/* Scent of the Day */}
        {wardrobe.length > 0 && (
          <div className="mb-6"><ScentOfTheDay wardrobe={wardrobe} /></div>
        )}

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Bottles',    value: wardrobe.length,                icon: Star },
            { label: 'Avg Rating', value: avgRating ? `${avgRating}/5` : '—', icon: Sparkles },
            { label: 'Plan',       value: planLabel,                      icon: Zap },
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

        {/* Tabs */}
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

        {/* Tab: Wardrobe */}
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
                  onClick={() => setShowAddModal(true)}
                  className="btn-gold flex items-center gap-1.5 text-xs px-4 py-2"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add
                </button>
              </div>
            </div>

            {displayWardrobe.length === 0 && (
              <div
                className="text-center py-20 rounded-2xl border border-dashed"
                style={{ borderColor: ROSE_BORDER }}
              >
                <Sparkles className="h-10 w-10 mx-auto mb-4" style={{ color: ROSE }} />
                <p className="text-sm font-medium mb-2" style={{ color: FOREGROUND }}>Your wardrobe is empty</p>
                <p className="text-xs mb-6" style={{ color: MUTED }}>Add your first fragrance to get started</p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="btn-gold text-sm px-6 py-2.5"
                >
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
