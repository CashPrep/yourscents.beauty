'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2, Sparkles, Check, FlaskConical } from 'lucide-react'
import NoteOverlap from './NoteOverlap'

const ROSE = 'hsl(340 55% 62%)'
const ROSE_LIGHT = 'hsl(340 45% 92%)'

interface Props {
  wardrobe: any[]
  userId: string
}

export default function StackBuilder({ wardrobe, userId }: Props) {
  const [selected, setSelected] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any | null>(null)

  const toggle = (id: string) => {
    setSelected(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : prev.length < 4 ? [...prev, id] : prev
    )
  }

  const handleAnalyze = async () => {
    if (selected.length < 2) return
    setLoading(true)
    const res = await fetch('/api/stack/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fragranceIds: selected }),
    })
    const data = await res.json()
    setResult(data)
    setLoading(false)
  }

  const selectedItems = wardrobe.filter(w => selected.includes(w.id))

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold serif mb-1">Stack Builder 🌸</h1>
        <p className="text-muted-foreground text-sm mb-8">Select 2–4 fragrances to analyze as a layering stack.</p>

        {wardrobe.length === 0 ? (
          <p className="text-muted-foreground text-center py-20">Your wardrobe is empty. Add fragrances from the dashboard.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {wardrobe.map(item => (
              <button
                key={item.id}
                onClick={() => toggle(item.id)}
                disabled={!selected.includes(item.id) && selected.length >= 4}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  selected.includes(item.id) ? 'shadow-sm' : 'bg-card hover:border-primary/40'
                } disabled:opacity-40`}
                style={selected.includes(item.id) ? { borderColor: ROSE, background: ROSE_LIGHT } : {}}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    {item.image_url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.image_url} alt={item.fragrance_name} className="w-10 h-10 object-contain flex-shrink-0 rounded-lg" />
                    )}
                    <div>
                      <p className="font-semibold text-sm serif">{item.fragrance_name}</p>
                      <p className="text-xs text-muted-foreground">{item.brand}</p>
                    </div>
                  </div>
                  {selected.includes(item.id) && (
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: ROSE }}>
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                {item.accords?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.accords.slice(0, 3).map((a: string) => (
                      <span key={a} className="text-[10px] px-1.5 py-0.5 rounded-full capitalize bg-muted text-muted-foreground">{a}</span>
                    ))}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Note Overlap — show when exactly 2 selected */}
        {selected.length === 2 && (
          <div className="bg-card border border-border rounded-2xl p-5 mb-6">
            <h3 className="font-semibold serif text-sm mb-3">🔬 Note Overlap Analysis</h3>
            <NoteOverlap items={selectedItems} />
          </div>
        )}

        <Button
          onClick={handleAnalyze}
          disabled={selected.length < 2 || loading}
          className="gap-2 mb-8 rounded-full px-6"
          style={{ background: ROSE, color: '#fff' }}
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          Analyze Stack ({selected.length} selected)
        </Button>

        {result && (
          <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-xl font-bold serif">{result.stackName}</h2>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                result.confidence === 'high' ? 'bg-green-100 text-green-700' :
                result.confidence === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-orange-100 text-orange-700'
              }`}>{result.confidence} confidence</span>
            </div>

            {/* ── Stack Reasoning ─────────────────────────────────────── */}
            {result.stackReasoning && (
              <div
                className="flex gap-3 rounded-xl p-4"
                style={{ background: ROSE_LIGHT, borderLeft: `3px solid ${ROSE}` }}
              >
                <FlaskConical className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: ROSE }} />
                <p className="text-sm leading-relaxed" style={{ color: 'hsl(340 40% 30%)' }}>
                  {result.stackReasoning}
                </p>
              </div>
            )}

            <div>
              <h3 className="font-semibold mb-3 text-sm">Best Occasions</h3>
              <div className="grid grid-cols-2 gap-2">
                {result.occasionFit?.map((o: any) => (
                  <div key={o.occasion} className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                    <span className="text-sm">{o.occasion}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-muted rounded-full h-1.5">
                        <div className="h-1.5 rounded-full" style={{ width: `${o.score}%`, background: ROSE }} />
                      </div>
                      <span className="text-xs text-muted-foreground w-8">{o.score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-sm">Application Order</h3>
              <ol className="space-y-2">
                {result.applicationOrder?.map((name: string, i: number) => (
                  <li key={name} className="flex items-center gap-3 text-sm">
                    <span className="w-6 h-6 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: ROSE }}>{i + 1}</span>
                    {name}
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-sm">Layering Tips</h3>
              <ul className="space-y-2">
                {result.layeringAdvice?.map((tip: string, i: number) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-2">
                    <span style={{ color: ROSE }}>→</span>{tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
