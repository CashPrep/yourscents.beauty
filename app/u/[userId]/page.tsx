import { createClient as createAdminClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

const ROSE        = 'hsl(8 48% 72%)'
const ROSE_BG     = 'hsl(8 56% 76% / 0.12)'
const ROSE_BORDER = 'hsl(8 56% 76% / 0.32)'
const ROSE_DEEP   = 'hsl(3 40% 58%)'
const CREAM       = 'hsl(18 50% 97%)'
const FOREGROUND  = 'hsl(5 25% 22%)'
const MUTED       = 'hsl(8 15% 52%)'

function adminClient() {
  return createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

interface WardrobeRow {
  id: string
  fragrance_name: string
  brand: string
  image_url?: string | null
  rating?: number
  personal_note?: string
  accords?: string[]
}

type Props = { params: Promise<{ userId: string }> }

/** Compute a fun "collector score" from 0–100 based on wardrobe diversity + ratings */
function collectorScore(items: WardrobeRow[]): number {
  if (items.length === 0) return 0
  const ratedCount  = items.filter(i => i.rating && i.rating > 0).length
  const avgRating   = ratedCount
    ? items.reduce((s, i) => s + (i.rating || 0), 0) / ratedCount
    : 3
  const allAccords  = items.flatMap(i => i.accords || [])
  const uniqueAccords = new Set(allAccords.map(a => a.toLowerCase())).size
  const diversityScore = Math.min(40, uniqueAccords * 4)
  const sizeScore      = Math.min(30, items.length * 3)
  const ratingScore    = Math.round((avgRating / 5) * 30)
  return Math.min(100, diversityScore + sizeScore + ratingScore)
}

function scoreLabel(score: number): { label: string; emoji: string; color: string } {
  if (score >= 85) return { label: 'Elite Collector',    emoji: '💎', color: 'hsl(280 60% 55%)' }
  if (score >= 65) return { label: 'Scent Connoisseur', emoji: '🌹', color: ROSE_DEEP }
  if (score >= 45) return { label: 'Fragrance Lover',   emoji: '🌸', color: ROSE }
  if (score >= 25) return { label: 'Growing Wardrobe',  emoji: '🌱', color: 'hsl(140 45% 48%)' }
  return { label: 'Just Getting Started', emoji: '✨', color: MUTED }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { userId } = await params
  const supabase   = adminClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', userId)
    .single()

  const { count } = await supabase
    .from('wardrobe_items')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)

  const name  = profile?.full_name || 'A Your Scents user'
  const title = `${name}'s Fragrance Wardrobe ✨`
  const desc  = `${name} is collecting ${count ?? 0} fragrance${count !== 1 ? 's' : ''} on Your Scents. Rate their collection & discover new scents.`

  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      type: 'profile',
      url: `https://yourscents.beauty/u/${userId}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: desc,
    },
  }
}

export default async function PublicProfilePage({ params }: Props) {
  const { userId } = await params
  const supabase   = adminClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, plan')
    .eq('id', userId)
    .single()

  const { data: items } = await supabase
    .from('wardrobe_items')
    .select('id, fragrance_name, brand, image_url, rating, personal_note, accords')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (!profile || !items) return notFound()

  const name  = profile.full_name || 'A Your Scents user'
  const rows  = items as WardrobeRow[]
  const score = collectorScore(rows)
  const { label: tierLabel, emoji: tierEmoji, color: tierColor } = scoreLabel(score)

  const avgRating = rows.filter(i => i.rating).length
    ? (rows.reduce((s, i) => s + (i.rating || 0), 0) / rows.filter(i => i.rating).length).toFixed(1)
    : null

  const allAccords    = rows.flatMap(i => i.accords || [])
  const topAccords    = [...new Map(allAccords.map(a => [a.toLowerCase(), a])).values()].slice(0, 5)

  return (
    <div
      className="min-h-screen"
      style={{
        background: CREAM,
        backgroundImage:
          'radial-gradient(ellipse 70% 40% at 50% -5%, hsl(8 56% 76% / 0.12) 0%, transparent 65%), radial-gradient(ellipse 50% 30% at 100% 100%, hsl(13 48% 65% / 0.08) 0%, transparent 60%)',
      }}
    >
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl" style={{ background: 'hsl(10 60% 84% / 0.28)' }} />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-3xl" style={{ background: 'hsl(13 48% 65% / 0.16)' }} />
      </div>

      <header
        className="fixed top-0 inset-x-0 z-50 border-b"
        style={{ background: 'hsl(18 60% 98% / 0.92)', backdropFilter: 'blur(20px)', borderColor: ROSE_BORDER }}
      >
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Your Scents"
              width={120}
              height={48}
              className="h-11 w-auto object-contain"
              priority
            />
          </Link>
          <Link href="/signup">
            <button className="btn-gold text-xs px-4 py-1.5">Start Free ✨</button>
          </Link>
        </div>
      </header>

      <div className="relative max-w-3xl mx-auto px-4 pt-28 pb-16">

        {/* ── Hero Profile Card ──────────────────────────────────────── */}
        <div
          className="rounded-3xl p-6 mb-8 text-center"
          style={{
            background: 'hsl(0 0% 100%)',
            border: `1px solid ${ROSE_BORDER}`,
            boxShadow: `0 8px 40px hsl(8 56% 76% / 0.16)`,
          }}
        >
          <div
            className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold serif"
            style={{ background: ROSE_BG, border: `2px solid ${ROSE_BORDER}`, color: ROSE_DEEP }}
          >
            {name.charAt(0).toUpperCase()}
          </div>
          <h1 className="text-2xl font-light serif mb-1" style={{ color: FOREGROUND }}>
            {name}&apos;s Fragrance Wardrobe
          </h1>
          <p className="text-sm mb-5" style={{ color: MUTED }}>
            {rows.length} fragrance{rows.length !== 1 ? 's' : ''} · Curated on Your Scents
          </p>

          {/* ── Rate My Collection Score ─────────────────────────────── */}
          <div
            className="inline-flex flex-col items-center gap-1 px-6 py-4 rounded-2xl mb-4"
            style={{ background: ROSE_BG, border: `1px solid ${ROSE_BORDER}` }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: MUTED }}>Collection Score</p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold serif" style={{ color: tierColor }}>{score}</span>
              <span className="text-lg" style={{ color: MUTED }}>/100</span>
            </div>
            <p className="text-sm font-medium" style={{ color: tierColor }}>{tierEmoji} {tierLabel}</p>
            {/* Score bar */}
            <div className="w-48 h-2 rounded-full mt-2" style={{ background: 'hsl(10 30% 88%)' }}>
              <div
                className="h-2 rounded-full transition-all"
                style={{ width: `${score}%`, background: `linear-gradient(90deg, ${ROSE}, ${tierColor})` }}
              />
            </div>
          </div>

          {/* ── Quick Stats Row ──────────────────────────────────────── */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[
              { label: 'Bottles',      value: `${rows.length}` },
              { label: 'Avg Rating',   value: avgRating ? `${avgRating} ★` : '—' },
              { label: 'Unique Accords', value: `${new Set(allAccords.map(a => a.toLowerCase())).size}` },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-xl p-3" style={{ background: 'hsl(10 30% 96%)' }}>
                <p className="text-xs" style={{ color: MUTED }}>{label}</p>
                <p className="text-base font-semibold serif" style={{ color: FOREGROUND }}>{value}</p>
              </div>
            ))}
          </div>

          {topAccords.length > 0 && (
            <div className="flex flex-wrap justify-center gap-1.5 mt-4">
              {topAccords.map(a => (
                <span
                  key={a}
                  className="text-[11px] px-2.5 py-1 rounded-full capitalize"
                  style={{ background: ROSE_BG, color: ROSE_DEEP, border: `1px solid ${ROSE_BORDER}` }}
                >{a}</span>
              ))}
            </div>
          )}
        </div>

        {/* ── TikTok / Share CTA ───────────────────────────────────── */}
        <ShareBanner name={name} score={score} tierLabel={tierLabel} tierEmoji={tierEmoji} userId={userId} />

        {/* ── Wardrobe Grid ────────────────────────────────────────── */}
        {rows.length === 0 ? (
          <p className="text-center py-20" style={{ color: MUTED }}>This wardrobe is empty 🌸</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {rows.map((item: WardrobeRow) => (
              <div
                key={item.id}
                className="panel-glow flex flex-col gap-2 p-4 rounded-2xl"
                style={{ background: 'hsl(0 0% 100%)', border: `1px solid ${ROSE_BORDER}` }}
              >
                <div
                  className="w-full aspect-square rounded-xl overflow-hidden flex items-center justify-center"
                  style={{ background: 'hsl(10 60% 97%)', border: `1px solid ${ROSE_BORDER}` }}
                >
                  {item.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.image_url} alt={item.fragrance_name} className="w-full h-full object-contain p-2" />
                  ) : (
                    <span className="text-3xl">🌸</span>
                  )}
                </div>
                <p className="font-semibold text-sm serif leading-tight" style={{ color: FOREGROUND }}>{item.fragrance_name}</p>
                <p className="text-xs" style={{ color: MUTED }}>{item.brand}</p>
                {item.rating && item.rating > 0 && (
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => (
                      <span key={i} className="text-xs" style={{ color: item.rating && i <= item.rating ? ROSE : 'hsl(10 25% 80%)' }}>★</span>
                    ))}
                  </div>
                )}
                {item.personal_note && (
                  <p className="text-[11px] italic line-clamp-2" style={{ color: MUTED }}>&ldquo;{item.personal_note}&rdquo;</p>
                )}
                {item.accords && item.accords.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {item.accords.slice(0,2).map((a: string) => (
                      <span key={a} className="chip text-[9px] capitalize">{a}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/">
            <button className="btn-gold text-sm px-7 py-3">
              🌸 Build your own fragrance wardrobe
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

// ── Client island: copy-link + TikTok caption ──────────────────────────────
// This is a tiny client component embedded in the otherwise-static page
// so we keep the whole page as a server component (no 'use client' at top).

import ShareBannerClient from './ShareBanner'
const ShareBanner = ShareBannerClient
