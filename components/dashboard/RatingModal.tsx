'use client'
import { useState } from 'react'
import { X, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toaster'

const ROSE = 'hsl(340 55% 62%)'

interface Props {
  item: any
  onClose: () => void
  onSaved: (id: string, rating: number, note: string) => void
}

export default function RatingModal({ item, onClose, onSaved }: Props) {
  const { toast } = useToast()
  const [rating, setRating] = useState<number>(item.rating || 0)
  const [hover, setHover] = useState<number>(0)
  const [note, setNote] = useState<string>(item.personal_note || '')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    const res = await fetch('/api/wardrobe/rate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: item.id, rating, personal_note: note }),
    })
    if (res.ok) {
      onSaved(item.id, rating, note)
      toast({ title: 'Saved! ✨', description: `${item.fragrance_name} rated ${rating}⭐` })
      onClose()
    }
    setSaving(false)
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl shadow-xl w-full max-w-sm p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="font-bold serif text-base">Rate {item.fragrance_name}</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-muted rounded-lg"><X className="h-4 w-4" /></button>
        </div>

        {/* Star rating */}
        <div>
          <p className="text-xs text-muted-foreground mb-2">Your Rating</p>
          <div className="flex gap-1">
            {[1,2,3,4,5].map(i => (
              <button
                key={i}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setRating(i)}
              >
                <Star
                  className="h-7 w-7 transition-colors"
                  style={{
                    fill: i <= (hover || rating) ? ROSE : 'transparent',
                    stroke: i <= (hover || rating) ? ROSE : 'currentColor',
                    color: i <= (hover || rating) ? ROSE : 'hsl(var(--muted-foreground))',
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Personal note */}
        <div>
          <p className="text-xs text-muted-foreground mb-2">Personal Note (optional)</p>
          <textarea
            className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 h-24"
            style={{ '--tw-ring-color': ROSE } as any}
            placeholder="e.g. Wore this to prom 💕 — best night ever"
            value={note}
            onChange={e => setNote(e.target.value)}
            maxLength={280}
          />
          <p className="text-[10px] text-muted-foreground text-right mt-1">{note.length}/280</p>
        </div>

        <Button
          className="w-full rounded-full font-semibold"
          style={{ background: ROSE, color: '#fff' }}
          disabled={saving || rating === 0}
          onClick={handleSave}
        >
          {saving ? 'Saving...' : 'Save Rating ✨'}
        </Button>
      </div>
    </div>
  )
}
