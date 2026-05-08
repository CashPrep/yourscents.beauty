'use client'
import { useState } from 'react'
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

const GOLD = 'hsl(42 85% 68%)'
const GOLD_BG = 'hsl(42 85% 68% / 0.10)'
const LOGO_URL = 'https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/67238f7d-e958-42c4-9876-33b89144adfd.png'

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
  const [wardrobe, setWardrobe] = useState(initialWardrobe)
  const [showAddModal, setShowAddModal] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('wardrobe')
  const [sort, setSort] = useState('recent')
  const [accordFilter, setAccordFilter] = useState('all')
  const [copied, setCopied] = useState(false)
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

  return (
    <div className="min-h-screen bg-background">

      {/* Header */}
      <header className="border-b border-border sticky top-0 z-40" style={{ background: 'hsl(220 16% 8% / 0.90)', backdropFilter: 'blur(16px)' }}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src={LOGO_URL} alt="ScentStack" className="w-7 h-7 rounded-lg object-cover" />
            <span className="font-semibold text-sm tracking-tight">ScentStack</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ml-1 ${
              plan === 'collector' ? 'bg-amber-900/40 text-amber-400 border border-amber-700/40' :
              plan === 'pro'       ? 'bg-purple-900/40 text-purple-400 border border-purple-700/40' :
              'bg-muted text-muted-foreground border border-border'
            }`}>{plan.charAt(0).toUpperCase() + plan.slice(1)}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-colors"
              style={{ background: GOLD_BG, color: GOLD, border: '1px solid hsl(42 85% 68% / 0.25)' }}
            >
              <Share2 className="h-3 w-3" />
              {copied ? 'Copied!' : 'Share'}
            </button>
            <span className="text-xs text-muted-foreground hidden sm:block">{user.email}</span>
            <Button variant="ghost" size="icon" onClick={handleLogout} className="h-8 w-8">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">

        {/* Scent of the Day */}
        {wardrobe.length > 0 && (
          <div className="mb-6">
            <ScentOfTheDay wardrobe={wardrobe} />
          </div>
        )}

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Bottles',    value: wardrobe.length,                                    icon: Star },
            { label: 'Avg Rating', value: avgRating ? `${avgRating}/5` : '—',               icon: Sparkles },
            { label: 'Plan',       value: plan.charAt(0).toUpperCase() + plan.slice(1),       icon: Zap },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-xl p-4 border border-border" style={{ background: 'hsl(220 16% 8%)' }}>
              <div className="flex items-center gap-2 mb-1">
                <Icon className="h-3.5 w-3.5" style={{ color: GOLD }} />
                <span className="text-[11px] text-muted-foreground font-medium">{label}</span>
              </div>
              <p className="text-lg font-semibold tracking-tight">{value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 overflow-x-auto pb-1">
          {tabs.map(({ id, label, icon: Icon, badge, isNew }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-medium whitespace-nowrap transition-all relative"
              style={
                activeTab === id
                  ? { background: GOLD_BG, color: GOLD, border: `1px solid hsl(42 85% 68% / 0.25)` }
                  : { color: 'hsl(220 10% 48%)', border: '1px solid transparent' }
              }
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
              {badge !== undefined && badge > 0 && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: GOLD_BG, color: GOLD }}>{badge}</span>
              )}
              {isNew && (
                <span className="text-[9px] font-bold px-1 py-0.5 rounded" style={{ background: GOLD, color: 'hsl(220 18% 6%)' }}>NEW</span>
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
                        ? { background: GOLD_BG, color: GOLD, border: '1px solid hsl(42 85% 68% / 0.25)' }
                        : { background: 'hsl(220 16% 8%)', color: 'hsl(220 10% 48%)', border: '1px solid hsl(220 14% 14%)' }
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
                  className="text-[12px] bg-card border border-border rounded-lg px-3 py-1.5 text-foreground"
                >
                  {SORT_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl"
                  style={{ background: GOLD, color: 'hsl(220 18% 6%)' }}
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add
                </button>
              </div>
            </div>

            {displayWardrobe.length === 0 && (
              <div className="text-center py-20 border border-dashed border-border rounded-2xl">
                <Sparkles className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm font-medium mb-2">Your wardrobe is empty</p>
                <p className="text-xs text-muted-foreground mb-6">Add your first fragrance to get started</p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="text-sm font-semibold px-6 py-2.5 rounded-xl"
                  style={{ background: GOLD, color: 'hsl(220 18% 6%)' }}
                >
                  Add Fragrance
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
