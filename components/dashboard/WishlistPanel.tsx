'use client'
import { useState, useEffect } from 'react'
import { Heart, Trash2, Plus } from 'lucide-react'
import ShopLinks from './ShopLinks'

const ROSE       = 'hsl(340 55% 62%)'
const ROSE_LIGHT = 'hsl(340 45% 92%)'
const ROSE_TEXT  = 'hsl(340 55% 48%)'

const PRIORITY_LABELS: Record<string, { label: string; color: string }> = {
  high:   { label: 'Must Try', color: 'hsl(0 70% 55%)'    },
  medium: { label: 'Want',     color: ROSE                 },
  low:    { label: 'Someday',  color: 'hsl(200 50% 50%)'  },
}

interface WishItem {
  id: string
  name: string
  brand: string
  priority: 'high' | 'medium' | 'low'
  note: string
  addedAt: number
}

const STORAGE_KEY = 'yourscents_wishlist'

function loadWishlist(): WishItem[] {
  if (typeof window === 'undefined') return []
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') } catch { return [] }
}
function saveWishlist(items: WishItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export default function WishlistPanel() {
  const [items,    setItems]    = useState<WishItem[]>([])
  const [adding,   setAdding]   = useState(false)
  const [name,     setName]     = useState('')
  const [brand,    setBrand]    = useState('')
  const [priority, setPriority] = useState<'high'|'medium'|'low'>('medium')
  const [note,     setNote]     = useState('')
  const [filter,   setFilter]   = useState<'all'|'high'|'medium'|'low'>('all')

  useEffect(() => { setItems(loadWishlist()) }, [])

  const save = (next: WishItem[]) => { setItems(next); saveWishlist(next) }

  const handleAdd = () => {
    if (!name.trim()) return
    save([{ id: `${Date.now()}`, name: name.trim(), brand: brand.trim() || 'Unknown', priority, note: note.trim(), addedAt: Date.now() }, ...items])
    setName(''); setBrand(''); setNote(''); setPriority('medium'); setAdding(false)
  }

  const remove       = (id: string) => save(items.filter(i => i.id !== id))
  const cyclePriority = (id: string) => {
    const order: ('high'|'medium'|'low')[] = ['high','medium','low']
    save(items.map(i => i.id === id ? { ...i, priority: order[(order.indexOf(i.priority)+1)%3] } : i))
  }

  const displayed = filter === 'all' ? items : items.filter(i => i.priority === filter)

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="h-4 w-4" style={{ color: ROSE }} />
          <h3 className="font-bold serif text-base">Wishlist</h3>
          <span className="text-xs text-muted-foreground">{items.length} saved</span>
        </div>
        <button onClick={() => setAdding(v => !v)} className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: ROSE, color: '#fff' }}>
          <Plus className="h-3 w-3" /> Add
        </button>
      </div>

      {adding && (
        <div className="rounded-2xl p-4 space-y-3" style={{ background: ROSE_LIGHT, border: `1px solid ${ROSE}44` }}>
          <div className="grid sm:grid-cols-2 gap-2">
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Fragrance name" className="text-sm px-3 py-2 rounded-xl border border-border bg-white w-full" />
            <input value={brand} onChange={e => setBrand(e.target.value)} placeholder="Brand (optional)" className="text-sm px-3 py-2 rounded-xl border border-border bg-white w-full" />
          </div>
          <input value={note} onChange={e => setNote(e.target.value)} placeholder="Why you want it (optional)" className="text-sm px-3 py-2 rounded-xl border border-border bg-white w-full" />
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium" style={{ color: ROSE_TEXT }}>Priority:</span>
            {(['high','medium','low'] as const).map(p => (
              <button key={p} onClick={() => setPriority(p)} className="text-[11px] px-2.5 py-1 rounded-full capitalize font-medium"
                style={{ background: priority === p ? PRIORITY_LABELS[p].color : 'hsl(0 0% 100% / 0.7)', color: priority === p ? '#fff' : ROSE_TEXT }}>
                {PRIORITY_LABELS[p].label}
              </button>
            ))}
            <button onClick={handleAdd} className="ml-auto text-xs font-bold px-4 py-1.5 rounded-full" style={{ background: ROSE, color: '#fff' }}>Save</button>
          </div>
        </div>
      )}

      {items.length > 0 && (
        <div className="flex gap-1.5">
          {(['all','high','medium','low'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} className="text-[11px] px-3 py-1 rounded-full capitalize font-medium"
              style={{ background: filter === f ? ROSE_LIGHT : 'transparent', color: filter === f ? ROSE_TEXT : 'hsl(var(--muted-foreground))', border: filter === f ? `1px solid ${ROSE}44` : '1px solid transparent' }}>
              {f === 'all' ? 'All' : PRIORITY_LABELS[f].label}
              {f !== 'all' && <span className="ml-1 opacity-60">{items.filter(i => i.priority === f).length}</span>}
            </button>
          ))}
        </div>
      )}

      {displayed.length === 0 && (
        <div className="text-center py-16 rounded-2xl border border-dashed" style={{ borderColor: `${ROSE}44` }}>
          <Heart className="h-8 w-8 mx-auto mb-3" style={{ color: ROSE }} />
          <p className="text-sm font-medium">Your wishlist is empty</p>
          <p className="text-xs text-muted-foreground mt-1">Save fragrances you want to try next.</p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {displayed.map(item => {
          const pr = PRIORITY_LABELS[item.priority]
          return (
            <div key={item.id} className="rounded-2xl p-4 flex flex-col gap-2 bg-card border border-border hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm serif leading-tight truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.brand}</p>
                </div>
                <button onClick={() => remove(item.id)} className="p-1 hover:bg-muted rounded-lg">
                  <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
              </div>

              {item.note && (
                <p className="text-[11px] text-muted-foreground italic">&ldquo;{item.note}&rdquo;</p>
              )}

              <div className="flex items-center gap-2 mt-auto flex-wrap">
                <button onClick={() => cyclePriority(item.id)} className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: `${pr.color}22`, color: pr.color, border: `1px solid ${pr.color}44` }} title="Click to change priority">
                  {pr.label}
                </button>
                {/* Affiliate shop links — full width for wishlisted items (high buy intent) */}
                <div className="ml-auto">
                  <ShopLinks fragranceName={item.name} brand={item.brand} variant="compact" />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
