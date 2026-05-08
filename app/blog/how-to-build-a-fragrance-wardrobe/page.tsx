import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Build a Fragrance Wardrobe From Scratch | ScentStack',
  description: 'You don\'t need 40 bottles. You need the right 6. Here\'s a practical framework for building a fragrance collection that covers every situation in your life.',
  keywords: ['how to build a fragrance wardrobe', 'perfume collection guide', 'how many perfumes to own', 'fragrance wardrobe guide', 'building a cologne collection'],
  openGraph: {
    title: 'How to Build a Fragrance Wardrobe From Scratch',
    description: 'A practical guide to building a perfume collection that covers every situation in your life without buying 40 bottles.',
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
            <span className="chip text-[10px]" style={{ padding: '2px 10px' }}>Collection</span>
            <span className="text-[11px] text-muted-foreground font-mono">8 min read · May 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-normal serif leading-tight mb-5">
            How to Build a Fragrance Wardrobe From Scratch
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Most people build a fragrance collection by accident — buying whatever smells good in the moment, ending up with duplicates, and still feeling like they have nothing to wear. Here\'s a framework that actually works.
          </p>
        </div>

        <div className="prose-article">

          <p>
            A wardrobe analogy is the right one here. You wouldn\'t buy 15 pairs of nearly identical jeans — you\'d think about what occasions you need to dress for and make sure you have something that works for each. Fragrance is the same. The goal isn\'t quantity. It\'s coverage.
          </p>

          <h2>The six-bottle framework</h2>
          <p>
            If you build strategically, six fragrances can cover your entire life. Most people with 20 bottles are still reaching for the same two or three every day because they never thought about the gaps. Here\'s how to think about the six categories:
          </p>

          <ul>
            <li><strong>Your daily driver</strong> — versatile, inoffensive to strangers, works in most contexts. This is what you grab on autopilot. Examples: Bleu de Chanel, Hermès H24, Acqua di Gio Profumo.</li>
            <li><strong>Your evening/date fragrance</strong> — warmer, more presence up close, appropriate for dim lighting and close quarters. Examples: Tom Ford Oud Wood, YSL La Nuit, Creed Aventus.</li>
            <li><strong>Your summer fragrance</strong> — light, fresh, high longevity in heat. Examples: Dior Homme Cologne, Maison Margiela Replica Beach Walk, Jo Malone Wood Sage and Sea Salt.</li>
            <li><strong>Your winter fragrance</strong> — heavy, rich, cold-weather specific. Examples: Kilian Black Phantom, Guerlain Heritage, anything heavy amber/oud/vanilla.</li>
            <li><strong>Your occasion wild card</strong> — something unusual that you save for events where you want to make a statement. This is the bottle you don\'t wear every week.</li>
            <li><strong>Your layering base</strong> — a simple, skin-close musk or sandalwood that you apply first and build over. Examples: Le Labo Santal 33, Molecule 01, Commes des Garçons Wonderwood.</li>
          </ul>

          <p>
            Start with 1 and 2. Get those right before anything else. Those two slots alone will cover probably 80% of your life.
          </p>

          <h2>How to test before you commit</h2>
          <p>
            The biggest waste of money in fragrance is buying based on strip tests or the first five minutes of wearing. Both are dominated entirely by top notes, which are gone within 30 minutes and are often the least representative part of a fragrance.
          </p>
          <p>
            The only reliable test is wearing a sample on skin for a full day. You need to experience the drydown — the base notes that are still present at hour 6 or 8. Most decent fragrance retailers offer samples, and sites like Decant X or Fragrance.net sell them for most popular bottles. Never buy a full bottle of something you haven\'t worn for at least one full day.
          </p>

          <div className="callout">
            <p className="callout-title">The sample rule</p>
            <p>One sample, one full day of wear, before any full bottle purchase. If you\'re buying something over $100, wear it twice. Fragrance smells different depending on your mood, what you ate, and your skin\'s hydration level. One test on a stressful Thursday might not represent what the same bottle does on a relaxed Saturday.</p>
          </div>

          <h2>What most beginners get wrong</h2>
          <p>
            Over-indexing on freshies. Aquatic and citrus fragrances are the easiest to appreciate immediately because they smell clean and inoffensive right out of the bottle. They also tend to have low longevity, low complexity, and very little that separates them from each other. A beginner wardrobe full of fresh fragrances is a wardrobe where every bottle does approximately the same job.
          </p>
          <p>
            The second mistake is being afraid of the unusual. Fragrances that smell immediately comfortable are rarely the ones that get remembered. The bottles that people stop you about, that make people ask what you\'re wearing — those are almost always slightly strange. Something that takes a minute to understand is almost always more interesting than something that\'s immediately pleasant.
          </p>

          <h2>Budget: where to spend and where to save</h2>
          <p>
            Spend money on your daily driver and your evening fragrance. These are the bottles you\'ll go through fastest and that make the most difference in how you present yourself day-to-day. A $120 bottle used daily is better value than six $40 bottles you rotate out of obligation.
          </p>
          <p>
            Your summer fragrance can usually be mid-tier or even drugstore. Summer fragrances are context-specific, lower-stakes, and frankly the quality ceiling is lower because you\'re not asking them to do very much. Davidoff Cool Water, Dior Homme Sport, Acqua di Gio — these all perform well in summer without requiring a significant investment.
          </p>
          <p>
            Your winter fragrance is worth spending on if you find the right one, because heavy orientals and ouds age interestingly — they often smell better after the top notes have fully settled. If you\'re going to cellar a bottle, make it a winter one.
          </p>

          <h2>Layering compatibility: building for flexibility</h2>
          <p>
            One thing most people don\'t consider when building a wardrobe is how the bottles will interact with each other. If you choose fragrances that layer well together, six bottles effectively becomes many more combinations. The layering base slot exists specifically for this — a simple, clean musk or sandalwood that pairs with almost everything amplifies the entire wardrobe.
          </p>
          <p>
            Molecule 01 (Escentric Molecules) is the most efficient layering base available. It\'s almost entirely Iso E Super, a synthetic molecule that amplifies the woody notes in almost any fragrance it\'s layered with and extends longevity. Spray it first, let it settle two minutes, then apply your chosen fragrance over it. The result consistently outperforms either one alone.
          </p>

          <div className="cta-block">
            <p className="text-sm font-semibold mb-1" style={{ color: GOLD }}>Map Your Wardrobe Gaps</p>
            <p className="text-sm text-muted-foreground mb-4">Add your current bottles to ScentStack and see which occasions you have covered and which you\'re missing. Takes two minutes.</p>
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
