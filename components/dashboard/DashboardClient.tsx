'use client'
import { useState } from 'react'
import { Sparkles, Plus, Layers, Calendar, LogOut, Star, TrendingUp, Dna, Share2, Zap } from 'lucide-react'
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
import Link from 'next/link'

const GOLD = 'hsl(42 85% 68%)'
const GOLD_BG = 'hsl(42 85% 68% / 0.10)'

interface Props {
  user: any
  wardrobe: any[]
  profile: any
}

type Tab = 'wardrobe' | 'stacks' | 'occasions' | 'discover' | 'dna'

const SORT_OPTIONS = [
  { value: 'recent', label: 'Recently Added' },
  { value: 'name', label: 'Name A–Z' },
  { value: 'brand', label: 'Brand A–Z' },
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
  const isFirst = wardrobe.length === 0

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const handleFragranceAdded = (item: any) => {
    setWardrobe(prev => [item, ...prev])
    setShowAddModal(false)
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

  const displayWardrobe = [...wardrobe]
    .filter(item => accordFilter === 'all' || (item.accords || []).some((a: string) => a.toLowerCase().includes(accordFilter)))
    .sort((a, b) => {
      if (sort === 'name') return a.fragrance_name.localeCompare(b.fragrance_name)
      if (sort === 'brand') return a.brand.localeCompare(b.brand)
      if (sort === 'rating') return (b.rating || 0) - (a.rating || 0)
      return 0
    })

  const tabs: { id: Tab; label: string; icon: any; badge?: number }[] = [
    { id: 'wardrobe',  label: 'Wardrobe',  icon: Star,       badge: wardrobe.length },
    { id: 'stacks',    label: 'Stacks',    icon: Layers },
    { id: 'occasions', label: 'Occasions', icon: Calendar },
    { id: 'discover',  label: 'Discover',  icon: TrendingUp },
    { id: 'dna',       label: 'Scent DNA', icon: Dna },
  ]

  const avgRating = wardrobe.filter(i=>i.rating).length
    ? (wardrobe.filter(i=>i.rating).reduce((s,i)=>s+(i.rating||0),0)/wardrobe.filter(i=>i.rating).length).toFixed(1)
    : null

  return (
    <div className="min-h-screen bg-background">

      {/* Header */}
      <header className="border-b border-border sticky top-0 z-40" style={{ background: 'hsl(220 16% 8% / 0.90)', backdropFilter: 'blur(16px)' }}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: GOLD }}>
              <span className="text-[hsl(220_18%_6%)] text-xs font-bold">S</span>
            </div>
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
  