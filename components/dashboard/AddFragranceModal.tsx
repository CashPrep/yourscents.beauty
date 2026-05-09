'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X, Search, Loader2, Plus, ShieldCheck, ShieldAlert, ShieldX } from 'lucide-react'
import { useToast } from '@/components/ui/toaster'

interface Props {
  onClose: () => void
  onAdd: (item: any) => void
  wardrobe?: any[]
}

const ROSE        = 'hsl(340 55% 62%)'
const ROSE_LIGHT  = 'hsl(340 45% 92%)'   // was missing — caused ReferenceError in expanded card
const ROSE_TEXT   = 'hsl(340 55% 48%)'
const GOLD        = 'hsl(42 85% 68%)'
const GOLD_BG     = 'hsl(42 85% 68% / 0.10)'
const GOLD_BORDER = 'hsl(42 85% 68% / 0.25)'

function blindBuyScore(
  candidate: any,
  wardrobe: any[],
): { score: number; label: string; color: string; bg: string; icon: 'safe' | 'caution' | 'risk'; reason: string } {
  if (!wardrobe || wardrobe.length === 0) {
    return { score: 72, label: 'No Data', color: GOLD, bg: GOLD_BG, icon: 'caution', reason: 'Add fragrances to your wardrobe for a personalised score.' }
  }

  const candidateAccords = [
    ...(candidate.accords || []),
    ...(candidate.notes?.top    || []),
    ...(candidate.notes?.middle || []),
    ...(candidate.notes?.base   || []),
  ].map((n: string) => n.toLowerCase())

  const likedAccords: string[]    = []
  const dislikedAccords: string[] = []
  wardrobe.forEach((item: any) => {
    const itemAccords = [...(item.accords || []), ...(item.notes || [])].map((a: string) => a.toLowerCase())
    if ((item.rating || 3) >= 4) likedAccords.push(...itemAccords)
    if ((item.rating || 3) <= 2) dislikedAccords.push(...itemAccords)
  })

  const likedSet    = new Set(likedAccords)
  const dislikedSet = new Set(dislikedAccords)
  const likedHits    = candidateAccords.filter(a => likedSet.has(a)).length
  const dislikedHits = candidateAccords.filter(a => dislikedSet.has(a)).length

  const allWardrobeAccords = new Set(
    wardrobe.flatMap((i: any) => [...(i.accords || []), ...(i.notes || [])].map((a: string) => a.toLowerCase()))
  )
  const novelAccords = candidateAccords.filter(a => !allWardrobeAccords.has(a)).length
  const novelBonus   = Math.min(10, novelAccords * 3)

  let score = 65
  score += likedHits    * 8
  score -= dislikedHits * 12
  score += novelBonus
  score  = Math.max(5, Math.min(98, score))

  if (score >= 78) {
    const reason = likedHits > 0
      ? `Shares ${likedHits} accord${likedHits > 1 ? 's' : ''} with fragrances you love.${novelAccords > 0 ? ` Also adds ${novelAccords} new note family.` : ''}`
      : `Complements your collection well${novelAccords > 0 ? ` and adds ${novelAccords} fresh accord${novelAccords > 1 ? 's' : ''}` : ''}.`
    return { score, label: 'Safe Buy', color: 'hsl(142 70% 45%)', bg: 'hsl(142 70% 55% / 0.08)', icon: 'safe', reason }
  }
  if (score >= 55) {
    const reason = dislikedHits > 0
      ? `Contains ${dislikedHits} note${dislikedHits > 1 ? 's' : ''} from fragrances you rated lower — sample first.`
      : 'Neutral overlap with your collection. Sampling recommended.'
    return { score, label: 'Sample First', color: GOLD, bg: GOLD_BG, icon: 'caution', reason }
  }
  const reason = dislikedHits > 0
    ? 'Heavy overlap with accords from your lower-rated bottles. High blind buy risk.'
    : 'Very different from anything in your wardrobe — could be a miss.'
  return { score, label: 'High Risk', color: 'hsl(0 65% 55%)', bg: 'hsl(0 65% 60% / 0.08)', icon: 'risk', reason }
}

export default function AddFragranceModal({ onClose, onAdd, wardrobe = [] }: Props) {
  const { toast } = useToast()
  const [query,    setQuery]    = useState('')
  const [results,  setResults]  = useState<any[]>([])
  const [loading,  setLoading]  = useState(false)
  const [adding,   setAdding]   = useState<string | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    if (query.length < 2) { setResults([]); return }
    const timeout = setTimeout(async () => {
      setLoading(true)
      try {
        const res  = await fetch(`/api/fragrances/search?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        setResults(data.results || [])
      } catch { setResults([]) }
      setLoading(false)
    }, 400)
    return () => clearTimeout(timeout)
  }, [query])

  const handleAdd = async (fragrance: any) => {
    setAdding(fragrance.id)
    try {
      // Try to enrich with full detail (extra notes from Fragella/RapidAPI).
      // Falls back to search result data gracefully if 404 or network error.
      let full = { ...fragrance }
      try {
        const detailRes = await fetch(`/api/fragrances/${encodeURIComponent(fragrance.id)}`)
        if (detailRes.ok) {
          const detail = await detailRes.json()
          full = { ...full, ...detail }
          // Preserve search-result image if detail has none
          if (!full.image_url) full.image_url = fragrance.image_url
        }
      } catch { /* keep search result data */ }

      // Normalise notes into a { top, middle, base } object — what the API expects.
      const topNotes    = (full.notes?.top    || full.top_notes    || []).map((n: any) => typeof n === 'string' ? n : n.name).filter(Boolean)
      const middleNotes = (full.notes?.middle || full.notes?.heart || full.heart_notes || full.middle_notes || []).map((n: any) => typeof n === 'string' ? n : n.name).filter(Boolean)
      const baseNotes   = (full.notes?.base   || full.base_notes   || []).map((n: any) => typeof n === 'string' ? n : n.name).filter(Boolean)

      const res = await fetch('/api/wardrobe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          fragrance_id:   full.id,
          fragrance_name: full.name,
          brand:          full.brand,
          // Send as structured object — the API's sanitizeStringArray handles each tier.
          notes: { top: topNotes, middle: middleNotes, base: baseNotes },
          accords:   full.accords   || [],
          image_url: full.image_url || null,
        }),
      })

      const data = await res.json()
      if (res.ok) {
        const totalNotes = topNotes.length + middleNotes.length + baseNotes.length
        onAdd(data)
        toast({
          title: 'Added to wardrobe! 🌸',
          description: `${full.name} by ${full.brand}${totalNotes ? ` — ${totalNotes} notes loaded` : ''}`,
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
      <div className="bg-background rounded-2xl shadow-xl w-full max-w-lg max-h-[85vh] flex flex-col border border-border">

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div>
            <h2 className="font-semibold text-base">Add Fragrance 🌸</h2>
            {wardrobe.length > 0 && (
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Blind Buy Risk Score based on your {wardrobe.length} bottle{wardrobe.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-muted rounded-lg">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Search */}
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

          {results.map((frag: any) => {
            const risk    = blindBuyScore(frag, wardrobe)
            const isExp   = expanded === frag.id
            const RiskIcon = risk.icon === 'safe' ? ShieldCheck : risk.icon === 'caution' ? ShieldAlert : ShieldX
            return (
              <div key={frag.id} className="rounded-xl border border-transparent hover:border-border transition-all overflow-hidden">
                <div className="flex items-center gap-3 p-3 hover:bg-muted/40">
                  {/* Bottle image */}
                  <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-border bg-muted/30">
                    {frag.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={frag.image_url}
                        alt={`${frag.name} bottle`}
                        className="w-full h-full object-contain p-1"
                        onError={e => {
                          const t = e.target as HTMLImageElement
                          t.style.display = 'none'
                          t.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center text-xl">🌸</div>'
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xl">🌸</div>
                    )}
                  </div>

                  {/* Name + score pill */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{frag.name}</p>
                    <p className="text-xs text-muted-foreground mb-1.5">{frag.brand}</p>
                    <button
                      onClick={() => setExpanded(isExp ? null : frag.id)}
                      className="flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-semibold transition-all"
                      style={{ background: risk.bg, color: risk.color, border: `1px solid ${risk.color}30` }}
                    >
                      <RiskIcon className="h-3 w-3" />
                      {risk.score}% — {risk.label}
                    </button>
                  </div>

                  {/* Add button */}
                  <Button
                    size="sm"
                    disabled={adding === frag.id}
                    onClick={() => handleAdd(frag)}
                    className="flex-shrink-0 rounded-full px-3"
                    style={{ background: ROSE, color: '#fff' }}
                  >
                    {adding === frag.id
                      ? <Loader2 className="h-3 w-3 animate-spin" />
                      : <><Plus className="h-3 w-3 mr-1" />Add</>
                    }
                  </Button>
                </div>

                {/* Expanded risk explanation */}
                {isExp && (
                  <div
                    className="mx-3 mb-3 px-3 py-2.5 rounded-xl text-[11px] leading-relaxed"
                    style={{ background: risk.bg, color: risk.color, border: `1px solid ${risk.color}25` }}
                  >
                    <p className="font-semibold mb-0.5">🔍 Why this score?</p>
                    <p className="opacity-90">{risk.reason}</p>
                    {(frag.notes?.top?.length > 0 || frag.notes?.middle?.length > 0) && (
                      <div className="flex gap-1 flex-wrap mt-2">
                        {[...(frag.notes?.top || []), ...(frag.notes?.middle || [])].slice(0, 4).map((n: string) => (
                          <span
                            key={n}
                            className="px-1.5 py-0.5 rounded-full text-[10px]"
                            style={{ background: ROSE_LIGHT, color: ROSE_TEXT }}
                          >
                            {n}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
