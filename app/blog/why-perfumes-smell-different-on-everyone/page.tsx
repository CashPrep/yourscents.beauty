import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Why the Same Perfume Smells Different on You | Your Scents",
  description: "You tested it on a strip. Smelled incredible. Wore it home and it smelled nothing like what you tried. Here is the actual science.",
  openGraph: { title: "Why the Same Perfume Smells Completely Different on You", description: "The actual science behind why fragrance smells different on different people.", type: 'article' },
}

const R_DEEP   = 'hsl(3 40% 58%)'
const R_BORDER = 'hsl(8 56% 76% / 0.32)'
const CREAM    = 'hsl(18 50% 97%)'
const FG       = 'hsl(5 25% 22%)'
const MUTED    = 'hsl(8 15% 52%)'

export default function ArticlePage() {
  return (
    <div className="min-h-screen" style={{ background: CREAM }}>
      <header className="fixed top-0 inset-x-0 z-50 border-b" style={{ background: 'hsl(18 60% 98% / 0.92)', backdropFilter: 'blur(20px)', borderColor: R_BORDER }}>
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <Image src="/logo.png" alt="Your Scents" width={120} height={48} className="h-11 w-auto object-contain" priority />
          </Link>
          <Link href="/blog" className="text-sm hover:text-foreground transition-colors" style={{ color: MUTED }}>← All guides</Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 pt-32 pb-24">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="chip text-[10px]" style={{ padding: '2px 10px' }}>Fragrance Science</span>
            <span className="text-[11px] font-mono" style={{ color: MUTED }}>5 min read · May 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-normal serif leading-tight mb-5" style={{ color: FG }}>Why the Same Perfume Smells Completely Different on You</h1>
          <p className="text-lg leading-relaxed" style={{ color: MUTED }}>You tested it on a strip. Smelled incredible. Wore it home and it smelled nothing like what you tried. Here is the actual science behind why.</p>
        </div>

        <div className="prose-article">
          <p>Fragrance doesn't smell the same on everyone because fragrance isn't applied to an inert surface — it's applied to skin, which has its own chemistry, temperature, moisture level, and microbiome. The formula in the bottle is identical. What happens to it after application isn't.</p>

          <h2>Skin pH</h2>
          <p>Your skin's pH level directly affects how fragrance molecules volatilise. Acidic skin (lower pH) tends to project fragrance faster but with less longevity — the top notes burn through quickly. Alkaline skin holds fragrance longer but may suppress certain top notes, making the opening smell flatter than expected. Most people have slightly acidic skin (pH 4.5–6.5), but there's meaningful variation within that range that explains why the same perfume can smell sharp and fresh on one person and warm and muted on another.</p>

          <h2>Body heat and skin type</h2>
          <p>Heat is what releases fragrance molecules from the skin surface. Warmer body temperature means stronger projection and faster drydown — the fragrance moves through its stages more quickly. People who run warm often find that fragrances fade faster on them. Oily skin holds fragrance significantly longer than dry skin; the oils provide a medium for the molecules to bind to. This is why fragrance professionals recommend applying moisturiser before spraying — the lotion acts as a surrogate for skin oils.</p>

          <div className="callout">
            <p className="callout-title">The strip vs. skin problem</p>
            <p>Paper testing strips don't have pH, heat, or oils. They give you a reasonably accurate picture of the top and heart notes but tell you almost nothing about the base. The base notes — where most of the character of a fragrance lives — only emerge after the top has fully evaporated and the fragrance has been affected by skin chemistry. This is why a 30-minute skin test is the minimum before buying anything, and 4 hours is better.</p>
          </div>

          <h2>Olfactory fatigue</h2>
          <p>You stop smelling your own fragrance about 30 minutes after application. This is olfactory adaptation — your brain filters out constant background stimuli. It doesn't mean the fragrance has faded; it means your nose has stopped reporting it. Other people can still smell you perfectly well. This is why people over-apply — they can't smell themselves and assume they need more. The correct instinct is to apply less than you think you need and trust that it's working.</p>

          <h2>Genetic smell perception</h2>
          <p>There are specific aromachemicals that a significant percentage of the population simply cannot smell due to genetic variation in olfactory receptors. Androstenone, found in many woody-musky fragrances, is perceived as unpleasant (sweaty, urinous) by some people, as pleasant (woody, sweet) by others, and not at all by roughly 30–40% of people. Iso E Super — the backbone of many cedar-based fragrances including Molecule 01 — is similarly variable. A fragrance that smells powerfully woody to you might smell like almost nothing to someone else. This is why fragrance is irreducibly personal.</p>

          <div className="cta-block">
            <p className="text-sm font-semibold mb-1" style={{ color: R_DEEP }}>Discover your scent DNA</p>
            <p className="text-sm mb-4" style={{ color: MUTED }}>Your Scents analyses your collection to map your personal note preferences and suggest fragrances that will actually work on you.</p>
            <Link href="/signup"><button className="btn-gold px-6 py-2.5 text-sm">Start Free ✨</button></Link>
          </div>
        </div>
      </main>

      <footer className="border-t py-10 px-6" style={{ background: 'hsl(18 40% 93%)', borderColor: R_BORDER }}>
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Image src="/logo.png" alt="Your Scents" width={90} height={36} className="h-8 w-auto object-contain" />
          <Link href="/blog" className="text-xs hover:text-foreground transition-colors" style={{ color: MUTED }}>← Back to guides</Link>
        </div>
      </footer>
    </div>
  )
}
