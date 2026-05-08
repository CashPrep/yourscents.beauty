import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Layer Perfume Without It Smelling Like a Mess | ScentStack',
  description: 'A real guide on layering perfume — when to apply, which notes to combine, what order to spray, and the mistakes that make people give up before it clicks.',
  keywords: ['how to layer perfume', 'perfume layering guide', 'how to stack fragrances', 'layering cologne', 'fragrance layering tips'],
  openGraph: {
    title: 'How to Layer Perfume Without It Smelling Like a Mess',
    description: 'A real guide on layering perfume — when to apply, which notes to combine, what order to spray, and the mistakes that make people give up before it clicks.',
    type: 'article',
  },
}

const GOLD = 'hsl(42 85% 68%)'
const G_BG = 'hsl(42 85% 68% / 0.10)'
const G_BORDER = 'hsl(42 85% 68% / 0.25)'

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
            <span className="chip text-[10px]" style={{ padding: '2px 10px' }}>Technique</span>
            <span className="text-[11px] text-muted-foreground font-mono">7 min read · May 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-normal serif leading-tight mb-5">
            How to Layer Perfume Without It Smelling Like a Mess
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Most people try layering once, end up smelling like they knocked over a Sephora display, and decide it\'s not for them. That\'s not a taste problem — it\'s a sequencing problem. Here\'s how it actually works.
          </p>
        </div>

        <div className="prose-article">

          <p>
            Layering perfume is one of those things that looks effortless on people who know what they\'re doing and absolutely chaotic when you\'re just guessing. The difference isn\'t talent or a $400 nose — it\'s understanding a few basic rules about how fragrance notes behave on skin over time.
          </p>

          <h2>Why layering works at all</h2>
          <p>
            Perfume isn\'t a fixed thing. It\'s a process. From the moment you spray, the top notes are already burning off, the heart notes are building, and the base is waiting to anchor everything. When you layer two fragrances, you\'re essentially creating a third one — unique to your skin chemistry — by stacking those processes on top of each other.
          </p>
          <p>
            The reason it can go wrong is the same reason it can go right: there are a lot of volatile molecules in the air at once, and they interact. If you pick two fragrances with clashing top notes, the first few hours will be unpleasant even if the drydowns would have worked beautifully.
          </p>

          <h2>The single most important rule: heaviest goes first</h2>
          <p>
            If you take nothing else from this, take this: apply your denser, warmer, base-heavy fragrance first. Oud, amber, sandalwood, musk, patchouli — these all need body heat and time to bloom. They need to sink into your skin before they do what they\'re supposed to do.
          </p>
          <p>
            If you spray a light citrus over a fresh oud application, you\'re burying the citrus before it has a chance to open. The warm base notes will swallow it. But if you apply the oud first, give it five minutes, then spray the citrus — the citrus rides on top of that warm foundation instead of fighting it. The effect is layered rather than muddled.
          </p>

          <div className="callout">
            <p className="callout-title">The 5-minute rule</p>
            <p>Give every fragrance at least 2–5 minutes to start settling before you apply the next one. Top notes need a moment to open and start their burnoff. Layering too quickly means you\'re combining two sets of top notes simultaneously, which is usually where the "too much" problem comes from.</p>
          </div>

          <h2>Which note families work together</h2>
          <p>
            Think of fragrance families like ingredients in a kitchen. Some things naturally go together — vanilla and tobacco, bergamot and cedar, rose and oud. Others fight — heavy patchouli and sharp aquatics, sweet gourmands and dry vetiver.
          </p>
          <p>
            The easiest pairings for beginners are within the same fragrance family. Two woody scents, for example, will almost always blend without conflict. A fresh aromatic over a woody base is another reliable pairing — it\'s basically what most quality fragrances already do internally. You\'re just exaggerating that structure externally.
          </p>
          <p>
            The pairings to be more careful with are contrasting families: oriental over fresh, floral over fougère, gourmand over aquatic. These can work brilliantly, but the balance matters more. Lean toward one dominant fragrance and let the other play a supporting role.
          </p>

          <h2>Application: where you spray matters more than you think</h2>
          <p>
            Pulse points — wrists, neck, inner elbows, behind the ears — are warm, which helps fragrance project. For layering specifically, try separating the two scents by location. Apply your base fragrance to the wrists and neck, then apply the second to the chest and inner elbows. This gives each one a chance to be perceived individually before they merge in the air around you.
          </p>
          <p>
            The classic mistake is dousing both fragrances on the same spot at the same time. You lose the layered effect entirely and just end up with a blend that the skin couldn\'t distinguish.
          </p>

          <h2>Moisturise before you spray</h2>
          <p>
            Dry skin absorbs and kills fragrance faster than almost anything. If your skin is dry, top notes evaporate before they have time to interact with what\'s underneath. Apply an unscented moisturiser or body lotion before you layer — it creates a film that extends longevity and gives the scent molecules something to cling to. The difference is noticeable.
          </p>

          <h2>Start with one spray each</h2>
          <p>
            Your instinct when layering will be to use your normal number of sprays for each fragrance. Don\'t. Start with one spray of each. The combined projection of two fragrances is always significantly more than either alone, and you can always add more — you can\'t take it back. Give it fifteen minutes and see how it develops before deciding it needs more.
          </p>

          <h2>Some specific combinations worth trying</h2>
          <ul>
            <li><strong>Dior Sauvage + Creed Aventus:</strong> The ambroxan in Sauvage amplifies Aventus\' smokiness. Apply Aventus first, wait five minutes, then mist Sauvage across the chest. The result is more dimensional than either alone.</li>
            <li><strong>Tom Ford Oud Wood + any soft floral:</strong> Oud Wood is an excellent base for florals because its amber and vanilla warmth softens them. The contrast is what makes this work — warmth underneath, freshness on top.</li>
            <li><strong>Bleu de Chanel + Hermès Terre d\'Hermès:</strong> Both are woody-aromatic, which means they layer without conflict. Terre adds earthiness, Bleu adds the bright citrus top. Together it reads as a more complex version of either.</li>
          </ul>

          <h2>When layering doesn\'t work: be honest about it</h2>
          <p>
            Not every combination is going to click. Sometimes two fragrances that look good on paper — complementary notes, similar families — just don\'t work on your specific skin chemistry. That\'s real and it\'s not a failure. Skin pH, diet, and natural scent all affect how molecules interact on you personally.
          </p>
          <p>
            Test new combinations at home before you commit them to an important day. Wear them for a few hours, see how the drydown lands, ask someone you trust. The best layered fragrances feel inevitable — like they were always supposed to smell that way.
          </p>

          <div className="cta-block">
            <p className="text-sm font-semibold mb-1" style={{ color: GOLD }}>Try the ScentStack Builder</p>
            <p className="text-sm text-muted-foreground mb-4">Add your bottles and get compatibility-scored stack recommendations for every occasion — built from what you already own.</p>
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
