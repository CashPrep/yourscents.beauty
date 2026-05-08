'use client'
import { useMemo } from 'react'

const NOTE_FAMILIES: Record<string, string[]> = {
  Floral: ['rose','jasmine','peony','lily','violet','gardenia','tuberose','freesia','orchid','iris','magnolia','ylang','osmanthus','mimosa','orange blossom','rangoon'],
  Sweet: ['vanilla','caramel','praline','chocolate','tonka','benzyl','heliotrope','almond','sugar','candy','gourmand'],
  Woody: ['sandalwood','cedar','vetiver','patchouli','oud','wood','cashmeran','guaiac'],
  Fresh: ['bergamot','lemon','grapefruit','citrus','neroli','petitgrain','mandarin','yuzu','green','aquatic','watery','melon'],
  Musky: ['musk','amber','ambroxan','ambergris','civet','castoreum','exaltolide'],
  Fruity: ['strawberry','peach','pear','apple','blackcurrant','raspberry','cherry','plum','passion','mango','coconut','pistachio'],
  Spicy: ['pepper','cinnamon','cardamom','clove','ginger','nutmeg','saffron','pink pepper','coriander'],
  Aromatic: ['lavender','rosemary','thyme','sage','mint','basil','geranium','tea'],
}

const FAMILY_COLORS: Record<string, string> = {
  Floral:   '#f9a8d4',
  Sweet:    '#fcd34d',
  Woody:    '#a78966',
  Fresh:    '#6ee7b7',
  Musky:    '#c4b5fd',
  Fruity:   '#fb923c',
  Spicy:    '#f87171',
  Aromatic: '#86efac',
}

const PERSONALITY: Record<string, { title: string; desc: string; emoji: string }> = {
  Floral:   { title: 'The Romantic', desc: 'Soft, feminine, and timeless — you lead with your heart 🌸', emoji: '🌸' },
  Sweet:    { title: 'The Charmer', desc: 'Warm, inviting, and impossible to ignore — you leave a trail 🍯', emoji: '🍯' },
  Woody:    { title: 'The Sophisticate', desc: 'Grounded, confident, and deeply alluring — you own every room 🪵', emoji: '🪵' },
  Fresh:    { title: 'The Free Spirit', desc: 'Light, energetic, and effortlessly cool — you are sunshine ☀️', emoji: '☀️' },
  Musky:    { title: 'The Sensualist', desc: 'Intimate, mysterious, and utterly captivating — you are magnetic 🌙', emoji: '🌙' },
  Fruity:   { title: 'The Optimist', desc: 'Playful, bright, and irresistibly fun — you light up every space 🍑', emoji: '🍑' },
  Spicy:    { title: 'The Bold One', desc: 'Daring, intense, and unforgettable — you turn heads wherever you go 🌶️', emoji: '🌶️' },
  Aromatic: { title: 'The Minimalist', desc: 'Clean, calming, and quietly elegant — you are effortlessly chic 🌿', emoji: '🌿' },
}

export default function ScentDNA({ wardrobe }: { wardrobe: any[] }) {
  const families = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const item of wardrobe) {
      const allNotes = (item.notes || []).map((n: string) => n.toLowerCase())
      for (const [family, keywords] of Object.entries(NOTE_FAMILIES)) {
        const matches = allNotes.filter((n: string) => keywords.some(k => n.includes(k))).length
        counts[family] = (counts[family] || 0) + matches
      }
    }
    const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1
    return Object.entries(counts)
      .filter(([, v]) => v > 0)
      .sort((a, b) => b[1] - a[1])
      .map(([family, count]) => ({ family, count, pct: Math.round((count / total) * 100) }))
  }, [wardrobe])

  if (wardrobe.length < 2) {
    return (
      <div className="bg-card border border-border rounded-2xl p-6 text-center">
        <p className="text-3xl mb-2">🧬</p>
        <p className="font-semibold serif mb-1">Your Scent DNA</p>
        <p className="text-sm text-muted-foreground">Add at least 2 fragrances to unlock your personal Scent DNA profile.</p>
      </div>
    )
  }

  const top = families[0]
  const personality = top ? PERSONALITY[top.family] : null

  return (
    <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
      <div className="flex items-center gap-2">
        <span className="text-xl">🧬</span>
        <h3 className="font-bold serif text-lg">Your Scent DNA</h3>
      </div>

      {personality && (
        <div className="rounded-xl p-4" style={{ background: `${FAMILY_COLORS[top.family]}22`, border: `1.5px solid ${FAMILY_COLORS[top.family]}55` }}>
          <p className="text-2xl mb-1">{personality.emoji}</p>
          <p className="font-bold serif text-base">{personality.title}</p>
          <p className="text-sm text-muted-foreground mt-0.5">{personality.desc}</p>
        </div>
      )}

      <div className="space-y-2">
        {families.slice(0, 6).map(({ family, pct }) => (
          <div key={family}>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium">{family}</span>
              <span className="text-muted-foreground">{pct}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${pct}%`, background: FAMILY_COLORS[family] || '#f9a8d4' }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground text-center">Based on {wardrobe.length} fragrance{wardrobe.length !== 1 ? 's' : ''} in your wardrobe</p>
    </div>
  )
}
