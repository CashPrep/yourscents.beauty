import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Why the Same Perfume Smells Different on Everyone | ScentStack',
  description: 'You sprayed it in the store. It smelled incredible. You got home and it was completely different. Here\'s the actual science behind why perfumes smell different on different people.',
  keywords: ['why does perfume smell different on me', 'why perfume smells different on everyone', 'skin chemistry and perfume', 'why does cologne smell different on skin', 'fragrance and body chemistry'],
  openGraph: {
    title: 'Why the Same Perfume Smells Different on Everyone',
    description: 'The actual science behind why perfumes smell different on different people — and what to do about it.',
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
            <span className="chip text-[10px]" style={{ padding: '2px 10px' }}>Fragrance Science</span>
            <span className="text-[11px] text-muted-foreground font-mono">5 min read · May 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-normal serif leading-tight mb-5">
            Why the Same Perfume Smells Completely Different on You
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            You tested it in the store. It smelled incredible. You wore it home and it smelled nothing like what you sampled. This happens to everyone and there\'s a specific reason for it.
          </p>
        </div>

        <div className="prose-article">

          <p>
            The paper strip test — which is how most people first encounter a fragrance — tells you almost nothing useful. A strip has no body heat, no skin oils, no pH, and no microbiome. It just burns off the top notes into the air and lets you smell the most volatile part of the fragrance. It\'s the least representative way to evaluate a perfume, and it\'s how almost everyone does it.
          </p>

          <h2>The five variables that change how a fragrance smells on you</h2>

          <h3>1. Skin pH</h3>
          <p>
            Normal skin pH sits between 4.5 and 6.2, but individual variation within that range is significant enough to noticeably affect fragrance. Acidic skin tends to intensify certain note families — particularly musks and ambers — and can make a fragrance smell richer and more complex than it does on neutral skin. More alkaline skin can push fragrances toward smelling soapy or flat, particularly with certain synthetic musks.
          </p>
          <p>
            You can\'t control your baseline pH, but you can influence it temporarily. Freshly showered skin has a slightly more alkaline surface that normalises within an hour or two. That\'s one reason why a fragrance can smell different applied right after a shower versus applied mid-afternoon.
          </p>

          <h3>2. Skin dryness and oil level</h3>
          <p>
            Oily skin holds fragrance significantly longer than dry skin. The lipid layer gives volatile molecules something to cling to instead of evaporating immediately. If you have dry skin and a fragrance seems to disappear within an hour on you, that\'s likely why. The fix is moisturiser — apply an unscented lotion before your fragrance and the longevity difference is dramatic.
          </p>
          <p>
            Oily skin also tends to amplify certain base notes. Heavy musks, animalic notes, and certain woods often perform more intensely on people with naturally oilier skin, which is why the same bottle can smell understated on one person and overwhelming on another.
          </p>

          <h3>3. Your microbiome</h3>
          <p>
            Your skin\'s bacterial microbiome — which is unique to you — interacts with fragrance molecules in ways that\'s only recently started being studied seriously. The bacteria on your skin produce their own chemical compounds that mix with fragrance ingredients and create something genuinely unique. This is the mechanism behind why some fragrances seem to "become" you in a way that\'s difficult to explain. It\'s a literal chemical reaction specific to your biology.
          </p>

          <h3>4. Diet and hydration</h3>
          <p>
            What you eat affects how you smell, and it affects how fragrance interacts with your skin. High-sulfur foods (garlic, onion, red meat in quantity) can create a baseline body odor that clashes with certain fragrance families — particularly clean florals and fresh aquatics. Certain spices come through the skin directly. Heavy alcohol consumption changes skin chemistry in ways that can flatten fragrance significantly.
          </p>
          <p>
            Good hydration doesn\'t just help with longevity — it also affects how evenly the top notes disperse. Dehydrated skin tends to make fragrance land unevenly, with some pulse points projecting strongly and others barely registering.
          </p>

          <h3>5. Body temperature</h3>
          <p>
            Warmth accelerates the evaporation of volatile molecules, which is why fragrance projects more in summer or after exercise. Higher body temperature can make a fragrance bloom significantly — which is usually a good thing for projection but can tip heavy fragrances into being too much. People who run warm tend to get more projection naturally and should consider this when choosing application weight.
          </p>

          <div className="callout">
            <p className="callout-title">The strip vs. skin gap</p>
            <p>The difference between a paper strip test and a full skin test can be significant enough that you\'re essentially evaluating two different fragrances. Always test on skin and wear for a minimum of 3–4 hours before making a purchase decision. The best test is a full day.</p>
          </div>

          <h2>Why you can\'t smell yourself</h2>
          <p>
            There\'s another layer to this: olfactory adaptation, sometimes called nose blindness. When you\'re continuously exposed to a smell, your olfactory receptors adapt to it and stop registering it as strongly. This is why you might feel like your fragrance isn\'t performing, while everyone around you notices it immediately.
          </p>
          <p>
            This adaptation happens faster with some fragrance families than others. Musks are notorious for it — they can be completely invisible to the wearer while being clearly detectable to people nearby. If someone tells you they can smell your fragrance but you can\'t smell it yourself, it\'s working exactly as intended.
          </p>

          <h2>What this means for buying decisions</h2>
          <p>
            Always test on skin. Always wear for the full drydown. Don\'t buy because it smelled good on a strip or on someone else — buy based on how it performs on your skin, in your life, with your chemistry. There is no shortcut here.
          </p>
          <p>
            It also means that blind-buying a fragrance based on online hype is always a gamble. A fragrance with thousands of glowing reviews can land completely differently on you, and that\'s not a flaw — it\'s chemistry. The only reliable data point is your own skin.
          </p>

          <div className="cta-block">
            <p className="text-sm font-semibold mb-1" style={{ color: GOLD }}>Track What Works on You</p>
            <p className="text-sm text-muted-foreground mb-4">ScentStack helps you record how fragrances perform on your skin and find patterns in what works for your specific chemistry.</p>
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
