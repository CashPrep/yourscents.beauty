'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X, Search, Loader2, Plus } from 'lucide-react'
import { useToast } from '@/components/ui/toaster'

interface Props {
  onClose: () => void
  onAdded: (item: any) => void
}

const ROSE = 'hsl(340 55% 62%)'
const ROSE_LIGHT = 'hsl(340 45% 92%)'

export default function AddFragranceModal({ onClose, onAdded }: Props) {
  const { toast } = useToast()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [adding, setAdding] = useState<string | null>(null)

  useEffect(() => {
    if (query.length < 2) { setResults([]); return }
    const timeout = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/fragrances/search?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        setResults(data.results || [])
      } catch {
        setResults([])
      }
      setLoading(false)
    }, 400)
    return () => clearTimeout(timeout)
  }, [query])

  const handleAdd = async (fragrance: any) => {
    setAdding(fragrance.id)
    try {
      // Fetch full detail to get complete notes (falls back gracefully)
      let fullFragrance = fragrance
      try {
        const detailRes = await fetch(`/api/fragrances/${fragrance.id}`)
        if (detailRes.ok) {
          const detail = await detailRes.json()
          fullFragrance = { ...fragrance, ...detail }
          // Always keep the image_url from search result if detail doesn't have one
          if (!fullFragrance.image_url) fullFragrance.image_url = fragrance.image_url
        }
      } catch { /* keep search result data */ }

      const topNotes    = fullFragrance.notes?.top    || fullFragrance.top_notes    || []
      const middleNotes = fullFragrance.notes?.middle || fullFragrance.notes?.heart || fullFragrance.heart_notes || fullFragrance.middle_notes || []
      const baseNotes   = fullFragrance.notes?.base   || fullFragrance.base_notes   || []

      const allNotes = [
        ...topNotes.map((n: any)    => (typeof n === 'string' ? n : n.name)),
        ...middleNotes.map((n: any) => (typeof n === 'string' ? n : n.name)),
        ...baseNotes.map((n: any)   => (typeof n === 'string' ? n : n.name)),
      ].filter(Boolean)

      const res = await fetch('/api/wardrobe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fragrance_id:     fullFragrance.id,
          fragrance_name:   fullFragrance.name,
          brand:            fullFragrance.brand,
          notes:            allNotes,
          notes_structured: {
            top:    topNotes.map((n: any)    => typeof n === 'string' ? n : n.name).filter(Boolean),
            middle: middleNotes.map((n: any) => typeof n === 'string' ? n : n.name).filter(Boolean),
            base:   baseNotes.map((n: any)   => typeof n === 'string' ? n : n.name).filter(Boolean),
          },
          accords:   fullFragrance.accords || [],
          image_url: fullFragrance.image_url || null,
        }),
      })

      const data = await res.json()
      if (res.ok) {
        onAdded(data)
        toast({
          title: 'Added to wardrobe! 🌸',
          description: `${fullFragrance.name} by ${fullFragrance.brand}${allNotes.length ? ` — ${allNotes.length} notes loaded` : ''}`,
        })
      } else {
        toast({ title: 'Error', description: data.error, variant: 'destructive' })
      }
    } catch {
      toast({ title: 'Error', description: 'Something went wrong. Please try again.', variant: 'destructive' })
    }
    setAdding(null)
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-2xl shadow-xl w-full max-w-lg max-h-[80vh] flex flex-col border border-border">

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-semibold text-base serif">Add Fragrance 🌸</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-muted rounded-lg">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Search input */}
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-9 rounded-full"
              placeholder="Search Chanel, Dior, YSL, Gucci..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {loading && (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" style={{ color: ROSE }} />
            </div>
          )}
          {!loading && results.length === 0 && query.length >= 2 && (
            <p className="text-center text-muted-foreground text-sm py-8">No fragrances found. Try a different search.</p>
          )}
          {!loading && query.length < 2 && (
            <div className="text-center py-8">
              <p className="text-2xl mb-2">🌸</p>
              <p className="text-muted-foreground text-sm">Search for your favourite fragrances...</p>
              <p className="text-muted-foreground text-xs mt-1 opacity-60">Try: Chanel, Dior, YSL, Gucci, Jo Malone</p>
            </div>
          )}

          {results.map((frag: any) => (
            <div
              key={frag.id}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/40 border border-transparent hover:border-border transition-all"
            >
              {/* Fragrance bottle image */}
              <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-border bg-muted/30">
                {frag.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={frag.image_url}
                    alt={`${frag.name} by ${frag.brand} bottle`}
                    className="w-full h-full object-contain p-1"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      target.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center text-xl">🌸</div>'
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xl">🌸</div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate serif">{frag.name}</p>
                <p className="text-xs text-muted-foreground mb-1">{frag.brand}</p>
                {/* Top notes preview */}
                {(frag.notes?.top?.length > 0 || frag.notes?.middle?.length > 0) && (
                  <div className="flex gap-1 flex-wrap">
                    {[...(frag.notes?.top || []), ...(frag.notes?.middle || [])].slice(0, 3).map((n: string) => (
                      <span
                        key={n}
                        className="text-[10px] px-1.5 py-0.5 rounded-full"
                        style={{ background: ROSE_LIGHT, color: ROSE }}
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <Button
                size="sm"
                disabled={adding === frag.id}
                onClick={() => handleAdd(frag)}
                className="flex-shrink-0 rounded-full px-3"
                style={{ background: ROSE, color: '#fff' }}
              >
                {adding === frag.id
                  ? <Loader2 className="h-3 w-3 animate-spin" />
                  : <><Plus className="h-3 w-3 mr-1" /> Add</>
                }
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
