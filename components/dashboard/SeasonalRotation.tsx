'use client'
import { useState } from 'react'
import { Sun, Snowflake, Leaf, Flower2, RotateCcw, ChevronRight } from 'lucide-react'

const GOLD = 'hsl(42 85% 68%)'
const GOLD_BG = 'hsl(42 85% 68% / 0.10)'
const GOLD_BORDER = 'hsl(42 85% 68% / 0.25)'

const SEASONS = [
  {
    key: 'spring',
    label: 'Spring',
    icon: Flower2,
    color: 'hsl(340 60% 65%)',
    bg: 'hsl(340 60% 65% / 0.10)',
    border: 'hsl(340 60% 65% / 0.25)',
    ideal: ['floral','fresh','green','citrus','light fruity'],
    avoid: ['heavy oud','leather','smoky','tobacco','resinous'],
    tip: 'Light florals and green accords mirror the season perfectly. Go easy on base-heavy orientals.',
  },
  {
    key: 'summer',
    label: 'Summer',
    icon: Sun,
    color: 'hsl(42 85% 68%)',
    bg: GOLD_BG,
    border: GOLD_BORDER,
    ideal: ['citrus','aquatic','fresh','light woody','aromatic'],
    avoid: ['heavy musk','oud','tobacco','gourmand','dark amber'],
    tip: 'Heat amplifies projection massively — use half your usual sprays. Aquatics and citrus shine here.',
  },
  {
    key: 'autumn',
    label: 'Autumn',
    icon: Leaf,
    color: 'hsl(25 80% 60%)',
    bg: 'hsl(25 80% 60% / 0.10)',
    border: 'hsl(25 80% 60% / 0.25)',
    ideal: ['woody','spicy','amber','tobacco','leather','earthy'],
    avoid: ['light aquatic','pure citrus','thin fresh'],
    tip: 'Cooler air holds heavy base notes longer. This is the season for your ouds, ambers, and spice-forward bottles.',
  },
  {
    key: 'winter',
    label: 'Winter',
    icon: Snowflake,
    color: 'hsl(210 70% 65%)',
    bg: 'hsl(210 70% 65% / 0.10)',
    border: 'hsl(210 70% 65% / 0.25)',
    ideal: ['oud','vanilla','gourmand','resinous','warm spicy','incense'],
    avoid: ['aquatic','light floral','thin citrus'],
    tip: 'Cold air mutes projection — apply more liberally and focus on pulse points. Rich orientals are at their best.',
  },
]

function getCurrentSeason(): string {
  const month = new Date().getMonth()
  if (month >= 2 && month <= 4) return 'spring'
  if (month >= 5 && month <= 7) return 'summer'
  if (month >= 8 && month <= 10) return 'autumn'
  return 'winter'
}

function scoreSeason(item: any, season: typeof SEASONS[0]): 'rotate-in' | 'rotate-out' | 'year-round' {
  const itemAccords = [...(item.accords || []), ...(item.notes || [])].map((a: string) => a.toLowerCase())
  const idealHits = season.ideal.filter(i => itemAccords.some(a => a.includes(i) || i.includes(a))).length
  const avoidHits = season.avoid.filter(i => itemAccords.some(a => a.includes(i) || i.includes(a))).length
  if (avoidHits >= 2) return 'rotate-out'
  if (idealHits >= 2) return 'rotate-in'
  return 'year-round'
}

export default function SeasonalRotation({ wardrobe }: { wardrobe: any[] }) {
  const [activeSeason, setActiveSeason] = useState(getCurrentSeason())
  const season = SEASONS.find(s => s.key === activeSeason)!
  const Icon = season.icon

  const rotateIn = wardrobe.filter(item => scoreSeason(item, season) === 'rotate-in')
  const rotateOut = wardrobe.filter(item => scoreSeason(item, season) === 'rotate-out')
  const yearRound = wardrobe.filter(item => scoreSeason(item, season) === 'year-round')

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-1">Seasonal Rotation <span className="text-xs font-normal px-2 py-0.5 rounded-full ml-1" style={{ background: GOLD_BG, color: GOLD, border: `1px solid ${GOLD_BORDER}` }}>NEW</span></h2>
        <p className="text-sm text-muted-foreground">Know exactly which bottles to reach for — and which to shelf — based on the season.</p>
      </div>

      {/* Season selector */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {SEASONS.map(s => {
          const SIcon = s.icon
          const isActive = activeSeason === s.key
          const isNow = getCurrentSeason() === s.key
          return (
            <button
              key={s.key}
              onClick={() => setActiveSeason(s.key)}
              className="p-3 rounded-xl border text-center transition-all relative"
              style={isActive ? { background: s.bg, borderColor: s.border } : { background: 'hsl(220 16% 8%)', borderColor: 'hsl(220 14% 14%)' }}
            >
              {isNow && (
                <span className="absolute -top-1.5 -right-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: GOLD, color: 'hsl(220 18% 6%)' }}>NOW</span>
              )}
              <SIcon className="h-5 w-5 mx-auto mb-1.5" style={isActive ? { color: s.color } : { color: 'hsl(220 10% 48%)' }} />
              <p className="text-[11px] font-medium" style={isActive ? { color: s.color } : { color: 'hsl(220 10% 60%)' }}>{s.label}</p>
            </button>
          )
        })}
      </div>

      {/* Season tip */}
      <div className="rounded-xl p-4 mb-6" style={{ background: season.bg, border: `1px solid ${season.border}` }}>
        <div className="flex items-center gap-2 mb-1">
          <Icon className="h-4 w-4" style={{ color: season.color }} />
          <p className="text-xs font-semibold" style={{ color: season.color }}>{season.label} Pro Tip</p>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">{season.tip}</p>
      </div>

      {wardrobe.length === 0 && (
        <div className="text-center py-12 border border-dashed border-border rounded-2xl">
          <p className="text-sm text-muted-foreground">Add fragrances to your wardrobe to see your rotation plan.</p>
        </div>
      )}

      {/* Sections */}
      {wardrobe.length > 0 && (
        <div className="space-y-6">
          {/* Rotate In */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full" style={{ background: 'hsl(142 70% 55%)' }} />
              <p className="text-sm font-semibold">Rotate In <span className="text-xs text-muted-foreground font-normal">— reach for these now</span></p>
              <span className="text-xs ml-auto text-muted-foreground">{rotateIn.length} bottle{rotateIn.length !== 1 ? 's' : ''}</span>
            </div>
            {rotateIn.length === 0
              ? <p className="text-xs text-muted-foreground italic">No strong seasonal matches in your wardrobe — consider adding {season.ideal.slice(0,3).join(', ')} scents.</p>
              : (
                <div className="grid sm:grid-cols-2 gap-3">
                  {rotateIn.map((item: any) => (
                    <div key={item.id} className="flex items-center gap-3 rounded-xl p-3 border" style={{ background: 'hsl(142 70% 55% / 0.06)', borderColor: 'hsl(142 70% 55% / 0.2)' }}>
                      <div className="w-10 h-10 rounded-lg border border-border bg-muted/30 flex-shrink-0 overflow-hidden">
                        {item.image_url
                          ? <img src={item.image_url} alt={item.fragrance_name} className="w-full h-full object-contain p-0.5" />
                          : <div className="w-full h-full flex items-center justify-center text-lg">🌸</div>
                        }
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold truncate">{item.fragrance_name}</p>
                        <p className="text-[10px] text-muted-foreground">{item.brand}</p>
                      </div>
                      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground ml-auto shrink-0" />
                    </div>
                  ))}
                </div>
              )
            }
          </div>

          {/* Year Round */}
          {yearRound.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full" style={{ background: GOLD }} />
                <p className="text-sm font-semibold">Year-Round <span className="text-xs text-muted-foreground font-normal">— always works</span></p>
                <span className="text-xs ml-auto text-muted-foreground">{yearRound.length} bottle{yearRound.length !== 1 ? 's' : ''}</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {yearRound.map((item: any) => (
                  <div key={item.id} className="flex items-center gap-3 rounded-xl p-3 border border-border" style={{ background: 'hsl(220 16% 8%)' }}>
                    <div className="w-10 h-10 rounded-lg border border-border bg-muted/30 flex-shrink-0 overflow-hidden">
                      {item.image_url
                        ? <img src={item.image_url} alt={item.fragrance_name} className="w-full h-full object-contain p-0.5" />
                        : <div className="w-full h-full flex items-center justify-center text-lg">🌸</div>
                      }
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold truncate">{item.fragrance_name}</p>
                      <p className="text-[10px] text-muted-foreground">{item.brand}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rotate Out */}
          {rotateOut.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full" style={{ background: 'hsl(0 65% 60%)' }} />
                <p className="text-sm font-semibold">Shelf These <span className="text-xs text-muted-foreground font-normal">— save for another season</span></p>
                <span className="text-xs ml-auto text-muted-foreground">{rotateOut.length} bottle{rotateOut.length !== 1 ? 's' : ''}</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {rotateOut.map((item: any) => (
                  <div key={item.id} className="flex items-center gap-3 rounded-xl p-3 border opacity-60" style={{ background: 'hsl(0 65% 60% / 0.05)', borderColor: 'hsl(0 65% 60% / 0.2)' }}>
                    <div className="w-10 h-10 rounded-lg border border-border bg-muted/30 flex-shrink-0 overflow-hidden">
                      {item.image_url
                        ? <img src={item.image_url} alt={item.fragrance_name} className="w-full h-full object-contain p-0.5" />
                        : <div className="w-full h-full flex items-center justify-center text-lg">🌸</div>
                      }
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold truncate">{item.fragrance_name}</p>
                      <p className="text-[10px] text-muted-foreground">{item.brand}</p>
                    </div>
                    <RotateCcw className="h-3.5 w-3.5 text-muted-foreground ml-auto shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
