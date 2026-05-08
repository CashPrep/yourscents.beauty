'use client'
import { useMemo } from 'react'

const SEASON_MAP: Record<number, string> = { 12: 'winter', 1: 'winter', 2: 'winter', 3: 'spring', 4: 'spring', 5: 'spring', 6: 'summer', 7: 'summer', 8: 'summer', 9: 'fall', 10: 'fall', 11: 'fall' }

const SEASONAL_ACCORDS: Record<string, string[]> = {
  winter: ['vanilla','amber','oud','woody','warm','spicy','musk','oriental'],
  spring: ['floral','fresh','light','powdery','green','citrus'],
  summer: ['aquatic','citrus','fresh','tropical','fruity','light'],
  fall:   ['woody','spicy','amber','leather','warm','oriental'],
}

const DAY_VIBES: Record<number, string[]> = {
  1: ['fresh','clean','office','light'],   // Mon
  2: ['fresh','clean','office','light'],   // Tue
  3: ['fresh','clean','office','light'],   // Wed
  4: ['bold','floral','date'],             // Thu
  5: ['bold','night out','floral','dark'], // Fri
  6: ['sweet','fruity','casual','fun'],    // Sat
  0: ['soft','cozy','warm','clean'],       // Sun
}

export default function ScentOfTheDay({ wardrobe }: { wardrobe: any[] }) {
  const pick = useMemo(() => {
    if (!wardrobe.length) return null
    const now = new Date()
    const month = now.getMonth() + 1
    const day = now.getDay()
    const season = SEASON_MAP[month]
    const seasonAccords = SEASONAL_ACCORDS[season] || []
    const dayVibes = DAY_VIBES[day] || []
    const all = [...seasonAccords, ...dayVibes]

    // Score each wardrobe item
    const scored = wardrobe.map(item => {
      const accords = (item.accords || []).map((a: string) => a.toLowerCase())
      const notes = (item.notes || []).map((n: string) => n.toLowerCase())
      const combined = [...accords, ...notes]
      const score = all.reduce((s, keyword) => s + (combined.some(c => c.includes(keyword)) ? 1 : 0), 0)
      return { item, score }
    })
    scored.sort((a, b) => b.score - a.score)

    // Use day-of-year as a seed so it changes daily but is deterministic
    const doy = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000)
    const topTied = scored.filter(s => s.score === scored[0].score)
    return topTied[doy % topTied.length].item
  }, [wardrobe])

  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  const dayName = days[new Date().getDay()]
  const seasons: Record<string, string> = { winter: '❄️', spring: '🌸', summer: '☀️', fall: '🍂' }
  const month = new Date().getMonth() + 1
  const season = SEASON_MAP[month]

  if (!pick) return null

  return (
    <div className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4">
      <div className="text-3xl">{seasons[season]}</div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-0.5">Scent of the Day — {dayName}</p>
        <p className="font-bold serif truncate">{pick.fragrance_name}</p>
        <p className="text-xs text-muted-foreground">{pick.brand}</p>
      </div>
      {pick.image_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={pick.image_url} alt={pick.fragrance_name} className="w-12 h-12 object-contain flex-shrink-0" />
      )}
    </div>
  )
}
