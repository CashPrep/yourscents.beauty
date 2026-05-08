'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X, Search, Loader2, Plus } from 'lucide-react'
import { useToast } from '@/components/ui/toaster'
import Image from 'next/image'

interface Props {
  onClose: () => void
  onAdded: (item: any) => void
}

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
      // ── Step 1: fetch the FULL fragrance detail to get all notes ──────────
      // Search results only return basic fields; the detail endpoint returns
      // the complete top / middle (heart) / base note breakdown.
      let fullFragrance = fragrance
      try {
        const detailRes = await fetch(`/api/fragrances/${fragrance.id}`)
        if (detailRes.ok) {
          const detail = await detailRes.json()
          // Merge detail over the search result so we keep image_url etc.
          fullFragrance = { ...fragrance, ...detail }
        }
      } catch {
        // If detail fetch fails, fall back to whatever the search result gave us
      }

      // ── Step 2: flatten all notes into one array ──────────────────────────
      // Support both possible API shapes:
      //   { notes: { top: [], middle: [], base: [] } }   (Fragella standard)
      //   { top_notes: [], heart_notes: [], base_notes: [] }  (alt shape)
      const topNotes =
        fullFragrance.notes?.top ||
        fullFragrance.top_notes ||
        []
      const middleNotes =
        fullFragrance.notes?.middle ||
        fullFragrance.notes?.heart ||
        fullFragrance.heart_notes ||
        fullFragrance.middle_notes ||
        []
      const baseNotes =
        fullFragrance.notes?.base ||
        fullFragrance.base_notes ||
        []

      const allNotes = [
        ...topNotes.map((n: any) => (typeof n === 'string' ? n : n.name)),
        ...middleNotes.map((n: any) => (typeof n === 'string' ? n : n.name)),
        ...baseNotes.map((n: any) => (typeof n === 'string' ? n : n.name)),
      ].filter(Boolean)

      // ── Step 3: save to wardrobe with structured note data ────────────────
      const res = await fetch('/api/wardrobe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fragrance_id: fullFragrance.id,
          fragrance_name: fullFragrance.name,
          brand: fullFragrance.brand,
          notes: allNotes,
          notes_structured: {
            top: topNotes.map((n: any) => (typeof n === 'string' ? n : n.name)).filter(Boolean),
            middle: middleNotes.map((n: any) => (typeof n === 'string' ? n : n.name)).filter(Boolean),
            base: baseNotes.map((n: any) => (typeof n === 'string' ? n : n.name)).filter(Boolean),
          },
          accords: fullFragrance.accords || [],
          image_url: fullFragrance.image_url || fullFragrance.image || null,
        }),
      })

      const data = await res.json()
      if (res.ok) {
        onAdded(data)
        toast({
          title: 'Added to wardrobe! 🌸',
          description: `${fullFragrance.name} by ${fullFragrance.brand} — ${allNotes.length} notes loaded`,
        })
      } else {
        toast({ title: 'Error', description: data.error, variant: 'destructive' })
      }
    } catch (err) {
      toast({ title: 'Error', description: 'Something went wrong. Please try again.', variant: 'destructive' })
    }
    setAdding(null)
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-bold text-lg">Add Fragrance 🌸</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-muted rounded-lg"><X className="h-4 w-4" /></button>
        </div>
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Search 70,000+ fragrances..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              autoFocus
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {loading && (
            <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
          )}
          {!loading && results.length === 0 && query.length >= 2 && (
            <p className="text-center text-muted-foreground text-sm py-8">No fragrances found. Try a different search.</p>
          )}
          {!loading && query.length < 2 && (
            <p className="text-center text-muted-foreground text-sm py-8">Start typing to search for fragrances...</p>
          )}
          {results.map((frag: any) => (
            <div key={frag.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 border">
              {frag.image_url || frag.image ? (
                <Image src={frag.image_url || frag.image} alt={frag.name} width={48} height={48} className="rounded-lg object-cover flex-shrink-0" />
              ) : (
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center text-xl flex-shrink-0">🌸</div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{frag.name}</p>
                <p className="text-xs text-muted-foreground">{frag.brand}</p>
                {frag.accords?.length > 0 && (
                  <div className="flex gap-1 mt-1 flex-wrap">
                    {frag.accords.slice(0, 3).map((a: string) => (
                      <span key={a} className="text-xs bg-accent text-accent-foreground px-1.5 py-0.5 rounded-full capitalize">{a}</span>
                    ))}
                  </div>
                )}
              </div>
              <Button
                size="sm"
                variant="outline"
                disabled={adding === frag.id}
                onClick={() => handleAdd(frag)}
                className="flex-shrink-0"
              >
                {adding === frag.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Plus className="h-3 w-3" />}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
