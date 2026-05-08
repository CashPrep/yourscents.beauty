'use client'
import { useState } from 'react'
import { Sparkles, RefreshCw } from 'lucide-react'

const GOLD = 'hsl(42 85% 68%)'
const GOLD_BG = 'hsl(42 85% 68% / 0.10)'
const GOLD_BORDER = 'hsl(42 85% 68% / 0.25)'

const MOODS = [
  { key: 'confident',   label: 'Confident',    emoji: '💪', desc: 'Bold, assertive, powerful',         accords: ['woody','spicy','leather','smoky'] },
  { key: 'romantic',    label: 'Romantic',      emoji: '🌹', desc: 'Soft, warm, intimate',              accords: ['floral','rose','musky','sweet'] },
  { key: 'focused',     label: 'Focused',       emoji: '🧠', desc: 'Clean, sharp, professional',       accords: ['fresh','aromatic','citrus','aquatic'] },
  { key: 'mysterious',  label: 'Mysterious',    emoji: '🌑', desc: 'Dark, smoky, intriguing',          accords: ['oud','amber','incense','resinous'] },
  { key: 'energised',   label: 'Energised',     emoji: '⚡', desc: 'Bright, uplifting, sporty',        accords: ['citrus','fresh','green','aquatic'] },
  { key: 'cosy',        label: 'Cosy',          emoji: '🕯️', desc: 'Warm, comforting, nostalgic',     accords: ['vanilla','gourmand','sweet','warm spicy'] },
  { key: 'adventurous', label: 'Adventurous',   emoji: '🌿', desc: 'Earthy, natural, free',            accords: ['green','woody','earthy','herbal'] },
  { key: 'luxurious',   label: 'Luxurious',     emoji: '✨', desc: 'Rich, opulent, refined',           accords: ['oud','rose','iris','powdery'] },
  { key: 'chill',       label: 'Chill',         emoji: '🌊', desc: 'Relaxed, cool, effortless',        accords: ['aquatic','fresh','musky','soft'] },
  { key: 'playful',     label: 'Playful',       emoji: '🎉', desc: 'Fun, fruity, lighthearted',        accords: ['fruity','sweet','floral','citrus'] },
]

const INTENSITY = [
  { key: 'subtle',  label: 'Subtle',  desc: '1–2 sprays, close to skin' },
  { key: 'moderate',label: 'Moderate',desc: '3–4 sprays, noticeable' },
  { key: 'bold',    label: 'Bold',    desc: '5+ sprays, projects far' },
]

function scoreForMood(item: any, moodAccords: string[]): number {
  const itemAccords = [...(item.accords || []), ...(item.notes || [])].map((a: string) => a.toLowerCase())
  const hits = moodAccords.filter(ma => itemAccords.some(ia => ia.includes(ma) || ma.includes(ia))).length
  return hits
}

export default function MoodMatcher({ wardrobe }: { wardrobe: any[] }) {
  const [mood, setMood] = useState<string | null>(null)
  const [intensity, setIntensity] = useState<string>('moderate')
  const [result, setResult] = useState<any[] | null>(null)
  const [loading, setLoading] = useState(false)

  const selectedMood = MOODS.find(m => m.key === mood)

  const handleMatch = () => {
    if (!mood || wardrobe.length === 0) return
    setLoading(true)
    setTimeout(() => {
      const scored = wardrobe
        .map((item: any) => ({ item, score: scoreForMood(item, selectedMood!.accords) }))
        .sort((a, b) => b.score - a.score)
      setResult(scored.slice(0, 3).map(s => s.item))
      setLoading(false)
    }, 600)
  }

  const handleReset = () => {
    setMood(null)
    setResult(null)
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-1">Mood Matcher <span className="text-xs font-normal px-2 py-0.5 rounded-full ml-1" style={{ background: GOLD_BG, color: GOLD, border: `1px solid ${GOLD_BORDER}` }}>NEW</span></h2>
        <p className="text-sm text-muted-foreground">How are you feeling right now? We&apos;ll pick the perfect scent from your wardrobe.</p>
      </div>

      {wardrobe.length === 0 && (
        <div className="text-center py-12 border border-dashed border-border rounded-2xl">
          <p className="text-sm text-muted-foreground">Add fragrances to your wardrobe to use Mood Matcher.</p>
        </div>
      )}

      {wardrobe.length > 0 && !result && (
        <div className="space-y-6">
          {/* Mood grid */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Pick your mood</p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {MOODS.map(m => (
                <button
                  key={m.key}
                  onClick={() => setMood(m.key)}
                  className="p-3 rounded-xl border text-left transition-all"
                  style={
                    mood === m.key
                      ? { background: GOLD_BG, borderColor: GOLD, color: GOLD }
                      : { background: 'hsl(220 16% 8%)', borderColor: 'hsl(220 14% 14%)', color: 'hsl(220 10% 70%)' }
                  }
                >
                  <div className="text-xl mb-1">{m.emoji}</div>
                  <p className="text-xs font-semibold">{m.label}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{m.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Intensity */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">How strong?</p>
            <div className="flex gap-2">
              {INTENSITY.map(i => (
                <button
                  key={i.key}
                  onClick={() => setIntensity(i.key)}
                  className="flex-1 p-3 rounded-xl border text-left transition-all"
                  style={
                    intensity === i.key
                      ? { background: GOLD_BG, borderColor: GOLD }
                      : { background: 'hsl(220 16% 8%)', borderColor: 'hsl(220 14% 14%)' }
                  }
                >
                  <p className="text-xs font-semibold" style={intensity === i.key ? { color: GOLD } : {}}>{i.label}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{i.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleMatch}
            disabled={!mood || loading}
            className="w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-opacity disabled:opacity-40"
            style={{ background: GOLD, color: 'hsl(220 18% 6%)' }}
          >
            {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {loading ? 'Matching...' : 'Find My Scent'}
          </button>
        </div>
      )}

      {result && selectedMood && (
        <div className="space-y-5">
          <div className="rounded-2xl p-5" style={{ background: GOLD_BG, border: `1px solid ${GOLD_BORDER}` }}>
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-semibold" style={{ color: GOLD }}>{selectedMood.emoji} {selectedMood.label} mood</p>
              <button onClick={handleReset} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                <RefreshCw size={10} /> Try again
              </button>
            </div>
            <p className="text-xs text-muted-foreground">Best matches from your wardrobe for a <strong>{INTENSITY.find(i => i.key === intensity)?.label.toLowerCase()}</strong> application:</p>
          </div>

          {result.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">No strong matches found — try expanding your wardrobe with scents in the <strong>{selectedMood.accords.join(', ')}</strong> families.</p>
          )}

          {result.map((item: any, idx: number) => (
            <div key={item.id} className="rounded-2xl border border-border p-5 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl border border-border bg-muted/30 flex-shrink-0 overflow-hidden">
                {item.image_url
                  ? <img src={item.image_url} alt={item.fragrance_name} className="w-full h-full object-contain p-1" />
                  : <div className="w-full h-full flex items-center justify-center text-xl">🌸</div>
                }
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono rounded-full px-2 py-0.5" style={{ background: GOLD_BG, color: GOLD }}>#{idx + 1} MATCH</span>
                  {idx === 0 && <span className="text-[10px] font-semibold" style={{ color: GOLD }}>✦ Top Pick</span>}
                </div>
                <p className="text-sm font-semibold">{item.fragrance_name}</p>
                <p className="text-xs text-muted-foreground mb-2">{item.brand}</p>
                {item.accords?.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {item.accords.slice(0, 4).map((a: string) => (
                      <span key={a} className="text-[10px] px-2 py-0.5 rounded-full capitalize" style={{ background: 'hsl(220 16% 12%)', color: 'hsl(220 10% 60%)', border: '1px solid hsl(220 14% 18%)' }}>{a}</span>
                    ))}
                  </div>
                )}
                <p className="text-[11px] text-muted-foreground mt-2">
                  {intensity === 'subtle' ? 'Apply 1 spray to one wrist only.' :
                   intensity === 'moderate' ? 'Apply to wrists and neck — 3 sprays total.' :
                   'Apply to wrists, neck, and chest for full projection.'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
