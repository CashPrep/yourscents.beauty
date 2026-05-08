import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'

const ROSE = 'hsl(340 55% 62%)'
const ROSE_LIGHT = 'hsl(340 45% 92%)'

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
    <div className="min-h-screen" style={{ background: 'hsl(340 30% 98%)' }}>
      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl" style={{ background: 'hsl(340 55% 88% / 0.25)' }} />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-3xl" style={{ background: 'hsl(300 30% 88% / 0.2)' }} />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white" style={{ background: ROSE }}>
            {name.charAt(0).toUpperCase()}
          </div>
          <h1 className="text-2xl font-bold serif mb-1">{name}&apos;s Fragrance Wardrobe</h1>
          <p className="text-sm text-muted-foreground">✨ {items.length} fragrance{items.length !== 1 ? 's' : ''} · Curated on ScentStack</p>
        </div>

        {/* Wardrobe grid */}
        {items.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">This wardrobe is empty 🌸</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {items.map((item: any) => (
              <div key={item.id} className="bg-white rounded-2xl border p-4 flex flex-col gap-2 shadow-sm">
                <div className="w-full aspect-square rounded-xl bg-muted/20 overflow-hidden border flex items-center justify-center">
                  {item.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.image_url} alt={item.fragrance_name} className="w-full h-full object-contain p-2" />
                  ) : (
                    <span className="text-3xl">🌸</span>
                  )}
                </div>
                <p className="font-semibold text-sm serif leading-tight">{item.fragrance_name}</p>
                <p className="text-xs text-muted-foreground">{item.brand}</p>
                {item.rating > 0 && (
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => (
                      <span key={i} className="text-xs">{i <= item.rating ? '⭐' : '☆'}</span>
                    ))}
                  </div>
                )}
                {item.personal_note && (
                  <p className="text-[11px] text-muted-foreground italic line-clamp-2">&ldquo;{item.personal_note}&rdquo;</p>
                )}
                {item.accords?.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {item.accords.slice(0,2).map((a: string) => (
                      <span key={a} className="text-[9px] px-1.5 py-0.5 rounded-full capitalize" style={{ background: ROSE_LIGHT, color: ROSE }}>{a}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-12">
          <a href="/" className="inline-block">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white shadow-md" style={{ background: ROSE }}>
              🌸 Build your own ScentStack
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
