'use client'
import { useState } from 'react'
import { Layers, Plus, Minus, Sparkles } from 'lucide-react'

const GOLD = 'hsl(42 85% 68%)'
const GOLD_BG = 'hsl(42 85% 68% / 0.10)'
const GOLD_BORDER = 'hsl(42 85% 68% / 0.25)'

function compatibilityScore(a: any, b: any): number {
  const notesA = new Set([...(a.notes || []), ...(a.accords || [])].map((n: string) => n.toLowerCase()))
  const notesB = new Set([...(b.notes || []), ...(b.accords || [])].map((n: string) => n.toLowerCase()))
  const shared = [...notesA].filter(n => notesB.has(n)).length
  const total = new Set([...notesA, ...notesB]).size
  const base = total > 0 ? Math.round((shared / total) * 60) : 0
  return Math.min(98, base + 55 + Math.floor(Math.random() * 10))
}

export default function StackSuggestions({ wardrobe }: { wardrobe: any[] }) {
  const [expanded, setExpanded] = useState<string | null>(null)

  if (wardrobe.length < 2) {
    return (
      <div className="text-center py-20 border border-dashed border-border rounded-2xl">
        <Layers className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
        <p className="text-sm font-medium mb-2">Add at least 2 fragrances</p>
        <p className="text-xs text-muted-foreground">Stack suggestions appear once your wardrobe has 2+ bottles.</p>
      </div>
    )
  }

  const pairs: { a: any; b: any; score: number; key: string }[] = []
  for (let i = 0; i < wardrobe.length; i++) {
    for (let j = i + 1; j < wardrobe.length; j++) {
      pairs.push({
        a: wardrobe[i],
        b: wardrobe[j],
        score: compatibilityScore(wardrobe[i], wardrobe[j]),
        key: `${wardrobe[i].id}-${wardrobe[j].id}`,
      })
    }
  }
  pairs.sort((a, b) => b.score - a.score)

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-1">Stack Suggestions</h2>
        <p className="text-sm text-muted-foreground">Ranked pairings from your wardrobe by note compatibility.</p>
      </div>
      <div className="space-y-3">
        {pairs.slice(0, 10).map(({ a, b, score, key }) => {
          const scoreColor = score >= 88 ? 'hsl(142 70% 55%)' : score >= 75 ? GOLD : 'hsl(30 80% 60%)'
          const isOpen = expanded === key
          return (
            <div key={key} className="rounded-2xl border border-border overflow-hidden" style={isOpen ? { borderColor: GOLD_BORDER } : {}}>
              <button className="w-full text-left p-5 flex items-center justify-between gap-4" onClick={() => setExpanded(isOpen ? null : key)}>
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex flex-col gap-1 min-w-0">
                    <span className="text-sm font-medium truncate">{a.fragrance_name}</span>
                    <span className="text-xs text-muted-foreground truncate">{a.brand}</span>
                  </div>
                  <span className="text-xs font-mono shrink-0" style={{ color: GOLD }}>+</span>
                  <div className="flex flex-col gap-1 min-w-0">
                    <span className="text-sm font-medium truncate">{b.fragrance_name}</span>
                    <span className="text-xs text-muted-foreground truncate">{b.brand}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <p className="text-xl font-light" style={{ color: scoreColor }}>{score}<span className="text-xs">%</span></p>
                    <p className="text-[10px] text-muted-foreground font-mono">MATCH</p>
                  </div>
                  {isOpen ? <Minus size={12} style={{ color: GOLD }} /> : <Plus size={12} className="text-muted-foreground" />}
                </div>
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-0 border-t border-border space-y-3">
                  <div className="w-full rounded-full h-1.5 bg-muted overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${score}%`, background: `linear-gradient(90deg, ${scoreColor}88, ${scoreColor})` }} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[a, b].map((item, i) => (
                      <div key={item.id} className="rounded-xl p-3" style={{ background: GOLD_BG, border: `1px solid ${GOLD_BORDER}` }}>
                        <p className="text-[10px] font-mono text-muted-foreground mb-1">LAYER {i + 1}</p>
                        <p className="text-xs font-semibold">{item.fragrance_name}</p>
                        {item.accords?.length > 0 && (
                          <p className="text-[10px] text-muted-foreground mt-1">{item.accords.slice(0, 3).join(' · ')}</p>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Apply <strong>{a.fragrance_name}</strong> first to pulse points, wait 3 minutes, then layer <strong>{b.fragrance_name}</strong> on the chest and neck for maximum depth.
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
