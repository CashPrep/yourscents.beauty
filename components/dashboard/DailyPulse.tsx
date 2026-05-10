'use client'
import { useEffect, useState } from 'react'
import { RefreshCw } from 'lucide-react'

const ROSE       = 'hsl(340 55% 62%)'
const ROSE_LIGHT = 'hsl(340 45% 92%)'
const ROSE_TEXT  = 'hsl(340 55% 48%)'

const DAYS   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

const DAY_VIBES: Record<number, { mood: string; prompt: string; emoji: string }> = {
  0: { mood: 'Relax',       prompt: 'Sunday calls for something cozy and effortless.',            emoji: '☕' },
  1: { mood: 'Energize',    prompt: 'Start the week strong — reach for something fresh and sharp.', emoji: '⚡' },
  2: { mood: 'Focus',       prompt: 'Tuesday work mode: clean, professional, and composed.',     emoji: '🎯' },
  3: { mood: 'Balance',     prompt: 'Midweek reset — something versatile that works all day.',    emoji: '⚖️' },
  4: { mood: 'Social',      prompt: 'Thursday energy: warm up for the weekend ahead.',            emoji: '🎉' },
  5: { mood: 'Bold',        prompt: "Friday night ready — don't hold back.",                      emoji: '🔥' },
  6: { mood: 'Adventurous', prompt: 'Saturday is yours. Wear something unexpected.',              emoji: '🌍' },
}

const SEASON_PICKS: Record<number, string[]> = {
  11: ['amber','oud','woody','spicy'], 0: ['amber','oud','woody','spicy'], 1: ['amber','vanilla','musky'],
  2: ['floral','fresh','green'], 3: ['floral','citrus','fresh'], 4: ['citrus','fresh','floral'],
  5: ['aquatic','citrus','fresh'], 6: ['aquatic','citrus','fruity'], 7: ['aquatic','fruity','floral'],
  8: ['woody','spicy','warm'], 9: ['woody','amber','spicy'], 10: ['amber','oud','vanilla'],
}

function scoreForToday(item: any, dow: number, month: number): number {
  const vibe     = DAY_VIBES[dow]
  const seasonal = SEASON_PICKS[month] || []
  const accords  = (item.accords || []).map((a: string) => a.toLowerCase())
  let score = 0
  seasonal.forEach(s => { if (accords.some((a: string) => a.includes(s))) score += 20 })
  if (vibe.mood === 'Relax'       && accords.some((a: string) => ['musky','vanilla','woody'].some(k => a.includes(k)))) score += 15
  if (vibe.mood === 'Energize'    && accords.some((a: string) => ['citrus','fresh','aquatic'].some(k => a.includes(k)))) score += 15
  if (vibe.mood === 'Focus'       && accords.some((a: string) => ['woody','clean','fresh'].some(k => a.includes(k)))) score += 15
  if (vibe.mood === 'Social'      && accords.some((a: string) => ['floral','fruity','sweet'].some(k => a.includes(k)))) score += 15
  if (vibe.mood === 'Bold'        && accords.some((a: string) => ['oud','spicy','amber'].some(k => a.includes(k)))) score += 15
  if (vibe.mood === 'Adventurous' && accords.some((a: string) => ['spicy','woody','green'].some(k => a.includes(k)))) score += 15
  score += (item.rating || 3) * 3
  return score
}

export default function DailyPulse({ wardrobe }: { wardrobe: any[] }) {
  const [now,       setNow]       = useState<Date | null>(null)
  const [pinned,    setPinned]    = useState<string | null>(null)
  const [refreshed, setRefreshed] = useState(0)

  useEffect(() => { setNow(new Date()) }, [])
  useEffect(() => {
    const stored = localStorage.getItem('dp_pinned')
    if (stored) setPinned(stored)
  }, [])

  if (!now || wardrobe.length === 0) return null

  const dow    = now.getDay()
  const month  = now.getMonth()
  const vibe   = DAY_VIBES[dow]
  const ranked = [...wardrobe]
    .map(item => ({ item, score: scoreForToday(item, dow, month) }))
    .sort((a, b) => b.score - a.score)

  const pick = pinned
    ? wardrobe.find(w => w.id === pinned) ?? ranked[0]?.item
    : ranked[refreshed % Math.max(ranked.length, 1)]?.item

  if (!pick) return null

  const dateStr = `${DAYS[dow]}, ${MONTHS[month]} ${now.getDate()}`

  const handlePin = () => {
    const next = pinned === pick.id ? null : pick.id
    setPinned(next)
    next ? localStorage.setItem('dp_pinned', next) : localStorage.removeItem('dp_pinned')
  }

  return (
    <div
      className="rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6"
      style={{ background: `linear-gradient(135deg, ${ROSE_LIGHT}, hsl(340 55% 88%))`, border: `1.5px solid ${ROSE}44` }}
    >
      <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center border" style={{ background: 'hsl(0 0% 100% / 0.7)', borderColor: `${ROSE}33` }}>
        {pick.image_url
          ? <img src={pick.image_url} alt={pick.fragrance_name} className="w-full h-full object-contain p-1" />
          : <span className="text-2xl">🌸</span>
        }
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-sm">{vibe.emoji}</span>
          <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: ROSE_TEXT }}>{dateStr} · {vibe.mood} Vibe</p>
        </div>
        <p className="font-bold serif text-base leading-tight" style={{ color: ROSE_TEXT }}>{pick.fragrance_name}</p>
        <p className="text-xs" style={{ color: 'hsl(340 30% 55%)' }}>{pick.brand}</p>
        <p className="text-[11px] mt-1" style={{ color: 'hsl(340 30% 50%)' }}>{vibe.prompt}</p>
      </div>

      <div className="flex gap-2 flex-shrink-0">
        <button onClick={() => setRefreshed(r => r + 1)} className="flex items-center gap-1 text-[11px] font-medium px-3 py-1.5 rounded-full" style={{ background: 'hsl(0 0% 100% / 0.7)', color: ROSE_TEXT }}>
          <RefreshCw className="h-3 w-3" /> Shuffle
        </button>
        <button onClick={handlePin} className="flex items-center gap-1 text-[11px] font-medium px-3 py-1.5 rounded-full"
          style={{ background: pinned === pick.id ? ROSE : 'hsl(0 0% 100% / 0.7)', color: pinned === pick.id ? '#fff' : ROSE_TEXT }}>
          {pinned === pick.id ? '📌 Pinned' : '📌 Pin'}
        </button>
      </div>
    </div>
  )
}
