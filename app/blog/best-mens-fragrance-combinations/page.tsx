import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "The Best Men's Fragrance Combinations That Actually Work | Your Scents",
  description: "Specific men's fragrance layering combinations with exactly why each pairing works — tested on skin, not just on paper.",
  openGraph: { title: "The Best Men's Fragrance Combinations That Actually Work", description: "Specific fragrance combinations with exactly why each pairing works.", type: 'article' },
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
            <span className="chip text-[10px]" style={{ padding: '2px 10px' }}>Stack Guide</span>
            <span className="text-[11px] font-mono" style={{ color: MUTED }}>7 min read · May 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-normal serif leading-tight mb-5" style={{ color: FG }}>The Best Men's Fragrance Combinations That Actually Work</h1>
          <p className="text-lg leading-relaxed" style={{ color: MUTED }}>Layering isn't just a trend. These specific combos have been tested on real skin — with exactly why each pairing is effective.</p>
        </div>

        <div className="prose-article">
          <p>Layering men's fragrance is different from layering women's in one important way: the note families you're working with tend to be drier and more linear. Most popular men's fragrances are built around a woody-aromatic or fresh-citrus structure, which makes them easier to layer without conflict but requires more precision to make something genuinely interesting.</p>

          <div className="callout">
            <p className="callout-title">Sauvage + Aventus</p>
            <p><strong>Compatibility: Exceptional.</strong> Apply Aventus first — let the pineapple and bergamot top open for 3–5 minutes. Then one spray of Sauvage across the chest. The ambroxan in Sauvage acts as an amplifier, turning up the volume on Aventus's woody-smoky base without adding a competing note. The result is a more dimensional, more projected Aventus. One spray only — ambroxan is potent.</p>
          </div>

          <div className="callout">
            <p className="callout-title">Oud Wood + Molecule 01</p>
            <p><strong>Compatibility: Excellent.</strong> Molecule 01 is almost entirely Iso E Super — a cedarwood-derived aromachemical that amplifies woody fragrances and significantly extends longevity. Apply Molecule 01 first (it's near-scentless). Then apply Oud Wood to pulse points. The cedar and rosewood in Oud Wood push from 6–7 hours toward 10–12. The combination also acquires a slightly more skin-close quality — better for intimate settings.</p>
          </div>

          <div className="callout">
            <p className="callout-title">Bleu de Chanel + Terre d'Hermès</p>
            <p><strong>Compatibility: Very Good.</strong> Both share the woody-citrus structure — they layer without fighting. Terre adds earthy, flint-and-pepper complexity that Bleu lacks. The grapefruit in both bridges them into a single coherent accord. Apply Terre first, then Bleu. Moderate projection, sophisticated character. Excellent for work environments.</p>
          </div>

          <div className="callout">
            <p className="callout-title">Acqua di Gio Profumo + Guerlain Vetiver</p>
            <p><strong>Compatibility: Very Good.</strong> Profumo has a beautiful incense note in the heart that gets overshadowed by its aquatic opening. Guerlain Vetiver — dry, smoky, barbershop — pairs with that incense and grounds the whole fragrance. Apply Profumo first, then a light spray of Vetiver on the wrists only. The result is an incense-vetiver accord on an aquatic base that smells like one complex fragrance, not two.</p>
          </div>

          <h2>Combinations to avoid</h2>
          <p>Heavy aquatics over heavy orientals — the freshness conflicts with warm amber bases throughout the entire drydown. Two lavender-forward fragrances — lavender amplifies itself to an uncomfortable degree. Gourmand over gourmand — sweet over sweet becomes cloying; if you want to amplify a gourmand, layer with something dry like vetiver or cedar.</p>

          <h2>Application principles</h2>
          <ul>
            <li>Base fragrance first — oud, amber, musk, sandalwood before fresher notes</li>
            <li>Wait 3–5 minutes between applications</li>
            <li>One spray each — combined projection exceeds individual projection</li>
            <li>Moisturise first — lotion extends longevity significantly</li>
          </ul>

          <div className="cta-block">
            <p className="text-sm font-semibold mb-1" style={{ color: R_DEEP }}>Build stacks from your actual wardrobe</p>
            <p className="text-sm mb-4" style={{ color: MUTED }}>Add your bottles to Your Scents and get compatibility-scored combinations built from your specific collection.</p>
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
