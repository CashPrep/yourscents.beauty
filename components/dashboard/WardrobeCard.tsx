'use client'
import { useState } from 'react'
import { Trash2, Star, ShoppingBag, BookOpen } from 'lucide-react'
import RatingModal from './RatingModal'

const ROSE       = 'hsl(340 55% 62%)'
const ROSE_LIGHT = 'hsl(340 45% 92%)'
const ROSE_TEXT  = 'hsl(340 55% 48%)'

function buildBuyLink(name: string, brand: string): string {
  const q = encodeURIComponent(`${brand} ${name}`)
  return `https://www.fragrancenet.com/search#q=${q}`
}

// notes can be a flat string[] (legacy rows) or the structured object added in Step 15.
function flatNotes(notes: string[] | { top?: string[]; middle?: string[]; base?: string[] } | undefined): string[] {
  if (!notes) return []
  if (Array.isArray(notes)) return notes
  return [
    ...(notes.top    || []),
    ...(notes.middle || []),
    ...(notes.base   || []),
  ]
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

  const handleRatingSaved = (id: string, rating: number, note: string) => {
    setLocalRating(rating)
    setLocalNote(note)
    onRatingUpdate?.(id, rating, note)
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
                color:  ROSE,
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

        <div className="flex gap-2 mt-1">
          <button
            onClick={() => setShowRating(true)}
            className="flex items-center gap-1 text-[11px] font-medium px-2.5 py-1.5 rounded-full transition-colors"
            style={{ background: ROSE_LIGHT, color: ROSE_TEXT }}
          >
            <Star className="h-3 w-3" /> Rate
          </button>
          {localNote && (
            <button
              onClick={() => setShowNote(v => !v)}
              className="flex items-center gap-1 text-[11px] font-medium px-2.5 py-1.5 rounded-full transition-colors bg-muted text-muted-foreground"
            >
              <BookOpen className="h-3 w-3" /> Note
            </button>
          )}
          <a
            href={buildBuyLink(item.fragrance_name, item.brand)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] font-medium px-2.5 py-1.5 rounded-full transition-colors bg-muted text-muted-foreground hover:bg-muted/70 ml-auto"
          >
            <ShoppingBag className="h-3 w-3" /> Shop
          </a>
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
