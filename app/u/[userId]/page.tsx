import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

const ROSE        = 'hsl(8 48% 72%)'
const ROSE_BG     = 'hsl(8 56% 76% / 0.12)'
const ROSE_BORDER = 'hsl(8 56% 76% / 0.32)'
const ROSE_DEEP   = 'hsl(3 40% 58%)'
const CREAM       = 'hsl(18 50% 97%)'
const FOREGROUND  = 'hsl(5 25% 22%)'
const MUTED       = 'hsl(8 15% 52%)'

export default async function PublicProfilePage({ params }: { params: { userId: string } }) {
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, plan')
    .eq('id', params.userId)
    .single()

  const { data: items } = await supabase
    .from('wardrobe_items')
    .select('*')
    .eq('user_id', params.userId)
    .order('created_at', { ascending: false })

  if (!profile || !items) return notFound()

  const name = profile.full_name || 'A ScentStack user'

  return (
    <div
      className="min-h-screen"
      style={{
        background: CREAM,
        backgroundImage:
          'radial-gradient(ellipse 70% 40% at 50% -5%, hsl(8 56% 76% / 0.12) 0%, transparent 65%), radial-gradient(ellipse 50% 30% at 100% 100%, hsl(13 48% 65% / 0.08) 0%, transparent 60%)',
      }}
    >
      {/* Blush orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl" style={{ background: 'hsl(10 60% 84% / 0.28)' }} />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-3xl" style={{ background: 'hsl(13 48% 65% / 0.16)' }} />
      </div>

      {/* Nav */}
      <header
        className="fixed top-0 inset-x-0 z-50 border-b"
        style={{ background: 'hsl(18 60% 98% / 0.88)', backdropFilter: 'blur(18px)', borderColor: 'hsl(10 30% 88%)' }}
      >
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'hsl(18 67% 96%)' }}>
              <Image src="/logo.png" alt="Your Scents" width={18} height={18} className="object-contain" />
            </div>
            <span className="text-sm font-semibold serif" style={{ color: FOREGROUND }}>Your Scents</span>
          </Link>
          <Link href="/signup">
            <button className="btn-gold text-xs px-4 py-1.5">Start Free ✨</button>
          </Link>
        </div>
      </header>

      <div className="relative max-w-3xl mx-auto px-4 pt-28 pb-16">
        {/* Profile header */}
        <div className="text-center mb-10">
          <div
            className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold serif"
            style={{ background: ROSE_BG, border: `2px solid ${ROSE_BORDER}`, color: ROSE_DEEP }}
          >
            {name.charAt(0).toUpperCase()}
          </div>
          <h1 className="text-2xl font-light serif mb-1" style={{ color: FOREGROUND }}>
            {name}&apos;s Fragrance Wardrobe
          </h1>
          <p className="text-sm" style={{ color: MUTED }}>
            ✨ {items.length} fragrance{items.length !== 1 ? 's' : ''} · Curated on Your Scents
          </p>
        </div>

        {/* Wardrobe grid */}
        {items.length === 0 ? (
          <p className="text-center py-20" style={{ color: MUTED }}>This wardrobe is empty 🌸</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {items.map((item: any) => (
              <div key={item.id} className="panel-glow flex flex-col gap-2 p-4">
                <div
                  className="w-full aspect-square rounded-xl overflow-hidden flex items-center justify-center"
                  style={{ background: 'hsl(10 60% 97%)', border: `1px solid ${ROSE_BORDER}` }}
                >
                  {item.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.image_url} alt={item.fragrance_name} className="w-full h-full object-contain p-2" />
                  ) : (
                    <span className="text-3xl">🌸</span>
                  )}
                </div>
                <p className="font-semibold text-sm serif leading-tight" style={{ color: FOREGROUND }}>{item.fragrance_name}</p>
                <p className="text-xs" style={{ color: MUTED }}>{item.brand}</p>
                {item.rating > 0 && (
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => (
                      <span key={i} className="text-xs" style={{ color: i <= item.rating ? ROSE : 'hsl(10 25% 80%)' }}>★</span>
                    ))}
                  </div>
                )}
                {item.personal_note && (
                  <p className="text-[11px] italic line-clamp-2" style={{ color: MUTED }}>&ldquo;{item.personal_note}&rdquo;</p>
                )}
                {item.accords?.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {item.accords.slice(0,2).map((a: string) => (
                      <span key={a} className="chip text-[9px] capitalize">{a}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-12">
          <Link href="/">
            <button className="btn-gold text-sm px-7 py-3">
              🌸 Build your own fragrance wardrobe
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
