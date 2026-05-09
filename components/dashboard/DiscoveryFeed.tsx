'use client'
import { ShoppingBag, TrendingUp } from 'lucide-react'

const ROSE       = 'hsl(340 55% 62%)'
const ROSE_LIGHT = 'hsl(340 45% 92%)'
const ROSE_TEXT  = 'hsl(340 55% 48%)'

const TRENDING = [
  { id: 'viktor-rolf-flowerbomb',   name: 'Flowerbomb',          brand: 'Viktor & Rolf',  image: 'https://fimgs.net/mdimg/perfume/375x500.1789.jpg',  accords: ['floral','sweet','powdery'],         rank: 1  },
  { id: 'ysl-black-opium',          name: 'Black Opium',         brand: 'YSL',            image: 'https://fimgs.net/mdimg/perfume/375x500.34016.jpg', accords: ['sweet','coffee','vanilla'],         rank: 2  },
  { id: 'glossier-you',             name: 'Glossier You',        brand: 'Glossier',       image: 'https://fimgs.net/mdimg/perfume/375x500.51796.jpg', accords: ['musky','powdery','warm'],           rank: 3  },
  { id: 'dior-miss-dior',           name: 'Miss Dior',           brand: 'Dior',           image: 'https://fimgs.net/mdimg/perfume/375x500.52543.jpg', accords: ['floral','chypre','rose'],           rank: 4  },
  { id: 'sol-de-janeiro-62',        name: 'Cheirosa 62',         brand: 'Sol de Janeiro', image: 'https://fimgs.net/mdimg/perfume/375x500.72281.jpg', accords: ['sweet','gourmand','warm'],          rank: 5  },
  { id: 'chanel-coco-mademoiselle', name: 'Coco Mademoiselle',   brand: 'Chanel',         image: 'https://fimgs.net/mdimg/perfume/375x500.2756.jpg', accords: ['fresh','floral','woody'],           rank: 6  },
  { id: 'jo-malone-peony-blush',    name: 'Peony & Blush Suede', brand: 'Jo Malone',      image: 'https://fimgs.net/mdimg/perfume/375x500.32823.jpg', accords: ['floral','suede','powdery'],         rank: 7  },
  { id: 'mugler-alien',             name: 'Alien',               brand: 'Mugler',         image: 'https://fimgs.net/mdimg/perfume/375x500.1592.jpg',  accords: ['floral','woody','amber'],           rank: 8  },
  { id: 'burberry-her',             name: 'Her',                 brand: 'Burberry',       image: 'https://fimgs.net/mdimg/perfume/375x500.57617.jpg', accords: ['fruity','floral','sweet'],          rank: 9  },
  { id: 'lancome-la-vie-est-belle', name: 'La Vie Est Belle',    brand: 'Lanc\u00f4me',       image: 'https://fimgs.net/mdimg/perfume/375x500.28247.jpg', accords: ['sweet','floral','gourmand'],        rank: 10 },
  { id: 'gucci-bloom',              name: 'Bloom',               brand: 'Gucci',          image: 'https://fimgs.net/mdimg/perfume/375x500.49196.jpg', accords: ['floral','white floral','tuberose'], rank: 11 },
  { id: 'prada-candy',              name: 'Candy',               brand: 'Prada',          image: 'https://fimgs.net/mdimg/perfume/375x500.24263.jpg', accords: ['sweet','powdery','vanilla'],        rank: 12 },
]

function buildBuyLink(name: string, brand: string): string {
  return `https://www.fragrancenet.com/search#q=${encodeURIComponent(`${brand} ${name}`)}`
}

interface WardrobeItem {
  id: string
  fragrance_id?: string
  fragrance_name: string
  [key: string]: unknown
}

// Accepts the full wardrobe array (same shape DashboardClient passes)
// and derives fragrance_ids internally for the "already owned" check.
export default function DiscoveryFeed({ wardrobe }: { wardrobe: WardrobeItem[] }) {
  // Match against both the row UUID and the external fragrance_id slug
  const ownedIds = new Set([
    ...wardrobe.map(i => i.id),
    ...wardrobe.map(i => i.fragrance_id).filter(Boolean),
  ])
  const unowned = TRENDING.filter(f => !ownedIds.has(f.id))

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <TrendingUp className="h-4 w-4" style={{ color: ROSE }} />
        <h3 className="font-bold serif text-base">Trending This Week</h3>
        <span className="text-xs text-muted-foreground">(fragrances you don&apos;t have yet)</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {unowned.slice(0, 8).map(frag => (
          <div key={frag.id} className="bg-card border border-border rounded-2xl p-3 flex flex-col gap-2 hover:shadow-md transition-shadow">
            <div className="relative">
              <div className="w-full aspect-square rounded-xl bg-muted/30 overflow-hidden border border-border flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={frag.image}
                  alt={frag.name}
                  className="w-full h-full object-contain p-2"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
              </div>
              <span
                className="absolute top-1.5 left-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                style={{ background: ROSE, color: '#fff' }}
              >
                #{frag.rank}
              </span>
            </div>
            <div>
              <p className="font-semibold text-xs serif leading-tight">{frag.name}</p>
              <p className="text-[10px] text-muted-foreground">{frag.brand}</p>
            </div>
            <div className="flex flex-wrap gap-1">
              {frag.accords.slice(0, 2).map(a => (
                <span
                  key={a}
                  className="text-[9px] px-1.5 py-0.5 rounded-full capitalize"
                  style={{ background: ROSE_LIGHT, color: ROSE_TEXT }}
                >
                  {a}
                </span>
              ))}
            </div>
            <a
              href={buildBuyLink(frag.name, frag.brand)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1 text-[11px] font-semibold w-full py-1.5 rounded-full transition-colors mt-auto"
              style={{ background: ROSE_LIGHT, color: ROSE_TEXT }}
            >
              <ShoppingBag className="h-3 w-3" /> Shop
            </a>
          </div>
        ))}
      </div>

      {unowned.length === 0 && (
        <p className="text-center text-muted-foreground text-sm py-6">
          You already have all the trending fragrances! 👑
        </p>
      )}
    </div>
  )
}
