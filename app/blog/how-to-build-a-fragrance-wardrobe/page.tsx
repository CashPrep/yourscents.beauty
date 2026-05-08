import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "How to Build a Fragrance Wardrobe From Scratch | Your Scents",
  description: "You don't need 40 bottles. You need the right 6. A practical guide to building a collection that covers every situation.",
  openGraph: { title: "How to Build a Fragrance Wardrobe From Scratch", description: "A practical guide to building a fragrance collection that covers every situation in your life.", type: 'article' },
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
            <span className="chip text-[10px]" style={{ padding: '2px 10px' }}>Collection</span>
            <span className="text-[11px] font-mono" style={{ color: MUTED }}>8 min read · May 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-normal serif leading-tight mb-5" style={{ color: FG }}>How to Build a Fragrance Wardrobe From Scratch</h1>
          <p className="text-lg leading-relaxed" style={{ color: MUTED }}>You don't need 40 bottles. You need the right 6. A practical guide to building a collection that covers every situation in your life.</p>
        </div>

        <div className="prose-article">
          <p>Most people build fragrance collections by accident — they receive a gift, they impulse-buy at a counter, they're swayed by an ad. The result is a shelf of 12 bottles where 3 never get worn and 4 overlap so completely that using any of them feels redundant.</p>
          <p>A wardrobe approach treats fragrance like clothing: each piece has a function, a season, and an occasion. You buy for coverage, not accumulation.</p>

          <h2>The 6-bottle framework</h2>
          <p>One fragrance for each of these roles: everyday casual, work/office, date night, special occasion, summer, winter. Six bottles covers virtually every scenario. If you have overlap — two bottles that could both serve as your everyday scent — that's a gap somewhere else.</p>

          <div className="callout">
            <p className="callout-title">Slot 1: Everyday casual</p>
            <p>Something you can spray without thinking. Light, clean, unoffensive to anyone in proximity. Good options: Marc Jacobs Daisy, Jo Malone English Pear &amp; Freesia, Glossier You, Versace Bright Crystal. The brief is easy to wear, not exciting.</p>
          </div>

          <div className="callout">
            <p className="callout-title">Slot 2: Work / office</p>
            <p>The hardest slot to fill well. Needs to be present enough to feel intentional but never noticeable enough to bother colleagues. Projection is the constraint, not character. Armani Sì, Chanel Chance Eau Tendre, Lancôme La Vie Est Belle at 1–2 sprays. Nothing with heavy sillage.</p>
          </div>

          <div className="callout">
            <p className="callout-title">Slot 3: Date night / evening</p>
            <p>Warmer, more complex, more projected than your everyday. Black Opium, Viktor &amp; Rolf Flowerbomb, YSL Libre, Mugler Alien. These are fragrances that reward closeness — they evolve significantly from application to drydown and smell different at 1 hour than at 4.</p>
          </div>

          <div className="callout">
            <p className="callout-title">Slot 4: Special occasion</p>
            <p>Your best bottle. Something you don't reach for casually — a niche fragrance, a vintage, something with genuine sillage and presence. Byredo Bal d'Afrique, Maison Margiela Replica Beach Walk, a Tom Ford Private Blend. This is the fragrance you remember wearing at specific moments.</p>
          </div>

          <div className="callout">
            <p className="callout-title">Slots 5–6: Seasonal</p>
            <p>Summer wants freshness: citruses, aquatics, light florals. Something that doesn't project into heat. Winter wants warmth and depth: vanilla, amber, sandalwood, spice. Having a seasonal rotation prevents your wardrobe from feeling stale — the same fragrance worn year-round loses its context.</p>
          </div>

          <h2>What to buy first</h2>
          <p>Start with your everyday slot and your date night slot. These two bottles will cover 90% of your actual usage. Add the seasonal slots next — summer if it's spring, winter if it's fall. Work and special occasion can wait until you know your preferences better.</p>
          <p>Don't buy anything until you've worn a sample on skin for at least 4 hours. Fragrance smells different on skin than on a strip, and it smells different at hour 4 than at minute 1. The base notes — the ones that determine whether you love something — don't appear until the top has burned off.</p>

          <div className="cta-block">
            <p className="text-sm font-semibold mb-1" style={{ color: R_DEEP }}>Track your wardrobe on Your Scents</p>
            <p className="text-sm mb-4" style={{ color: MUTED }}>See which slots your collection covers, which are missing, and get suggestions to fill the gaps.</p>
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
