'use client'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'

interface Props {
  item: any
  onRemove: (id: string) => void
}

export default function WardrobeCard({ item, onRemove }: Props) {
  return (
    <div className="bg-white rounded-2xl border p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        {item.image_url ? (
          <Image src={item.image_url} alt={item.fragrance_name} width={56} height={56} className="rounded-xl object-cover" />
        ) : (
          <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center text-2xl">🌸</div>
        )}
        <button onClick={() => onRemove(item.id)} className="p-1.5 hover:bg-muted rounded-lg transition-colors">
          <Trash2 className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
      <p className="font-semibold text-sm">{item.fragrance_name}</p>
      <p className="text-xs text-muted-foreground mb-3">{item.brand}</p>
      {item.accords?.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {item.accords.slice(0, 3).map((accord: string) => (
            <span key={accord} className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full capitalize">{accord}</span>
          ))}
        </div>
      )}
      {item.notes?.length > 0 && (
        <p className="text-xs text-muted-foreground mt-2 truncate">{item.notes.slice(0, 4).join(' · ')}</p>
      )}
    </div>
  )
}
