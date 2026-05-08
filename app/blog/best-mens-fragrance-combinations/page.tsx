import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "The Best Men's Fragrance Combinations That Actually Work | ScentStack",
  description: "Specific men's fragrance layering combinations with exactly why each pairing works — tested on skin, not just on paper.",
  keywords: ["men's fragrance combinations", 'best cologne to layer together', 'fragrance stacking men', 'cologne layering guide', 'best perfume combinations for men'],
  openGraph: {
    title: "The Best Men's Fragrance Combinations That Actually Work",
    description: "Specific fragrance layering combinations with exactly why each pairing works.",
    type: 'article',
  },
}

const GOLD = 'hsl(42 85% 68%)'

export default function ArticlePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed top-0 inset-x-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: GOLD }}>
              <span className="text-[hsl(220_18%_6%)] text-xs font-bold">S</span>
            </div>
            <span className="text-base font-semibold tracking-tight">ScentStack</span>
          </Link>
          <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">← All guides</Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 pt-32 pb-24">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="chip text-[10px]" style={{ padding: '2px 10px' }}>Stack Guide</span>
            <span className="text-[11px] text-muted-foreground font-mono">7 min read · May 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-normal serif leading-tight mb-5">
            The Best Men\'s Fragrance Combinations That Actually Work
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Most lists of fragrance combinations exist to fill a page. These are specific pairings that work on skin for a specific chemical reason — with exactly how to apply each one.
          </p>
        </div>

        <div className="prose-article">

          <p>
            Layering men\'s fragrance is different from layering women\'s in one important way: the note families you\'re working with tend to be drier and more linear. Most popular men\'s fragrances are built around a woody-aromatic or fresh-citrus structure, which makes them easier to layer without conflict but requires more precision to make something genuinely interesting rather than just more of the same.
          </p>
          <p>
            What follows are pairings that work. Not theoretically — in practice, on skin, tested over time.
          </p>

          <div className="callout">
            <p className="callout-title">Sauvage + Aventus</p>
            <p><strong>Compatibility: Exceptional</strong></p>
            <p>This is one of the most discussed pairings in the fragrance community and the discussion is warranted. Apply Aventus first — you need the pineapple and bergamot top to open before you add anything. Wait three to five minutes. Then spray Sauvage once across the chest. The ambroxan molecule in Sauvage\'s core acts as an amplifier — it doesn\'t add a new note, it turns up the volume on the woody-smoky base of Aventus. What you end up with is a more dimensional, more projected version of Aventus with Sauvage\'s clean freshness in the top. The key is restraint: one spray of Sauvage, no more.</p>
          </div>

          <div className="callout">
            <p className="callout-title">Oud Wood + Molecule 01</p>
            <p><strong>Compatibility: Excellent</strong></p>
            <p>Molecule 01 is almost entirely Iso E Super, a cedarwood-derived aromachemical that has a unique amplifying effect on woody fragrances. Apply Molecule 01 first — it\'s basically scentless for the first few minutes. Then apply Oud Wood to pulse points. What Molecule 01 does is extend the cedar and rosewood elements in Oud Wood and push the longevity significantly. A fragrance that normally lasts 6–7 hours starts approaching 10–12. It also gives the fragrance a slightly more diffused, skin-close quality that makes it more appropriate for close contact situations. This is the combination to wear to anything where you want presence without projection.</p>
          </div>

          <div className="callout">
            <p className="callout-title">Bleu de Chanel + Terre d\'Hermès</p>
            <p><strong>Compatibility: Very Good</strong></p>
            <p>Both fragrances share the woody-citrus space, which means they layer without fighting. Terre adds the earthy, flint-and-pepper complexity that Bleu lacks — Bleu is clean and linear, Terre is mineral and textured. Applied together (Terre first, then Bleu), the combination reads as a single more complex fragrance rather than two separate ones. The grapefruit in both bridges them. This pairing is excellent for work environments where you want to smell interesting but not loud — the combined projection is moderate and the character is sophisticated without being unusual enough to get commented on.</p>
          </div>

          <div className="callout">
            <p className="callout-title">Acqua di Gio Profumo + Guerlain Vetiver</p>
            <p><strong>Compatibility: Very Good</strong></p>
            <p>Acqua di Gio Profumo has a gorgeous incense note in the heart that tends to get overshadowed by the aquatic opening. Guerlain Vetiver, a classic barbershop-style vetiver, adds a dry, smoky earthiness that pairs with that incense note and grounds the whole thing. Apply Profumo first, then add a light spray of Vetiver to the wrists only. The result is an incense-vetiver accord sitting on an aquatic base that\'s genuinely unusual and hard to identify as two separate fragrances.</p>
          </div>

          <div className="callout">
            <p className="callout-title">Kilian Black Phantom + Tobacco Vanille (Tom Ford)</p>
            <p><strong>Compatibility: Good (winter only)</strong></p>
            <p>This is a heavy one and should only be used in cold weather. Both fragrances are in the oriental-gourmand space — rum and caramel in Black Phantom, tobacco and spiced vanilla in Tobacco Vanille. Applied together they create an extraordinarily rich, dark, almost dessert-like experience. One spray of each, maximum. This is a fragrance you wear to evening events in winter when you want to make a specific statement. Do not layer this for office or daytime wear.</p>
          </div>

          <h2>The pairings to avoid</h2>
          <p>
            Heavy aquatics over heavy orientals — the freshness of aquatic fragrances (Cool Water, the original Acqua di Gio) creates an almost chemical conflict with warm amber and musk bases. They don\'t blend so much as fight for dominance throughout the drydown.
          </p>
          <p>
            Two fragrances with prominent lavender — lavender amplifies itself to an uncomfortable degree when doubled up. Single-note-heavy fragrances generally layer worse than complex ones because there\'s nothing for the second scent to support or contrast.
          </p>
          <p>
            Gourmand over another gourmand — sweet over sweet almost always becomes cloying. If you want to amplify a gourmand, layer it with something dry: vetiver, cedar, tobacco. The contrast is what makes it work.
          </p>

          <h2>General application principles for men\'s layering</h2>
          <ul>
            <li>Apply to dry, moisturised skin — apply unscented lotion first, wait two minutes</li>
            <li>Base fragrance first, always — oud, amber, musk, sandalwood go on before fresher notes</li>
            <li>Wait 3–5 minutes between applications — let the first fragrance start to open</li>
            <li>One spray each — combined projection is always more than individual projection</li>
            <li>Don\'t rub — rubbing crushes top notes and breaks the accord you\'ve just built</li>
          </ul>

          <div className="cta-block">
            <p className="text-sm font-semibold mb-1" style={{ color: GOLD }}>Find Your Perfect Stack</p>
            <p className="text-sm text-muted-foreground mb-4">Add your bottles to ScentStack and get compatibility-scored combinations built from your actual wardrobe — including occasion-specific recommendations.</p>
            <Link href="/signup"><button className="btn-gold px-6 py-2.5 text-sm">Build My Wardrobe Free</button></Link>
          </div>

        </div>
      </main>

      <footer className="border-t border-border py-10 px-6" style={{ background: 'hsl(220 18% 5%)' }}>
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} ScentStack</p>
          <Link href="/blog" className="text-xs text-muted-foreground hover:text-foreground transition-colors">← Back to guides</Link>
        </div>
      </footer>
    </div>
  )
}
