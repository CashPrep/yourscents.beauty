'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2, Sparkles, Check } from 'lucide-react'

interface Props {
  wardrobe: any[]
  userId: string
}

export default function StackBuilder({ wardrobe, userId }: Props) {
  const [selected, setSelected] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any | null>(null)

  const toggle = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-2">Stack Builder</h1>
        <p className="text-muted-foreground mb-8">Select 2–4 fragrances from your wardrobe to analyze as a stack.</p>

        {wardrobe.length === 0 ? (
          <p className="text-muted-foreground text-center py-20">Your wardrobe is empty. Add fragrances from the dashboard.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {wardrobe.map(item => (
              <button
                key={item.id}
                onClick={() => toggle(item.id)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  selected.includes(item.id) ? 'border-primary bg-accent shadow-sm' : 'bg-white hover:border-primary/40'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-sm">{item.fragrance_name}</p>
                    <p className="text-xs text-muted-foreground">{item.brand}</p>
                  </div>
                  {selected.includes(item.id) && (
                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                {item.accords?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.accords.slice(0, 3).map((a: string) => (
                      <span key={a} className="text-xs bg-muted px-1.5 py-0.5 rounded-full capitalize">{a}</span>
                    ))}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        <Button onClick={handleAnalyze} disabled={selected.length < 2 || loading} className="gap-2 mb-8">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          Analyze Stack ({selected.length} selected)
        </Button>

        {result && (
          <div className="bg-white rounded-2xl border p-6 space-y-6">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold">{result.stackName}</h2>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                result.confidence === 'high' ? 'bg-green-100 text-green-700' :
                result.confidence === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-orange-100 text-orange-700'
              }`}>{result.confidence} confidence</span>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-sm">Best Occasions</h3>
              <div className="grid grid-cols-2 gap-2">
                {result.occasionFit?.map((o: any) => (
                  <div key={o.occasion} className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                    <span className="text-sm">{o.occasion}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-muted rounded-full h-1.5">
                        <div className="bg-primary h-1.5 rounded-full" style={{ width: `${o.score}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground w-8">{o.score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-sm">Note Profile</h3>
              <div className="flex flex-wrap gap-2">
                {result.noteBreakdown?.map((n: any) => (
                  <div key={n.family} className="bg-accent rounded-xl px-3 py-2">
                    <p className="text-xs font-medium text-accent-foreground capitalize">{n.family}</p>
                    <p className="text-xs text-muted-foreground">{n.notes.slice(0, 3).join(', ')}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-sm">Application Order</h3>
              <ol className="space-y-2">
                {result.applicationOrder?.map((name: string, i: number) => (
                  <li key={name} className="flex items-center gap-3 text-sm">
                    <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
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
                    <span className="text-primary">→</span>{tip}
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
