'use client'

const ROSE       = 'hsl(340 55% 62%)'
const ROSE_LIGHT = 'hsl(340 45% 92%)'
const ROSE_TEXT  = 'hsl(340 55% 48%)'

interface Milestone {
  id: string
  emoji: string
  title: string
  desc: string
  unlocked: boolean
  progress?: number   // 0-100, shown only when not unlocked
  target?: number
  current?: number
}

function computeMilestones(wardrobe: any[]): Milestone[] {
  const count         = wardrobe.length
  const ratedCount    = wardrobe.filter(i => i.rating && i.rating > 0).length
  const notedCount    = wardrobe.filter(i => i.personal_note).length
  const allAccords    = wardrobe.flatMap((i: any) => (i.accords || []).map((a: string) => a.toLowerCase()))
  const uniqueAccords = new Set(allAccords).size
  const avgRating     = ratedCount
    ? wardrobe.reduce((s, i) => s + (i.rating || 0), 0) / ratedCount
    : 0
  const fiveStarCount = wardrobe.filter(i => i.rating === 5).length

  return [
    {
      id: 'first',
      emoji: '🌸',
      title: 'First Spritz',
      desc: 'Add your first fragrance',
      unlocked: count >= 1,
      progress: Math.min(100, count * 100),
      target: 1, current: Math.min(count, 1),
    },
    {
      id: 'trio',
      emoji: '💐',
      title: 'The Trio',
      desc: '3 fragrances in your wardrobe',
      unlocked: count >= 3,
      progress: Math.round((count / 3) * 100),
      target: 3, current: Math.min(count, 3),
    },
    {
      id: 'collector',
      emoji: '🏆',
      title: 'Collector',
      desc: '10 fragrances — serious territory',
      unlocked: count >= 10,
      progress: Math.round((count / 10) * 100),
      target: 10, current: Math.min(count, 10),
    },
    {
      id: 'obsessed',
      emoji: '💎',
      title: 'Obsessed',
      desc: '25 fragrances. No shame.',
      unlocked: count >= 25,
      progress: Math.round((count / 25) * 100),
      target: 25, current: Math.min(count, 25),
    },
    {
      id: 'critic',
      emoji: '⭐',
      title: 'The Critic',
      desc: 'Rate 5 fragrances',
      unlocked: ratedCount >= 5,
      progress: Math.round((ratedCount / 5) * 100),
      target: 5, current: Math.min(ratedCount, 5),
    },
    {
      id: 'connoisseur',
      emoji: '🥃',
      title: 'Connoisseur',
      desc: 'Avg rating above 4.0 across 5+ fragrances',
      unlocked: ratedCount >= 5 && avgRating >= 4.0,
      progress: ratedCount < 5 ? Math.round((ratedCount / 5) * 100) : Math.round((avgRating / 4) * 100),
      target: 5, current: Math.min(ratedCount, 5),
    },
    {
      id: 'journalist',
      emoji: '📓',
      title: 'Scent Journalist',
      desc: 'Write personal notes for 3 fragrances',
      unlocked: notedCount >= 3,
      progress: Math.round((notedCount / 3) * 100),
      target: 3, current: Math.min(notedCount, 3),
    },
    {
      id: 'diverse',
      emoji: '🌈',
      title: 'Palette Builder',
      desc: '10 unique accords across your wardrobe',
      unlocked: uniqueAccords >= 10,
      progress: Math.round((uniqueAccords / 10) * 100),
      target: 10, current: Math.min(uniqueAccords, 10),
    },
    {
      id: 'fivestar',
      emoji: '💖',
      title: 'HG Finder',
      desc: 'Give 3 fragrances a 5-star rating',
      unlocked: fiveStarCount >= 3,
      progress: Math.round((fiveStarCount / 3) * 100),
      target: 3, current: Math.min(fiveStarCount, 3),
    },
  ]
}

export default function Milestones({ wardrobe }: { wardrobe: any[] }) {
  const milestones = computeMilestones(wardrobe)
  const unlocked   = milestones.filter(m => m.unlocked).length

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <span className="text-lg">🏅</span>
        <h3 className="font-bold serif text-base">Collection Milestones</h3>
        <span className="text-xs text-muted-foreground">{unlocked} / {milestones.length} unlocked</span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {milestones.map(m => (
          <div
            key={m.id}
            className="rounded-2xl p-4 flex flex-col gap-2 transition-all"
            style={{
              background: m.unlocked ? ROSE_LIGHT : 'hsl(var(--card))',
              border:     m.unlocked ? `1.5px solid ${ROSE}55` : '1px solid hsl(var(--border))',
              opacity:    m.unlocked ? 1 : 0.75,
            }}
          >
            <div className="flex items-start gap-2">
              <span className="text-xl">{m.unlocked ? m.emoji : '🔒'}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold" style={{ color: m.unlocked ? ROSE_TEXT : 'hsl(var(--foreground))' }}>
                  {m.title}
                </p>
                <p className="text-[11px] text-muted-foreground">{m.desc}</p>
              </div>
            </div>

            {!m.unlocked && m.progress !== undefined && (
              <>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${Math.min(100, m.progress)}%`, background: ROSE }}
                  />
                </div>
                <p className="text-[10px] text-muted-foreground">
                  {m.current} / {m.target}
                </p>
              </>
            )}

            {m.unlocked && (
              <p className="text-[10px] font-semibold" style={{ color: ROSE_TEXT }}>✓ Unlocked</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
