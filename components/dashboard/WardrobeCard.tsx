'use client'
import { useState } from 'react'
import { Trash2, Star, BookOpen, Share2 } from 'lucide-react'
import RatingModal from './RatingModal'
import ShopLinks from './ShopLinks'

const ROSE       = 'hsl(340 55% 62%)'
const ROSE_LIGHT = 'hsl(340 45% 92%)'
const ROSE_TEXT  = 'hsl(340 55% 48%)'

function flatNotes(notes: string[] | { top?: string[]; middle?: string[]; base?: string[] } | undefined): string[] {
  if (!notes) return []
  if (Array.isArray(notes)) return notes
  return [...(notes.top || []), ...(notes.middle || []), ...(notes.base || [])]
}

interface WardrobeItem {
  id: string
  fragrance_name: string
  brand: string
  rating?: number
  personal_note?: string
  accords?: string[]
  notes?: string[] | { top?: string[]; middle?: string[]; base?: string[] }
  image_url?: string | null
}

interface Props {
  item: WardrobeItem
  onRemove: (id: string) => void
  onRatingUpdate?: (id: string, rating: number, note: string) => void
}

export default function WardrobeCard({ item, onRemove, onRatingUpdate }: Props) {
  const [showRating, setShowRating] = useState(false)
  const [showNote,   setShowNote]   = useState(false)
  const [localRating, setLocalRating] = useState<number>(item.rating || 0)
  const [localNote,   setLocalNote]   = useState<string>(item.personal_note || '')
  const [cardCopied,  setCardCopied]  = useState(false)

  const handleRatingSaved = (id: string, rating: number, note: string) => {
    setLocalRating(rating)
    setLocalNote(note)
    onRatingUpdate?.(id, rating, note)
  }

  const handleShareCard = () => {
    const stars    = localRating ? '★'.repeat(localRating) + '☆'.repeat(5 - localRating) : ''
    const accords  = (item.accords || []).slice(0, 3).join(', ')
    const text =
      `🌸 ${item.fragrance_name} by ${item.brand}` +
      (localRating ? `\nMy rating: ${stars}` : '') +
      (localNote   ? `\n"${localNote}"` : '') +
      (accords     ? `\nAccords: ${accords}` : '') +
      `\n\nSee my full wardrobe on Your Scents ✨`
    navigator.clipboard.writeText(text)
    setCardCopied(true)
    setTimeout(() => setCardCopied(false), 2500)
  }

  const noteList = flatNotes(item.notes)

  return (
    <>
      <div className="bg-card rounded-2xl border border-border p-4 hover:shadow-md transition-shadow flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <div className="w-16 h-16 rounded-xl overflow-hidden border border-border bg-muted/30 flex-shrink-0">
            {item.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.image_url}
                alt={`${item.fragrance_name} bottle`}
                className="w-full h-full object-contain p-1"
                onError={(e) => {
                  const t = e.target as HTMLImageElement
                  t.style.display = 'none'
                  t.parentElement!.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:1.5rem">🌸</div>'
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl">🌸</div>
            )}
          </div>
          <button onClick={() => onRemove(item.id)} className="p-1.5 hover:bg-muted rounded-lg transition-colors">
            <Trash2 className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        <div>
          <p className="font-semibold text-sm serif leading-tight">{item.fragrance_name}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{item.brand}</p>
        </div>

        <div className="flex gap-0.5">
          {[1,2,3,4,5].map(i => (
            <Star
              key={i}
              className="h-3.5 w-3.5"
              style={{
                fill:   i <= localRating ? ROSE : 'transparent',
                stroke: i <= localRating ? ROSE : 'hsl(var(--muted-foreground))',
              }}
            />
          ))}
        </div>

        {localNote && (
          <p className="text-[11px] text-muted-foreground italic leading-relaxed line-clamp-2">&ldquo;{localNote}&rdquo;</p>
        )}

        {item.accords && item.accords.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {item.accords.slice(0, 3).map((accord: string) => (
              <span key={accord} className="text-[10px] px-2 py-0.5 rounded-full capitalize" style={{ background: ROSE_LIGHT, color: ROSE_TEXT }}>{accord}</span>
            ))}
          </div>
        )}

        {noteList.length > 0 && (
          <p className="text-[11px] text-muted-foreground leading-relaxed">{noteList.slice(0, 5).join(' · ')}</p>
        )}

        {/* ── Action row ── */}
        <div className="flex gap-2 mt-1 flex-wrap items-center">
          <button
            onClick={() => setShowRating(true)}
            className="flex items-center gap-1 text-[11px] font-medium px-2.5 py-1.5 rounded-full"
            style={{ background: ROSE_LIGHT, color: ROSE_TEXT }}
          >
            <Star className="h-3 w-3" /> Rate
          </button>

          {localNote && (
            <button
              onClick={() => setShowNote(v => !v)}
              className="flex items-center gap-1 text-[11px] font-medium px-2.5 py-1.5 rounded-full bg-muted text-muted-foreground"
            >
              <BookOpen className="h-3 w-3" /> Note
            </button>
          )}

          <button
            onClick={handleShareCard}
            className="flex items-center gap-1 text-[11px] font-medium px-2.5 py-1.5 rounded-full"
            style={{ background: cardCopied ? 'hsl(140 45% 90%)' : ROSE_LIGHT, color: cardCopied ? 'hsl(140 45% 35%)' : ROSE_TEXT }}
          >
            <Share2 className="h-3 w-3" />
            {cardCopied ? 'Copied! 🌸' : 'Share'}
          </button>

          {/* ── Affiliate Shop Button (compact dropdown) ── */}
          <div className="ml-auto">
            <ShopLinks fragranceName={item.fragrance_name} brand={item.brand} variant="compact" />
          </div>
        </div>

        {showNote && localNote && (
          <p className="text-[11px] text-muted-foreground italic leading-relaxed border-t border-border pt-2">&ldquo;{localNote}&rdquo;</p>
        )}
      </div>

      {showRating && (
        <RatingModal
          item={{ ...item, rating: localRating, personal_note: localNote }}
          onClose={() => setShowRating(false)}
          onSaved={handleRatingSaved}
        />
      )}
    </>
  )
}
