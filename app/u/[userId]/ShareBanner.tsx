'use client'
import { useState } from 'react'

const ROSE        = 'hsl(8 48% 72%)'
const ROSE_BG     = 'hsl(8 56% 76% / 0.12)'
const ROSE_BORDER = 'hsl(8 56% 76% / 0.32)'
const ROSE_DEEP   = 'hsl(3 40% 58%)'
const FOREGROUND  = 'hsl(5 25% 22%)'
const MUTED       = 'hsl(8 15% 52%)'

interface Props {
  name: string
  score: number
  tierLabel: string
  tierEmoji: string
  userId: string
}

export default function ShareBanner({ name, score, tierLabel, tierEmoji, userId }: Props) {
  const [copied, setCopied] = useState(false)
  const [captionCopied, setCaptionCopied] = useState(false)

  const profileUrl = `https://yourscents.beauty/u/${userId}`

  const tiktokCaption =
    `Rate my fragrance collection 👇\n` +
    `Score: ${score}/100 — ${tierEmoji} ${tierLabel}\n` +
    `See my full wardrobe: ${profileUrl}\n` +
    `#fragrance #perfume #scentcollection #fragrancetok #perfumetok #yourscents`

  const copyLink = () => {
    navigator.clipboard.writeText(profileUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const copyCaption = () => {
    navigator.clipboard.writeText(tiktokCaption)
    setCaptionCopied(true)
    setTimeout(() => setCaptionCopied(false), 2500)
  }

  return (
    <div
      className="rounded-2xl p-5 mb-8"
      style={{
        background: 'hsl(0 0% 100%)',
        border: `1px solid ${ROSE_BORDER}`,
        boxShadow: `0 4px 24px hsl(8 56% 76% / 0.10)`,
      }}
    >
      <p className="text-sm font-semibold mb-1" style={{ color: FOREGROUND }}>📲 Share this wardrobe</p>
      <p className="text-xs mb-4" style={{ color: MUTED }}>
        Drop it on TikTok, Instagram, or send the link to fragrance friends.
      </p>

      <div className="flex flex-col sm:flex-row gap-2">
        {/* Copy profile link */}
        <button
          onClick={copyLink}
          className="flex-1 flex items-center justify-center gap-2 text-xs font-semibold py-2.5 rounded-xl transition-colors"
          style={{
            background: ROSE_BG,
            color: ROSE_DEEP,
            border: `1px solid ${ROSE_BORDER}`,
          }}
        >
          🔗 {copied ? 'Link Copied! 🌸' : 'Copy Profile Link'}
        </button>

        {/* Copy TikTok caption */}
        <button
          onClick={copyCaption}
          className="flex-1 flex items-center justify-center gap-2 text-xs font-semibold py-2.5 rounded-xl transition-all"
          style={{
            background: captionCopied ? 'hsl(140 45% 48%)' : '#010101',
            color: '#fff',
          }}
        >
          {captionCopied ? '✅ Caption Copied!' : '🎵 Copy TikTok Caption'}
        </button>
      </div>

      {/* Preview of caption */}
      <div
        className="mt-3 rounded-xl p-3 text-[11px] leading-relaxed whitespace-pre-line font-mono"
        style={{ background: 'hsl(10 20% 96%)', color: MUTED }}
      >
        {tiktokCaption}
      </div>
    </div>
  )
}
