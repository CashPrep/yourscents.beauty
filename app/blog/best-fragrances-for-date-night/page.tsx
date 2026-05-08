import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "The Best Fragrances for Date Night | Your Scents",
  description: "Not all date night fragrances are created equal. Here's what projects well, lasts through dinner, and stacks effectively.",
  openGraph: { title: "The Best Fragrances for Date Night (And How to Stack Them)", description: "What actually works for date night — projection, longevity, and pairings.", type: 'article' },
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
            <span className="chip text-[10px]" style={{ padding: '2px 10px' }}>Occasion Guide</span>
            <span className="text-[11px] font-mono" style={{ color: MUTED }}>6 min read · May 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-normal serif leading-tight mb-5" style={{ color: FG }}>The Best Fragrances for Date Night (And How to Stack Them)</h1>
          <p className="text-lg leading-relaxed" style={{ color: MUTED }}>Not all date night fragrances are created equal. Some project too loud. Some fade before dinner ends. Here&apos;s what actually works.</p>
        </div>

        <div className="prose-article">
          <p>Date night fragrance has a specific brief: intimate projection, moderate-to-strong longevity, and a character that&apos;s interesting close-up without being aggressive at arm&apos;s length. Most fragrances fail at least one of those criteria.</p>

          <h2>What &ldquo;intimate projection&rdquo; actually means</h2>
          <p>Projection is how far a fragrance radiates from skin. Sillage is the trail it leaves. For date night, you want a fragrance that&apos;s noticeable within 1–2 feet but doesn&apos;t arrive in the room before you do. Heavy ambroxan-based fragrances (Sauvage, most flankers) project too broadly. Skin-scent musks (Glossier You, Maison Margiela Replica Lazy Sunday Morning) project well within close range but may be too subtle for an opening statement.</p>
          <p>The sweet spot: oriental-florals and musky-florals. They project warmly without diffusing widely. Black Opium, YSL Libre, Lancôme La Vie Est Belle, Viktor &amp; Rolf Flowerbomb all hit this range.</p>

          <div className="callout">
            <p className="callout-title">Black Opium + Flowerbomb</p>
            <p>Apply Flowerbomb first — it&apos;s the louder, richer of the two and needs to settle. Wait five minutes. Then add one spray of Black Opium to the wrists. The coffee-vanilla of Black Opium merges with the sweet-floral of Flowerbomb and creates a single, more complex accord than either achieves alone. The combination has exceptional longevity — both fragrances have strong base notes that anchor each other.</p>
          </div>

          <div className="callout">
            <p className="callout-title">YSL Libre + Mugler Alien</p>
            <p>This is a more unusual pairing. Libre is a lavender-orange blossom-musk built around a gender-fluid tension between floral and aromatic. Alien is a white floral amber — Casablanca lily over white amber. The two share a warmth and a slightly abstract quality that makes the combination smell expensive and hard to identify. Apply Alien first (it&apos;s heavier), then Libre on top. Moderate projection, very good longevity.</p>
          </div>

          <h2>Fragrances that don&apos;t work for date night</h2>
          <p>Aquatics and fresh citruses fade too quickly — you&apos;ll be unscented by the main course. Heavy ouds project too broadly and read as high-effort. Extremely linear fragrances (same note from application to drydown) don&apos;t reward closeness — part of what makes a fragrance attractive is the way it evolves over time.</p>

          <h2>Longevity: how to make it last</h2>
          <ul>
            <li>Apply to moisturised skin — fragrance clings to hydration; dry skin burns through scent fast</li>
            <li>Pulse points only — wrists, neck, behind ears, inner elbows; heat projects the scent</li>
            <li>Don&apos;t reapply mid-evening — you&apos;ll over-apply and kill the subtlety you built</li>
            <li>Fragrance on hair lasts longest of all — one very light spray on a brush, then run through hair</li>
          </ul>

          <div className="cta-block">
            <p className="text-sm font-semibold mb-1" style={{ color: R_DEEP }}>Build your date night stack</p>
            <p className="text-sm mb-4" style={{ color: MUTED }}>Add your bottles to Your Scents and get occasion-specific stack recommendations scored by compatibility, projection, and longevity.</p>
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
