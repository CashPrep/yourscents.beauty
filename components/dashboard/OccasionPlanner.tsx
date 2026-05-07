'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2, Sparkles, Star } from 'lucide-react'

const OCCASIONS = [
  { key: 'date_night', label: 'Date Night', emoji: '🌹' },
  { key: 'office', label: 'Office', emoji: '💼' },
  { key: 'summer_day', label: 'Summer Day', emoji: '☀️' },
  { key: 'winter_evening', label: 'Winter Evening', emoji: '❄️' },
  { key: 'wedding', label: 'Wedding', emoji: '💍' },
  { key: 'casual_weekend', label: 'Casual Weekend', emoji: '😎' },
  { key: 'gym_sport', label: 'Gym / Sport', emoji: '🏋️' },
  { key: 'night_out', label: 'Night Out', emoji: '🌙' },
]

export default function OccasionPlanner({ wardrobe }: { wardrobe: any[] }) {
  const [selected, setSelected] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any | null>(null)

  const handleBuild = async () => {
    if (!selected) return
    setLoading(true)
    setResult(null)
    const res = await fetch('/api/stack/occasion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ occasion: selected }),
    })
    const data = await res.json()
    setResult(data)
    setLoading(false)
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-1">Occasion Planner</h2>
        <p className="text-muted-foreground text-sm">Choose an occasion and ScentStack will build the perfect stack from your wardrobe.</p>
      </div>

      {wardrobe.length < 2 && (
        <div className="p-4 bg-accent rounded-2xl mb-6 text-sm text-accent-foreground">
          ⚠️ Add at least 2 fragrances to your wardrobe to use the Occasion Planner.
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {OCCASIONS.map(o => (
          <button
            key={o.key}
            onClick={() => setSelected(o.key)}
            className={`p-4 rounded-2xl border text-left transition-all ${
              selected === o.key ? 'border-primary bg-accent shadow-sm' : 'bg-white hover:border-primary/40'
            }`}
          >
            <div className="text-2xl mb-1">{o.emoji}</div>
            <p className="text-sm font-medium">{o.label}</p>
          </button>
        ))}
      </div>

      <Button onClick={handleBuild} disabled={!selected || loading || wardrobe.length < 2} className="gap-2">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
        Build My Stack
      </Button>

      {result && (
        <div className="mt-8 bg-white rounded-2xl border p-6">
          <div className="flex items-center gap-2 mb-2">
            <Star className="h-5 w-5 text-primary fill-primary" />
            <h3 className="font-bold text-lg">{result.analysis?.stackName}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              result.confidence === 'high' ? 'bg-green-100 text-green-700' :
              result.confidence === 'medium' ? 'bg-yellow-100 text-yellow-700' :
              'bg-orange-100 text-orange-700'
            }`}>{result.confidence} confidence</span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Built for: <strong>{result.occasionName}</strong></p>

          <div className="mb-4">
            <p className="text-sm font-semibold mb-2">Your Stack:</p>
            <div className="flex flex-wrap gap-2">
              {result.stack?.map((item: any, i: number) => (
                <div key={item.id} className="flex items-center gap-2 bg-accent rounded-xl px-3 py-2">
                  <span className="text-xs text-muted-foreground font-mono">{i + 1}</span>
                  <div>
                    <p className="text-sm font-medium">{item.fragrance_name}</p>
                    <p className="text-xs text-muted-foreground">{item.brand}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {result.analysis?.layeringAdvice?.length > 0 && (
            <div>
              <p className="text-sm font-semibold mb-2">How to Apply:</p>
              <ol className="space-y-1">
                {result.analysis.layeringAdvice.map((advice: string, i: number) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-primary font-medium">{i + 1}.</span>
                    {advice}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
