import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fragrance Guides & Tips | ScentStack',
  description: 'Deep guides on how to layer perfume, build a fragrance wardrobe, find your signature scent, and get more out of every bottle you own.',
  openGraph: {
    title: 'Fragrance Guides & Tips | ScentStack',
    description: 'Deep guides on how to layer perfume, build a fragrance wardrobe, find your signature scent, and get more out of every bottle you own.',
    type: 'website',
  },
}

const POSTS = [
  {
    slug: 'how-to-layer-perfume',
    title: 'How to Layer Perfume Without It Smelling Like a Mess',
    desc: 'Most people who try layering end up with something that smells like a candle store exploded. Here\'s how to actually do it right.',
    tag: 'Technique',
    read: '7 min read',
    date: 'May 2026',
  },
  {
    slug: 'best-fragrances-for-date-night',
    title: 'The Best Fragrances for Date Night (And How to Stack Them)',
    desc: 'Not all date night fragrances are created equal. Some project too loud. Some fade before dinner ends. Here\'s what actually works.',
    tag: 'Occasion Guide',
    read: '6 min read',
    date: 'May 2026',
  },
  {
    slug: 'how-to-build-a-fragrance-wardrobe',
    title: 'How to Build a Fragrance Wardrobe From Scratch',
    desc: 'You don\'t need 40 bottles. You need the right 6. A practical guide to building a collection that covers every situation in your life.',
    tag: 'Collection',
    read: '8 min read',
    date: 'May 2026',
  },
  {
    slug: 'why-perfumes-smell-different-on-everyone',
    title: 'Why the Same Perfume Smells Completely Different on You',
    desc: 'You tested it on a strip. Smelled incredible. You wore it home and it smelled nothing like what you tried. Here\'s the actual science behind why.',
    tag: 'Fragrance Science',
    read: '5 min read',
    date: 'May 2026',
  },
  {
    slug: 'best-mens-fragrance-combinations',
    title: 'The Best Men\'s Fragrance Combinations That Actually Work',
    desc: 'Layering isn\'t just a trend. These specific combos have been tested on real skin and they work — with exactly why each pairing is effective.',
    tag: 'Stack Guide',
    read: '7 min read',
    date: 'May 2026',
  },
]

const GOLD = 'hsl(42 85% 68%)'
const G_BG = 'hsl(42 85% 68% / 0.10)'
const G_BORDER = 'hsl(42 85% 68% / 0.25)'

export default function BlogIndex() {
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
          <Link href="/signup"><button className="btn-gold px-5 py-2 text-xs">Start Free</button></Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-24">
        <div className="mb-14">
          <p className="eyebrow mb-3">Fragrance Guides</p>
          <h1 className="text-5xl font-normal serif mb-4">The ScentStack Guide.</h1>
          <p className="text-muted-foreground text-base max-w-xl leading-relaxed">
            Practical, honest guides on fragrance layering, collection building, and getting more out of every bottle you own.
            No fluff, no affiliate-bait lists.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {POSTS.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`panel lift flex flex-col gap-4 p-7 no-underline hover:border-[hsl(42_85%_68%_/_0.25)] transition-colors ${
                i === 0 ? 'md:col-span-2' : ''
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="chip text-[10px]" style={{ padding: '2px 10px' }}>{post.tag}</span>
                <span className="text-[11px] text-muted-foreground font-mono">{post.read} · {post.date}</span>
              </div>
              <h2 className={`font-normal serif leading-snug ${ i === 0 ? 'text-3xl' : 'text-xl' }`}>{post.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{post.desc}</p>
              <p className="text-xs font-semibold flex items-center gap-1.5" style={{ color: GOLD }}>
                Read article →
              </p>
            </Link>
          ))}
        </div>
      </main>

      <footer className="border-t border-border py-10 px-6" style={{ background: 'hsl(220 18% 5%)' }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} ScentStack</p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <Link href="/signup" className="hover:text-foreground transition-colors">Sign up</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
