import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fragrance Guides & Tips | Your Scents',
  description: 'Deep guides on how to layer perfume, build a fragrance wardrobe, find your signature scent, and get more out of every bottle you own.',
  openGraph: {
    title: 'Fragrance Guides & Tips | Your Scents',
    description: 'Deep guides on how to layer perfume, build a fragrance wardrobe, find your signature scent, and get more out of every bottle you own.',
    type: 'website',
  },
}

const R       = 'hsl(8 48% 72%)'
const R_DEEP  = 'hsl(3 40% 58%)'
const R_BG    = 'hsl(8 56% 76% / 0.12)'
const R_BORDER= 'hsl(8 56% 76% / 0.32)'
const CREAM   = 'hsl(18 50% 97%)'
const FG      = 'hsl(5 25% 22%)'
const MUTED   = 'hsl(8 15% 52%)'

const POSTS = [
  {
    slug: 'how-to-layer-perfume',
    title: 'How to Layer Perfume Without It Smelling Like a Mess',
    desc: "Most people who try layering end up with something that smells like a candle store exploded. Here's how to actually do it right.",
    tag: 'Technique',
    read: '7 min read',
    date: 'May 2026',
  },
  {
    slug: 'best-fragrances-for-date-night',
    title: 'The Best Fragrances for Date Night (And How to Stack Them)',
    desc: "Not all date night fragrances are created equal. Some project too loud. Some fade before dinner ends. Here's what actually works.",
    tag: 'Occasion Guide',
    read: '6 min read',
    date: 'May 2026',
  },
  {
    slug: 'how-to-build-a-fragrance-wardrobe',
    title: 'How to Build a Fragrance Wardrobe From Scratch',
    desc: "You don't need 40 bottles. You need the right 6. A practical guide to building a collection that covers every situation in your life.",
    tag: 'Collection',
    read: '8 min read',
    date: 'May 2026',
  },
  {
    slug: 'why-perfumes-smell-different-on-everyone',
    title: 'Why the Same Perfume Smells Completely Different on You',
    desc: 'You tested it on a strip. Smelled incredible. You wore it home and it smelled nothing like what you tried. Here is the actual science behind why.',
    tag: 'Fragrance Science',
    read: '5 min read',
    date: 'May 2026',
  },
  {
    slug: 'best-mens-fragrance-combinations',
    title: "The Best Men's Fragrance Combinations That Actually Work",
    desc: "Layering isn't just a trend. These specific combos have been tested on real skin and they work — with exactly why each pairing is effective.",
    tag: 'Stack Guide',
    read: '7 min read',
    date: 'May 2026',
  },
]

export default function BlogIndex() {
  return (
    <div
      className="min-h-screen text-foreground"
      style={{
        background: CREAM,
        backgroundImage:
          'radial-gradient(ellipse 70% 40% at 50% -5%, hsl(8 56% 76% / 0.12) 0%, transparent 65%), radial-gradient(ellipse 50% 30% at 100% 100%, hsl(13 48% 65% / 0.08) 0%, transparent 60%)',
      }}
    >
      {/* ── NAV ── */}
      <header
        className="fixed top-0 inset-x-0 z-50 border-b"
        style={{ background: 'hsl(18 60% 98% / 0.92)', backdropFilter: 'blur(20px)', borderColor: R_BORDER }}
      >
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Full logo — same as homepage, no circle crop */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Your Scents"
              width={120}
              height={48}
              className="h-11 w-auto object-contain"
              priority
            />
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm transition-colors hover:text-foreground" style={{ color: MUTED }}>Home</Link>
            <Link href="/login" className="text-sm transition-colors hover:text-foreground hidden sm:block" style={{ color: MUTED }}>Sign in</Link>
            <Link href="/signup">
              <button className="btn-gold px-5 py-2 text-xs">Start Free ✨</button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-24">
        {/* Hero header */}
        <div className="mb-16">
          <p className="eyebrow mb-3">Fragrance Guides</p>
          <h1 className="text-5xl md:text-6xl font-normal serif mb-5" style={{ color: FG }}>The Your Scents Guide.</h1>
          <p className="text-base max-w-xl leading-relaxed" style={{ color: MUTED }}>
            Practical, honest guides on fragrance layering, collection building, and getting more out of every bottle you own.
            No fluff, no affiliate-bait lists.
          </p>
        </div>

        {/* Featured post — full width */}
        {POSTS[0] && (
          <Link
            href={`/blog/${POSTS[0].slug}`}
            className="block mb-5 no-underline group"
          >
            <div
              className="panel-glow lift rounded-2xl p-8 md:p-10 transition-all"
              style={{ background: 'hsl(0 0% 100%)', border: `1px solid ${R_BORDER}` }}
            >
              {/* Top strip accent */}
              <div className="h-0.5 w-16 rounded-full mb-6" style={{ background: `linear-gradient(90deg, ${R}, ${R_DEEP})` }} />
              <div className="flex items-center gap-3 mb-4">
                <span className="chip" style={{ fontSize: '10px', padding: '3px 11px' }}>{POSTS[0].tag}</span>
                <span className="text-[11px] font-mono" style={{ color: MUTED }}>{POSTS[0].read} · {POSTS[0].date}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-normal serif leading-snug mb-4" style={{ color: FG }}>
                {POSTS[0].title}
              </h2>
              <p className="text-sm leading-relaxed max-w-2xl mb-6" style={{ color: MUTED }}>{POSTS[0].desc}</p>
              <p className="text-xs font-semibold flex items-center gap-1.5" style={{ color: R_DEEP }}>
                Read article
                <span className="group-hover:translate-x-0.5 transition-transform inline-block">→</span>
              </p>
            </div>
          </Link>
        )}

        {/* Remaining posts grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {POSTS.slice(1).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block no-underline group"
            >
              <div
                className="panel-glow lift h-full flex flex-col gap-4 p-7 rounded-2xl transition-all"
                style={{ background: 'hsl(0 0% 100%)', border: `1px solid ${R_BORDER}` }}
              >
                <div className="h-0.5 w-10 rounded-full" style={{ background: `linear-gradient(90deg, ${R}, ${R_DEEP})` }} />
                <div className="flex items-center justify-between gap-3">
                  <span className="chip" style={{ fontSize: '10px', padding: '2px 10px' }}>{post.tag}</span>
                  <span className="text-[11px] font-mono" style={{ color: MUTED }}>{post.read} · {post.date}</span>
                </div>
                <h2 className="text-xl font-normal serif leading-snug flex-1" style={{ color: FG }}>{post.title}</h2>
                <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{post.desc}</p>
                <p className="text-xs font-semibold flex items-center gap-1.5" style={{ color: R_DEEP }}>
                  Read article
                  <span className="group-hover:translate-x-0.5 transition-transform inline-block">→</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer
        className="border-t py-12 px-6"
        style={{ background: 'hsl(18 40% 93%)', borderColor: R_BORDER }}
      >
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <Image
              src="/logo.png"
              alt="Your Scents"
              width={110}
              height={44}
              className="h-10 w-auto object-contain mb-1.5"
            />
            <p className="text-xs" style={{ color: MUTED }}>The intelligent fragrance wardrobe.</p>
          </div>
          <div className="flex gap-6 text-xs" style={{ color: MUTED }}>
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <Link href="/signup" className="hover:text-foreground transition-colors">Sign up</Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          </div>
          <p className="text-xs" style={{ color: MUTED }}>© {new Date().getFullYear()} Your Scents</p>
        </div>
      </footer>
    </div>
  )
}
