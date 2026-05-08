'use client'
import { Trash2 } from 'lucide-react'

const ROSE = 'hsl(340 55% 62%)'
const ROSE_LIGHT = 'hsl(340 45% 92%)'
const ROSE_TEXT = 'hsl(340 55% 48%)'

interface Props {
  item: any
  onRemove: (id: string) => void
}

export default function WardrobeCard({ item, onRemove }: Props) {
  return (
    <div className="bg-card rounded-2xl border border-border p-4 hover:shadow-md transition-shadow flex flex-col gap-3">
      {/* Image + remove */}
      <div className="flex items-start justify-between">
        <div className="w-16 h-16 rounded-xl overflow-hidden border border-border bg-muted/30 flex-shrink-0">
          {item.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.image_url}
              alt={`${item.fragrance_name} bottle`}
              className="w-full h-full object-contain p-1"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                target.parentElement!.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:1.5rem">🌸</div>'
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl">🌸</div>
          )}
        </div>
        <button
          onClick={() => onRemove(item.id)}
          className="p-1.5 hover:bg-muted rounded-lg transition-colors"
        >
          <Trash2 className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      {/* Name & brand */}
      <div>
        <p className="font-semibold text-sm serif leading-tight">{item.fragrance_name}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{item.brand}</p>
      </div>

      {/* Accords */}
      {item.accords?.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {item.accords.slice(0, 3).map((accord: string) => (
            <span
              key={accord}
              className="text-[10px] px-2 py-0.5 rounded-full capitalize"
              style={{ background: ROSE_LIGHT, color: ROSE_TEXT }}
            >
              {accord}
            </span>
          ))}
        </div>
      )}

      {/* Notes */}
      {item.notes?.length > 0 && (
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          {item.notes.slice(0, 5).join(' · ')}
        </p>
      )}
    </div>
  )
}
