'use client'
import { useState } from 'react'
import { Sparkles, Plus, Layers, Calendar, LogOut, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import AddFragranceModal from './AddFragranceModal'
import WardrobeCard from './WardrobeCard'
import OccasionPlanner from './OccasionPlanner'
import Link from 'next/link'

interface Props {
  user: any
  wardrobe: any[]
  profile: any
}

export default function DashboardClient({ user, wardrobe: initialWardrobe, profile }: Props) {
  const router = useRouter()
  const supabase = createClient()
  const [wardrobe, setWardrobe] = useState(initialWardrobe)
  const [showAddModal, setShowAddModal] = useState(false)
  const [activeTab, setActiveTab] = useState<'wardrobe' | 'stack' | 'occasions'>('wardrobe')
  const plan = profile?.plan || 'free'

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-bold text-primary">ScentStack</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              plan === 'collector' ? 'bg-amber-100 text-amber-700' :
              plan === 'pro' ? 'bg-purple-100 text-purple-700' :
              'bg-muted text-muted-foreground'
            }`}>{plan.charAt(0).toUpperCase() + plan.slice(1)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden sm:block">{user.email}</span>
            <Button variant="ghost" size="icon" onClick={handleLogout}><LogOut className="h-4 w-4" /></Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Fragrances', value: wardrobe.length },
            { label: 'Plan', value: plan.charAt(0).toUpperCase() + plan.slice(1) },
            { label: 'Stacks Available', value: plan === 'free' ? '3/day' : '∞' },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white rounded-2xl p-4 border text-center">
              <p className="text-2xl font-bold text-primary">{value}</p>
              <p className="text-xs text-muted-foreground mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-muted rounded-xl p-1 mb-8 w-fit">
          {[{ id: 'wardrobe', label: 'My Wardrobe', icon: Star },
            { id: 'stack', label: 'Stack Builder', icon: Layers },
            { id: 'occasions', label: 'Occasion Planner', icon: Calendar }].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span className="hidden sm:block">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Wardrobe Tab */}
        {activeTab === 'wardrobe' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold">My Fragrance Wardrobe</h2>
                <p className="text-sm text-muted-foreground">
                  {plan === 'free' ? `${wardrobe.length}/3 fragrances (Free plan)` : `${wardrobe.length} fragrances`}
                </p>
              </div>
              <Button
                onClick={() => setShowAddModal(true)}
                className="gap-2"
                disabled={plan === 'free' && wardrobe.length >= 3}
              >
                <Plus className="h-4 w-4" /> Add Fragrance
              </Button>
            </div>
            {wardrobe.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border">
                <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Your wardrobe is empty</h3>
                <p className="text-muted-foreground text-sm mb-6">Search for your fragrances and add them to get started.</p>
                <Button onClick={() => setShowAddModal(true)}><Plus className="h-4 w-4 mr-2" /> Add Your First Fragrance</Button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {wardrobe.map(item => (
                  <WardrobeCard key={item.id} item={item} onRemove={handleRemove} />
                ))}
              </div>
            )}
            {plan === 'free' && wardrobe.length >= 3 && (
              <div className="mt-6 p-4 bg-accent rounded-2xl border border-primary/20 text-center">
                <p className="text-sm font-medium text-primary">You've reached the Free plan limit.</p>
                <p className="text-sm text-muted-foreground mb-3">Upgrade to Pro for unlimited fragrances.</p>
                <Link href="/api/checkout?plan=pro"><Button size="sm">Upgrade to Pro — $7.99/mo</Button></Link>
              </div>
            )}
          </div>
        )}

        {/* Stack Builder Tab */}
        {activeTab === 'stack' && (
          <Link href="/dashboard/stack">
            <div className="text-center py-20 bg-white rounded-2xl border cursor-pointer hover:border-primary transition-colors">
              <Layers className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Open Stack Builder</h3>
              <p className="text-muted-foreground text-sm">Select fragrances from your wardrobe and get a full layering analysis.</p>
            </div>
          </Link>
        )}

        {/* Occasion Planner Tab */}
        {activeTab === 'occasions' && (
          plan !== 'free'
            ? <OccasionPlanner wardrobe={wardrobe} />
            : (
              <div className="text-center py-20 bg-white rounded-2xl border">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Occasion Planner — Pro Feature</h3>
                <p className="text-muted-foreground text-sm mb-6">Upgrade to Pro to get custom stacks built for any occasion.</p>
                <Link href="/api/checkout?plan=pro"><Button>Upgrade to Pro</Button></Link>
              </div>
            )
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
