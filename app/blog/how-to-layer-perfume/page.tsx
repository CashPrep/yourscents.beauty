import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "How to Layer Perfume Without It Smelling Like a Mess | Your Scents",
  description: "A practical guide to fragrance layering that actually works — technique, note families, and combinations to try first.",
  openGraph: { title: "How to Layer Perfume Without It Smelling Like a Mess", description: "A practical guide to fragrance layering that actually works.", type: 'article' },
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
            <span className="chip text-[10px]" style={{ padding: '2px 10px' }}>Technique</span>
            <span className="text-[11px] font-mono" style={{ color: MUTED }}>7 min read · May 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-normal serif leading-tight mb-5" style={{ color: FG }}>How to Layer Perfume Without It Smelling Like a Mess</h1>
          <p className="text-lg leading-relaxed" style={{ color: MUTED }}>Most people who try layering end up with something that smells like a candle store exploded. Here's how to actually do it right.</p>
        </div>

        <div className="prose-article">
          <p>Fragrance layering works on one principle: complementary note families amplify each other. Conflicting note families fight for dominance and produce something that smells muddled or synthetic. Almost every bad layering experience comes from ignoring which family a fragrance belongs to.</p>

          <h2>The four safe families to layer within</h2>
          <p>Florals layer well with musks, powdery notes, and light woods. Fresh citruses layer well with aquatics and green notes. Orientals (amber, vanilla, musk) layer well with each other and with light woods. Woody notes are the most versatile — they sit underneath almost anything without conflict.</p>
          <p>Florals over heavy orientals almost always clash. The warmth of amber or oud competes with the brightness of rose or peony and neither wins. Aquatics over gourmands have a similar problem — the sweetness and the synthetic freshness create a confusing accord that doesn't read as anything specific.</p>

          <div className="callout">
            <p className="callout-title">The two-fragrance rule</p>
            <p>Start with exactly two fragrances. One base — something warm, woody, or musky — and one top layer that's fresher or more complex. The base provides longevity and depth. The top layer provides character. Three fragrances is almost always too many.</p>
          </div>

          <h2>Application order</h2>
          <p>Apply the heavier, longer-lasting fragrance first — oud, sandalwood, amber, musk. Let it settle for 3–5 minutes. Then apply the lighter fragrance on top. The warmer base draws the lighter top notes into the skin and holds them longer. Reversing the order means the lighter fragrance disappears before the combination even develops.</p>

          <h2>Where to apply each layer</h2>
          <p>The base fragrance goes to warm pulse points: inner wrists, neck, chest. The top layer can go slightly above — the back of the wrists, the collar. You want a slight spatial separation so both frags have room to develop rather than immediately mixing into one undifferentiated accord on the same patch of skin.</p>

          <div className="callout">
            <p className="callout-title">Starter combinations that reliably work</p>
            <p><strong>Floral + musk:</strong> Jo Malone Peony &amp; Blush Suede under Glossier You. The peony is amplified by the musk and the skin-chemistry effect of Exaltolide creates something that smells genuinely personal.</p>
            <p><strong>Fresh + woody:</strong> Dior Sauvage base with a single spray of Bleu de Chanel on top. Both share cedar in the base, which means they merge rather than conflict.</p>
            <p><strong>Oriental + oriental:</strong> Black Opium base with Lancôme La Vie Est Belle. Both are in the sweet-floral-oriental family. The coffee-vanilla of Black Opium deepens the iris-praline of La Vie Est Belle.</p>
          </div>

          <h2>When it's not working</h2>
          <p>If the combination smells sharp, chemical, or "off" within the first 10 minutes, it's a compatibility problem — not an application problem. The top notes of two fragrances interact differently on skin than they do in the air. The only solution is to try a different pairing. You can't fix a bad combination by adjusting spray count or placement.</p>

          <div className="cta-block">
            <p className="text-sm font-semibold mb-1" style={{ color: R_DEEP }}>Build stacks from your actual wardrobe</p>
            <p className="text-sm mb-4" style={{ color: MUTED }}>Add your bottles to Your Scents and get AI-scored stack suggestions based on your specific fragrance collection.</p>
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
