import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Fragrances for Date Night (And How to Stack Them) | ScentStack',
  description: 'The fragrances that actually work for date night — not just the ones that get recommended. Plus exactly how to layer them for maximum effect.',
  keywords: ['best perfume for date night', 'date night fragrance', 'romantic cologne', 'best cologne for dates', 'fragrance for dating'],
  openGraph: {
    title: 'Best Fragrances for Date Night (And How to Stack Them)',
    description: 'The fragrances that actually work for date night — not just the ones that get recommended.',
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
            <span className="chip text-[10px]" style={{ padding: '2px 10px' }}>Occasion Guide</span>
            <span className="text-[11px] text-muted-foreground font-mono">6 min read · May 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-normal serif leading-tight mb-5">
            The Best Fragrances for Date Night (And How to Stack Them)
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            The problem with most date night fragrance advice is that it\'s written by people recommending whatever\'s popular, not whatever actually performs on a date. Here\'s what to consider and what\'s genuinely worth wearing.
          </p>
        </div>

        <div className="prose-article">

          <p>
            Date night fragrance has specific requirements that most other occasions don\'t. You need something that works in close proximity — that means projection matters less than skin-presence, or what the fragrance community calls "sillage up close." You also need longevity through a multi-hour evening. And you need something that doesn\'t announce itself the moment you walk in the room.
          </p>

          <h2>What to look for (and avoid)</h2>
          <p>
            Avoid high-projection freshies for close encounters. A lot of popular fragrances — Sauvage, Bleu, the entire aquatic genre — are designed to project outward and fill a room. That\'s great for the office or a social event, but on a date those same fragrances can feel aggressive in close quarters. What you want is something that\'s detectable up close but not confrontational from across the table.
          </p>
          <p>
            What works well is warm, skin-close base notes — musks, ambers, sandalwood, vanilla — that invite proximity rather than announce presence. Fragrance that makes someone want to lean in is doing date night correctly.
          </p>

          <h2>The best solo options</h2>

          <h3>Tom Ford Oud Wood</h3>
          <p>
            Oud Wood is the single best date night fragrance for people who want to smell like nothing else in the room. It\'s warm, woody, a little smoky, and completely unhurried. The oud is refined rather than raw — it won\'t scare anyone — and the amber and vanilla in the base do exactly the skin-presence trick you want. It lasts all evening without requiring a reapplication. Apply it 20–30 minutes before you leave so the top notes have time to settle and you arrive wearing the heart and base.
          </p>

          <h3>Creed Aventus</h3>
          <p>
            Aventus has the reputation it has for a reason. The pineapple and birch opening is unusual and confident, and the dry musk-and-ambergris base is excellent at close range. The projection is moderate — present but not loud. It also has a quality that\'s hard to describe but easy to notice: it smells like it\'s been planned, not just applied. Confident without trying.
          </p>

          <h3>Maison Margiela Replica — By the Fireplace</h3>
          <p>
            If the evening is dinner rather than dancing, By the Fireplace creates an immediate atmosphere. Chestnut, guaiac wood, and the smoked vanilla base make it feel genuinely cozy and warm. It\'s not a fragrance that asks for attention — it just makes the space feel more intimate. Excellent for autumn and winter dates.
          </p>

          <h3>Yves Saint Laurent Myslf</h3>
          <p>
            MYSLF is the most accessible option on this list. The bergamot and ambrette top is fresh without being generic, and the skin-close woody drydown has a subtle sweetness that makes it more date-appropriate than a standard aromatic fougère. It\'s also more approachable in close quarters than the usual YSL heavy-hitter, La Nuit de L\'Homme.
          </p>

          <h2>The best layered stacks</h2>

          <div className="callout">
            <p className="callout-title">Dark Romance Stack</p>
            <p><strong>Tom Ford Oud Wood + Maison Margiela Flower Market</strong></p>
            <p>Apply Oud Wood to pulse points and let it sit for five full minutes. Then add a single spray of Flower Market to the collarbone only. What happens is the soft peony and heliotrope of Flower Market floats on the warm amber-oud base and the contrast — dry warmth underneath, fresh floral on top — is what makes people stop mid-conversation. Don\'t use more than one spray of Flower Market; it\'s strong enough that any more tips the balance.</p>
          </div>

          <div className="callout">
            <p className="callout-title">The Confident Stack</p>
            <p><strong>Creed Aventus + Dior Sauvage (light hand)</strong></p>
            <p>Apply Aventus first — the fruity-chypre top needs time to open before you add anything. After 3 minutes, spray Sauvage once across the chest only. The ambroxan in Sauvage acts as an amplifier for everything around it, making the Aventus smokiness and birch more pronounced without adding new notes on top. The result has a presence that\'s hard to explain but easy to notice in a room.</p>
          </div>

          <h2>How many sprays on a date</h2>
          <p>
            Half your normal application. This is the rule. One spray per fragrance when layering, two at most when wearing solo. The intimacy of the context means projection and longevity don\'t need to carry the weight they do elsewhere. Your date will be within a few feet of you — fragrance doesn\'t need to travel.
          </p>
          <p>
            The other thing to consider: reapplication at the end of the night is better than front-loading. A very light touch-up after dinner keeps you smelling intentional rather than like the fragrance is wearing you.
          </p>

          <h2>Timing your application</h2>
          <p>
            The worst thing you can do is spray on your way out the door. Top notes on most evening fragrances are sharp, sometimes borderline aggressive — that\'s their job. They\'re designed to fade quickly into the heart notes, which is where the real character lives. Apply 20–30 minutes before you leave the house. By the time you arrive, the top notes are gone and you\'re wearing the best version of the fragrance.
          </p>

          <div className="cta-block">
            <p className="text-sm font-semibold mb-1" style={{ color: GOLD }}>Plan Tonight\'s Stack</p>
            <p className="text-sm text-muted-foreground mb-4">Add your bottles to ScentStack and get occasion-specific recommendations from your own wardrobe — scored by compatibility.</p>
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
