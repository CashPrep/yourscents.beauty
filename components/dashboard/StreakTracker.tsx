'use client'
import { useEffect, useState } from 'react'

const ROSE       = 'hsl(340 55% 62%)'
const ROSE_LIGHT = 'hsl(340 45% 92%)'
const ROSE_TEXT  = 'hsl(340 55% 48%)'

const STREAK_KEY      = 'ys_streak_days'
const LAST_VISIT_KEY  = 'ys_last_visit'

function todayKey() {
  const d = new Date()
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
}

function updateStreak(): number {
  const today    = todayKey()
  const lastVisit = localStorage.getItem(LAST_VISIT_KEY)
  let streak = parseInt(localStorage.getItem(STREAK_KEY) || '0', 10)

  if (!lastVisit) {
    streak = 1
  } else if (lastVisit === today) {
    // same day, no change
  } else {
    // check if yesterday
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yKey = `${yesterday.getFullYear()}-${yesterday.getMonth()}-${yesterday.getDate()}`
    streak = lastVisit === yKey ? streak + 1 : 1
  }

  localStorage.setItem(STREAK_KEY,     String(streak))
  localStorage.setItem(LAST_VISIT_KEY, today)
  return streak
}

export default function StreakTracker() {
  const [streak, setStreak] = useState<number | null>(null)

  useEffect(() => { setStreak(updateStreak()) }, [])

  if (!streak || streak < 2) return null   // hide on first visit

  const flame = streak >= 30 ? '🔥🔥🔥' : streak >= 14 ? '🔥🔥' : '🔥'

  return (
    <div
      className="flex items-center gap-3 px-4 py-2.5 rounded-xl mb-4"
      style={{ background: ROSE_LIGHT, border: `1px solid ${ROSE}44` }}
    >
      <span className="text-lg">{flame}</span>
      <div>
        <p className="text-sm font-bold" style={{ color: ROSE_TEXT }}>{streak}-Day Streak!</p>
        <p className="text-[11px]" style={{ color: 'hsl(340 30% 55%)' }}>
          {streak >= 7 ? 'You\u2019re a dedicated collector — keep it up 🌸' : 'Come back tomorrow to keep your streak alive!'}
        </p>
      </div>
    </div>
  )
}
