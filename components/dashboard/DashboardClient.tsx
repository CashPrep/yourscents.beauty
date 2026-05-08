'use client'
import { useState } from 'react'
import { Sparkles, Plus, Layers, Calendar, LogOut, Star, TrendingUp, Dna, Share2, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import AddFragranceModal from './AddFragranceModal'
import WardrobeCard from './WardrobeCard'
import OccasionPlanner from './OccasionPlanner'
import ScentDNA from './ScentDNA'
import ScentOfTheDay from './ScentOfTheDay'
import DiscoveryFeed from './DiscoveryFeed'
import Link from 'next/link'

const ROSE = 'hsl(340 55% 62%)'
const ROSE_LIGHT = 'hsl(340 45% 92%)'

interface Props {
  user: any
  wardrobe: any[]
  profile: any
}

type Tab = 'wardrobe' | 'stack' | 'occasions' | 'discover' | 'dna'

const SORT_OPTIONS = [
  { value: 'recent', label: 'Recently Added' },
  { value: 'name', label: 'Name A–Z' },
  { value: 'brand', label: 'Brand A–Z' },
  { value: 'rating', label: 'Top Rated' },
]

const ACCORD_FILTERS = ['all','floral','fresh','woody','sweet','musky','fruity','spicy','aromatic']

function Confetti() {
  const pieces = Array.from({ length: 18 }, (_, i) => i)
  const colors = [ROSE, '#fcd34d', '#6ee7b7', '#c4b5fd', '#fb923c', '#f9a8d4']
  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      {pieces.map(i => (
        <div
          key={i}
          className="absolute w-2.5 h-2.5 rounded-sm animate-bounce"
          style={{
            left: `${5 + i * 5.5}%`,
            top: `${Math.random() * 60}%`,
            background: colors[i % colors.length],
            animationDelay: `${i * 0.07}s`,
            animationDuration: `${0.7 + Math.random() * 0.5}s`,
            transform: `rotate(${i * 20}deg)`,
            opacity: 0.85,
          }}
        />
      ))}
    </div>
  )
}

export default function DashboardClient({ user, wardrobe: initialWardrobe, profile }: Props) {
  const router = useRouter()
  const supabase = createClient()
  const [wardrobe, setWardrobe] = useState(initialWardrobe)
  const [showAddModal, setShowAddModal] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('wardrobe')
  const [showConfetti, setShowConfetti] = useState(false)
  const [sort, setSort] = useState('recent')
  const [accordFilter, setAccordFilter] = useState('all')
  const [copied, setCopied] = useState(false)
  const plan = profile?.plan || 'free'
  const isFirst = wardrobe.length === 0

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const handleFragranceAdded = (item: any) => {
    const isVeryFirst = wardrobe.length === 0
    setWardrobe(prev => [item, ...prev])
    setShowAddModal(false)
    if (isVeryFirst) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3500)
    }
  }

  const handleRemove = async (id: string) => {
    await fetch('/api/wardrobe', { method: 'DELETE', body: JSON.stringify({ id }), headers: { 'Content-Type': 'application/json' } })
    setWardrobe(prev => prev.filter(i => i.id !== id))
  }

  const handleRatingUpdate = (id: string, rating: number, note: string) => {
    setWardrobe(prev => prev.map(i => i.id === id ? { ...i, rating, personal_note: note } : i))
  }

  const handleShare = () => {
    const url = `${window.location.origin}/u/${user.id}`
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Sort & filter
  const displayWardrobe = [...wardrobe]
    .filter(item => accordFilter === 'all' || (item.accords || []).some((a: string) => a.toLowerCase().includes(accordFilter)))
    .sort((a, b) => {
      if (sort === 'name') return a.fragrance_name.localeCompare(b.fragrance_name)
      if (sort === 'brand') return a.brand.localeCompare(b.brand)
      if (sort === 'rating') return (b.rating || 0) - (a.rating || 0)
      return 0 // recent = insertion order
    })

  const tabs: { id: Tab; label: string; icon: any; badge?: number }[] = [
    { id: 'wardrobe',  label: 'Wardrobe',  icon: Star,      badge: wardrobe.length },
    { id: 'stack',     label: 'Stack',     icon: Layers },
    { id: 'occasions', label: 'Occasions', icon: Calendar },
    { id: 'discover',  label: 'Discover',  icon: TrendingUp },
    { id: 'dna',       label: 'Scent DNA', icon: Dna },
  ]

  return (
    <div className="min-h-screen bg-background">
      {showConfetti && <Confetti />}

      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" style={{ color: ROSE }} />
            <span className="font-bold serif" style={{ color: ROSE }}>ScentStack</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              plan === 'collector' ? 'bg-amber-100 text-amber-700' :
              plan === 'pro'       ? 'bg-purple-100 text-purple-700' :
              'bg-muted text-muted-foreground'
            }`}>{plan.charAt(0).toUpperCase() + plan.slice(1)}</span>
          </div>
          <div className="flex items-center gap-2">
            {/* Dark mode toggle */}
            <button
              onClick={() => document.documentElement.classList.toggle('dark')}
              className="p-2 hover:bg-muted rounded-lg transition-colors text-sm"
              title="Toggle dark mode"
            >🌙</button>
            {/* Share button */}
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-colors"
              style={{ background: ROSE_LIGHT, color: ROSE }}
            >
              <Share2 className="h-3 w-3" />
              {copied ? 'Copied! 🎉' : 'Share'}
            </button>
            <span className="text-sm text-muted-foreground hidden sm:block">{user.email}</span>
            <Button variant="ghost" size="icon" onClick={handleLogout}><LogOut className="h-4 w-4" /></Button>
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

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Fragrances', value: wardrobe.length },
            { label: 'Avg Rating', value: wardrobe.filter(i=>i.rating).length ? (wardrobe.filter(i=>i.rating).reduce((s,i)=>s+(i.rating||0),0)/wardrobe.filter(i=>i.rating).length).toFixed(1)+'⭐' : '—' },
            { label: 'Plan', value: plan.charAt(0).toUpperCase() + plan.slice(1) },
          ].map(({ label, value }) => (
            <div key={label} className="bg-card rounded-2xl p-4 border border-border text-center">
              <p className="text-xl font-bold" style={{ color: ROSE }}>{value}</p>
              <p className="text-xs text-muted-foreground mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-muted rounded-xl p-1 mb-6 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap flex-shrink-0 relative ${
                activeTab === tab.id ? 'bg-card shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
              style={activeTab === tab.id ? { color: ROSE } : {}}
            >
              <tab.icon className="h-3.5 w-3.5" />
              <span className="hidden sm:block">{tab.label}</span>
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 text-[9px] font-bold rounded-full flex items-center justify-center text-white" style={{ background: ROSE }}>
                  {tab.badge > 99 ? '99+' : tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ─── WARDROBE TAB ─── */}
        {activeTab === 'wardrobe' && (
          <div>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <div>
                <h2 className="text-lg font-bold serif">My Fragrance Wardrobe</h2>
                <p className="text-xs text-muted-foreground">
                  {plan === 'free' ? `${wardrobe.length}/3 (Free plan)` : `${wardrobe.length} fragrance${wardrobe.length !== 1 ? 's' : ''}`}
                </p>
              </div>
              <Button
                onClick={() => setShowAddModal(true)}
                className="gap-2 rounded-full text-sm"
                style={{ background: ROSE, color: '#fff' }}
                disabled={plan === 'free' && wardrobe.length >= 3}
              >
                <Plus className="h-4 w-4" /> Add Fragrance
              </Button>
            </div>

            {/* Sort & Filter */}
            {wardrobe.length > 1 && (
              <div className="flex gap-2 mb-4 flex-wrap">
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  className="text-xs border border-border rounded-full px-3 py-1.5 bg-card focus:outline-none"
                >
                  {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <div className="flex gap-1 flex-wrap">
                  {ACCORD_FILTERS.map(f => (
                    <button
                      key={f}
                      onClick={() => setAccordFilter(f)}
                      className="text-[10px] font-medium px-2.5 py-1 rounded-full capitalize transition-colors"
                      style={
                        accordFilter === f
                          ? { background: ROSE, color: '#fff' }
                          : { background: 'hsl(var(--muted))', color: 'hsl(var(--muted-foreground))' }
                      }
                    >{f}</button>
                  ))}
                </div>
              </div>
            )}

            {isFirst ? (
              <div className="text-center py-16 bg-card rounded-2xl border border-border">
                <div className="text-5xl mb-3">🌸</div>
                <h3 className="font-bold serif mb-1">Your wardrobe is empty</h3>
                <p className="text-muted-foreground text-sm mb-2">Add your first fragrance to start building your collection.</p>
                <p className="text-xs text-muted-foreground mb-6 opacity-60">Try: Chanel, Dior, YSL, Glossier, Jo Malone</p>
                <Button
                  onClick={() => setShowAddModal(true)}
                  className="gap-2 rounded-full"
                  style={{ background: ROSE, color: '#fff' }}
                >
                  <Plus className="h-4 w-4" /> Add Your First Fragrance
                </Button>
              </div>
            ) : displayWardrobe.length === 0 ? (
              <div className="text-center py-10 bg-card rounded-2xl border border-border">
                <p className="text-muted-foreground text-sm">No fragrances match this filter.</p>
                <button onClick={() => setAccordFilter('all')} className="text-xs mt-2" style={{ color: ROSE }}>Clear filter</button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {displayWardrobe.map(item => (
                  <WardrobeCard key={item.id} item={item} onRemove={handleRemove} onRatingUpdate={handleRatingUpdate} />
                ))}
              </div>
            )}

            {plan === 'free' && wardrobe.length >= 3 && (
              <div className="mt-6 p-4 rounded-2xl border text-center" style={{ background: ROSE_LIGHT, borderColor: ROSE + '44' }}>
                <p className="text-sm font-medium" style={{ color: ROSE }}>You&apos;ve reached the Free plan limit 💕</p>
                <p className="text-sm text-muted-foreground mb-3">Upgrade to Pro for unlimited fragrances.</p>
                <Link href="/api/checkout?plan=pro">
                  <Button size="sm" style={{ background: ROSE, color: '#fff' }} className="rounded-full">Upgrade to Pro — $7.99/mo</Button>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* ─── STACK TAB ─── */}
        {activeTab === 'stack' && (
          <Link href="/dashboard/stack">
            <div className="text-center py-20 bg-card rounded-2xl border border-border cursor-pointer hover:shadow-md transition-shadow">
              <Layers className="h-12 w-12 mx-auto mb-4" style={{ color: ROSE }} />
              <h3 className="font-bold serif mb-2">Open Stack Builder</h3>
              <p className="text-muted-foreground text-sm">Select fragrances and get a full layering analysis + note overlap visualizer.</p>
            </div>
          </Link>
        )}

        {/* ─── OCCASIONS TAB ─── */}
        {activeTab === 'occasions' && (
          plan !== 'free'
            ? <OccasionPlanner wardrobe={wardrobe} />
            : (
              <div className="text-center py-20 bg-card rounded-2xl border border-border">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-bold serif mb-2">Occasion Planner — Pro Feature</h3>
                <p className="text-muted-foreground text-sm mb-6">Upgrade to Pro to get custom stacks for any occasion.</p>
                <Link href="/api/checkout?plan=pro">
                  <Button style={{ background: ROSE, color: '#fff' }} className="rounded-full">Upgrade to Pro</Button>
                </Link>
              </div>
            )
        )}

        {/* ─── DISCOVER TAB ─── */}
        {activeTab === 'discover' && (
          <DiscoveryFeed wardrobeIds={wardrobe.map(w => w.fragrance_id || w.id)} />
        )}

        {/* ─── DNA TAB ─── */}
        {activeTab === 'dna' && (
          <div className="max-w-lg">
            <ScentDNA wardrobe={wardrobe} />
          </div>
        )}
      </div>

      {showAddModal && (
        <AddFragranceModal
          onClose={() => setShowAddModal(false)}
          onAdded={handleFragranceAdded}
        />
      )}
    </div>
  )
}
