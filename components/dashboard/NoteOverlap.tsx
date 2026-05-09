'use client'
import { useMemo } from 'react'

const ROSE = 'hsl(340 55% 62%)'
const ROSE_LIGHT = 'hsl(340 45% 92%)'

export default function NoteOverlap({ items }: { items: any[] }) {
  const { shared, uniqueA, uniqueB, a, b } = useMemo(() => {
    if (items.length < 2) return { shared: [], uniqueA: [], uniqueB: [], a: null, b: null }
    const a = items[0]
    const b = items[1]
    const notesA = new Set((a.notes || []).map((n: string) => n.toLowerCase()))
    const notesB = new Set((b.notes || []).map((n: string) => n.toLowerCase()))
    const shared = [...notesA].filter(n => notesB.has(n)) as string[]
    const uniqueA = [...notesA].filter(n => !notesB.has(n)) as string[]
    const uniqueB = [...notesB].filter(n => !notesA.has(n)) as string[]
    return { shared, uniqueA, uniqueB, a, b }
  }, [items])

  if (items.length < 2) return (
    <div className="text-center py-8 text-muted-foreground text-sm">Select exactly 2 fragrances to see note overlap.</div>
  )

  const compatibility = shared.length === 0 ? 'Contrasting'
    : shared.length < 3 ? 'Complementary'
    : shared.length < 6 ? 'Harmonious'
    : 'Very Similar'

  const compatColor = shared.length === 0 ? '#fb923c'
    : shared.length < 3 ? '#fcd34d'
    : shared.length < 6 ? '#6ee7b7'
    : '#f9a8d4'

  return (
    <div className="space-y-4">
      {/* Compatibility badge */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold">Stack Compatibility:</span>
        <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: compatColor + '33', color: compatColor === '#fcd34d' ? '#92400e' : compatColor }}>
          {compatibility}
        </span>
        <span className="text-xs text-muted-foreground">{shared.length} shared note{shared.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Venn-style layout */}
      <div className="grid grid-cols-3 gap-2">
        {/* Unique A */}
        <div className="rounded-xl p-3" style={{ background: ROSE_LIGHT }}>
          <p className="text-[10px] font-bold uppercase tracking-wide mb-2" style={{ color: ROSE }}>{a?.fragrance_name?.split(' ').slice(0,2).join(' ')} only</p>
          <div className="space-y-1">
            {uniqueA.slice(0, 5).map(n => (
              <p key={n} className="text-[11px] capitalize text-muted-foreground">{n}</p>
            ))}
            {uniqueA.length > 5 && <p className="text-[10px] text-muted-foreground">+{uniqueA.length - 5} more</p>}
          </div>
        </div>

        {/* Shared */}
        <div className="rounded-xl p-3 bg-muted text-center">
          <p className="text-[10px] font-bold uppercase tracking-wide mb-2 text-muted-foreground">Both</p>
          {shared.length === 0 ? (
            <p className="text-[11px] text-muted-foreground italic">No overlap</p>
          ) : (
            <div className="space-y-1">
              {shared.slice(0, 5).map(n => (
                <p key={n} className="text-[11px] capitalize font-medium">{n}</p>
              ))}
              {shared.length > 5 && <p className="text-[10px] text-muted-foreground">+{shared.length - 5} more</p>}
            </div>
          )}
        </div>

        {/* Unique B */}
        <div className="rounded-xl p-3" style={{ background: 'hsl(270 45% 92%)' }}>
          <p className="text-[10px] font-bold uppercase tracking-wide mb-2" style={{ color: 'hsl(270 55% 55%)' }}>{b?.fragrance_name?.split(' ').slice(0,2).join(' ')} only</p>
          <div className="space-y-1">
            {uniqueB.slice(0, 5).map(n => (
              <p key={n} className="text-[11px] capitalize text-muted-foreground">{n}</p>
            ))}
            {uniqueB.length > 5 && <p className="text-[10px] text-muted-foreground">+{uniqueB.length - 5} more</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
