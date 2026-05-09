import { NextRequest, NextResponse } from 'next/server'

// ── Types ───────────────────────────────────────────────────────────────────
interface NoteObject {
  name?: string
  [key: string]: unknown
}

type RawNote = string | NoteObject

interface StructuredNotes {
  top?: RawNote[]
  middle?: RawNote[]
  base?: RawNote[]
  [key: string]: RawNote[] | undefined
}

interface FragranceResult {
  id: string
  name: string
  brand: string
  image_url: string | null
  accords: string[]
  notes: { top: string[]; middle: string[]; base: string[] }
}

interface RapidApiFragrance {
  id?: string
  _id?: string
  name?: string
  title?: string
  brand?: string
  designer?: string
  house?: string
  image?: string
  image_url?: string
  accords?: string[]
  main_accords?: string[]
  top_notes?: RawNote[]
  heart_notes?: RawNote[]
  middle_notes?: RawNote[]
  base_notes?: RawNote[]
  notes?: {
    top?: RawNote[]
    middle?: RawNote[]
    base?: RawNote[]
  }
}

interface DemoFragrance {
  id: string
  name: string
  brand: string
  accords: string[]
  notes: { top: string[]; middle: string[]; base: string[] }
}

// ── Helpers ─────────────────────────────────────────────────────────────────
function flattenNotes(notes: RawNote[] | StructuredNotes | undefined): string[] {
  if (!notes) return []
  if (Array.isArray(notes)) {
    return notes
      .map(n => (typeof n === 'string' ? n : (n as NoteObject).name ?? ''))
      .filter(Boolean)
  }
  return Object.values(notes as StructuredNotes)
    .flatMap(arr =>
      Array.isArray(arr)
        ? arr.map(n => (typeof n === 'string' ? n : (n as NoteObject).name ?? ''))
        : []
    )
    .filter(Boolean)
}

async function getFragranticaImage(name: string, brand: string): Promise<string | null> {
  try {
    const q = encodeURIComponent(`${brand} ${name}`)
    const res = await fetch(
      `https://www.fragrantica.com/search/?query=${q}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          Accept: 'text/html',
        },
        signal: AbortSignal.timeout(4000),
      }
    )
    if (!res.ok) return null
    const html = await res.text()
    const match = html.match(/https:\/\/fimgs\.net\/mdimg\/perfume\/375x500\.(\d+)\.jpg/)
    if (match) return match[0]
    const match2 = html.match(/https:\/\/fimgs\.net\/[^"'\s]+\.jpg/)
    if (match2) return match2[0]
    return null
  } catch {
    return null
  }
}

const KNOWN_IMAGES: Record<string, string> = {
  'chanel-no5':                        'https://fimgs.net/mdimg/perfume/375x500.828.jpg',
  'chanel-coco-mademoiselle':          'https://fimgs.net/mdimg/perfume/375x500.2756.jpg',
  'chanel-chance':                     'https://fimgs.net/mdimg/perfume/375x500.1104.jpg',
  'chanel-chance-eau-tendre':          'https://fimgs.net/mdimg/perfume/375x500.13539.jpg',
  'chanel-bleu-de-chanel':             'https://fimgs.net/mdimg/perfume/375x500.18058.jpg',
  'dior-miss-dior':                    'https://fimgs.net/mdimg/perfume/375x500.52543.jpg',
  'dior-jadore':                       'https://fimgs.net/mdimg/perfume/375x500.484.jpg',
  'dior-sauvage':                      'https://fimgs.net/mdimg/perfume/375x500.38480.jpg',
  'ysl-black-opium':                   'https://fimgs.net/mdimg/perfume/375x500.34016.jpg',
  'ysl-libre':                         'https://fimgs.net/mdimg/perfume/375x500.63307.jpg',
  'versace-bright-crystal':            'https://fimgs.net/mdimg/perfume/375x500.6531.jpg',
  'versace-eros':                      'https://fimgs.net/mdimg/perfume/375x500.25378.jpg',
  'gucci-bloom':                       'https://fimgs.net/mdimg/perfume/375x500.49196.jpg',
  'lancome-la-vie-est-belle':          'https://fimgs.net/mdimg/perfume/375x500.28247.jpg',
  'marc-jacobs-daisy':                 'https://fimgs.net/mdimg/perfume/375x500.7368.jpg',
  'sol-de-janeiro-62':                 'https://fimgs.net/mdimg/perfume/375x500.72281.jpg',
  'vs-bombshell':                      'https://fimgs.net/mdimg/perfume/375x500.13441.jpg',
  'byredo-bal-dafrique':               'https://fimgs.net/mdimg/perfume/375x500.16694.jpg',
  'jo-malone-peony-blush':             'https://fimgs.net/mdimg/perfume/375x500.32823.jpg',
  'jo-malone-english-pear':            'https://fimgs.net/mdimg/perfume/375x500.27845.jpg',
  'maison-margiela-replica-beach':     'https://fimgs.net/mdimg/perfume/375x500.43007.jpg',
  'armani-si':                         'https://fimgs.net/mdimg/perfume/375x500.28786.jpg',
  'burberry-her':                      'https://fimgs.net/mdimg/perfume/375x500.57617.jpg',
  'prada-candy':                       'https://fimgs.net/mdimg/perfume/375x500.24263.jpg',
  'valentino-donna-born-in-roma':      'https://fimgs.net/mdimg/perfume/375x500.60340.jpg',
  'mugler-alien':                      'https://fimgs.net/mdimg/perfume/375x500.1592.jpg',
  'mugler-angel':                      'https://fimgs.net/mdimg/perfume/375x500.87.jpg',
  'viktor-rolf-flowerbomb':            'https://fimgs.net/mdimg/perfume/375x500.1789.jpg',
  'glossier-you':                      'https://fimgs.net/mdimg/perfume/375x500.51796.jpg',
  'maison-margiela-replica-lazy-sunday': 'https://fimgs.net/mdimg/perfume/375x500.41739.jpg',
}

const DEMO_FRAGRANCES: DemoFragrance[] = [
  { id: 'chanel-no5',               name: 'No. 5',               brand: 'Chanel',              accords: ['floral','powdery','aldehyde'],      notes: { top: ['Aldehyde','Neroli','Ylang-Ylang'],           middle: ['Rose','Jasmine','Lily of the Valley'],      base: ['Sandalwood','Vetiver','Musk'] } },
  { id: 'chanel-coco-mademoiselle', name: 'Coco Mademoiselle',   brand: 'Chanel',              accords: ['fresh','floral','woody'],           notes: { top: ['Orange','Bergamot','Grapefruit'],            middle: ['Rose','Jasmine','Mimosa'],                  base: ['Patchouli','Vetiver','Vanilla','Musk'] } },
  { id: 'chanel-chance',            name: 'Chance',              brand: 'Chanel',              accords: ['floral','fresh','citrus'],          notes: { top: ['Citrus','Pink Pepper'],                      middle: ['Jasmine','Iris'],                           base: ['Patchouli','Amber','White Musk'] } },
  { id: 'chanel-chance-eau-tendre', name: 'Chance Eau Tendre',   brand: 'Chanel',              accords: ['floral','fresh','citrus'],          notes: { top: ['Grapefruit','Quince'],                       middle: ['Hyacinth','Jasmine'],                       base: ['Iris','Vetiver','Musk'] } },
  { id: 'dior-miss-dior',           name: 'Miss Dior',           brand: 'Dior',                accords: ['floral','chypre','rose'],           notes: { top: ['Calabrian Bergamot','Blood Mandarin'],        middle: ['Rose','Peony','Lily'],                      base: ['Patchouli','Musk','Virginia Cedar'] } },
  { id: 'dior-jadore',              name: "J'adore",             brand: 'Dior',                accords: ['floral','fresh','yellow floral'],   notes: { top: ['Pear','Bergamot','Mandarin Orange'],          middle: ['Jasmine','Rose','Orchid'],                  base: ['Musk','Blackberry','Sandalwood'] } },
  { id: 'dior-sauvage',             name: 'Sauvage',             brand: 'Dior',                accords: ['fresh','aromatic','woody'],         notes: { top: ['Calabrian Bergamot','Pepper'],                middle: ['Sichuan Pepper','Lavender','Geranium'],     base: ['Ambroxan','Cedar','Labdanum'] } },
  { id: 'ysl-black-opium',          name: 'Black Opium',         brand: 'Yves Saint Laurent', accords: ['sweet','coffee','vanilla'],         notes: { top: ['Pink Pepper','Orange Blossom','Pear'],        middle: ['Coffee','Jasmine','Bitter Almond'],         base: ['Patchouli','Vanilla','White Musk','Cedar'] } },
  { id: 'ysl-libre',                name: 'Libre',               brand: 'Yves Saint Laurent', accords: ['floral','fresh lavender','woody'],  notes: { top: ['Mandarin Orange','Petitgrain'],               middle: ['Lavender','Orange Blossom'],                base: ['Musk','Vanilla','Cedar','Ambergris'] } },
  { id: 'versace-bright-crystal',   name: 'Bright Crystal',      brand: 'Versace',             accords: ['floral','fresh','aquatic'],         notes: { top: ['Pomegranate','Yuzu','Iced Accord'],           middle: ['Magnolia','Lotus','Peony'],                 base: ['Musk','Amber','Mahogany'] } },
  { id: 'versace-eros',             name: 'Eros',                brand: 'Versace',             accords: ['fresh','aromatic','sweet'],         notes: { top: ['Mint','Italian Lemon','Green Apple'],         middle: ['Tonka Bean','Ambroxan','Geranium'],         base: ['Vanilla','Vetiver','Oakmoss','Cedarwood'] } },
  { id: 'gucci-bloom',              name: 'Bloom',               brand: 'Gucci',               accords: ['floral','white floral','tuberose'], notes: { top: ['Tuberose'],                                   middle: ['Jasmine','Rangoon Creeper'],                base: ['Orris','Sandalwood'] } },
  { id: 'lancome-la-vie-est-belle', name: 'La Vie Est Belle',    brand: 'Lancôme',             accords: ['sweet','floral','gourmand'],        notes: { top: ['Black Currant','Pear'],                       middle: ['Iris','Jasmine','Orange Blossom'],          base: ['Praline','Vanilla','Patchouli','Tonka Bean'] } },
  { id: 'marc-jacobs-daisy',        name: 'Daisy',               brand: 'Marc Jacobs',         accords: ['floral','fruity','fresh'],          notes: { top: ['Strawberry','Violet Leaves','Grapefruit'],    middle: ['Violet','Gardenia','Jasmine'],              base: ['Musk','Vanilla','White Woods'] } },
  { id: 'sol-de-janeiro-62',        name: 'Cheirosa 62',         brand: 'Sol de Janeiro',      accords: ['sweet','gourmand','warm'],          notes: { top: ['Pistachio','Salted Caramel'],                 middle: ['Jasmine','Heliotrope'],                     base: ['Vanilla','Sandalwood','Musk'] } },
  { id: 'vs-bombshell',             name: 'Bombshell',           brand: "Victoria's Secret",   accords: ['floral','fruity','sweet'],          notes: { top: ['Strawberry','Peony','Passion Fruit'],         middle: ['Rose','Orchid','Vanilla'],                  base: ['Musk','Oak','Sandalwood'] } },
  { id: 'byredo-bal-dafrique',      name: "Bal d'Afrique",       brand: 'Byredo',              accords: ['floral','woody','citrus'],          notes: { top: ['Bergamot','Lemon','African Marigold'],        middle: ['Violet','Jasmine','Cyclamen'],              base: ['Musk','Vetiver','Amber'] } },
  { id: 'jo-malone-peony-blush',    name: 'Peony & Blush Suede', brand: 'Jo Malone London',    accords: ['floral','suede','powdery'],         notes: { top: ['Red Apple'],                                  middle: ['Peony','Rose','Jasmine'],                   base: ['Suede','Musk','Plum'] } },
  { id: 'jo-malone-english-pear',   name: 'English Pear & Freesia', brand: 'Jo Malone London', accords: ['fruity','floral','fresh'],          notes: { top: ['Pear','Melon'],                               middle: ['Freesia','Rose','Rhubarb'],                 base: ['Patchouli','Amber','Musk'] } },
  { id: 'armani-si',                name: 'Sì',                  brand: 'Giorgio Armani',      accords: ['sweet','floral','fruity'],          notes: { top: ['Black Currant Nectar'],                       middle: ['Rose','Freesia','Osmanthus'],               base: ['Vanilla','Patchouli','Ambroxan','Musk'] } },
  { id: 'burberry-her',             name: 'Her',                 brand: 'Burberry',            accords: ['fruity','floral','sweet'],          notes: { top: ['Juicy Berries','Strawberry'],                 middle: ['Jasmine','Violet'],                         base: ['Musk','Ambergris','Amber Wood'] } },
  { id: 'prada-candy',              name: 'Candy',               brand: 'Prada',               accords: ['sweet','powdery','vanilla'],        notes: { top: ['Caramel'],                                    middle: ['Rose','Musk'],                              base: ['Benzyl Benzoate','White Musk','Vanilla'] } },
  { id: 'valentino-donna-born-in-roma', name: 'Donna Born in Roma', brand: 'Valentino',         accords: ['floral','sweet','vanilla'],         notes: { top: ['Black Currant','Yuzu'],                       middle: ['Jasmine','Peony'],                          base: ['Vanilla','Musk','Cedarwood'] } },
  { id: 'mugler-alien',             name: 'Alien',               brand: 'Mugler',              accords: ['floral','woody','amber'],           notes: { top: ['Casablanca Lily'],                            middle: ['Jasmine'],                                 base: ['White Amber','Woody Notes','Cashmeran'] } },
  { id: 'mugler-angel',             name: 'Angel',               brand: 'Mugler',              accords: ['sweet','gourmand','woody'],         notes: { top: ['Melon','Coconut','Mandarin Orange','Cassia'],  middle: ['Red Fruits','Plum'],                        base: ['Patchouli','Vanilla','Chocolate','Tonka Bean'] } },
  { id: 'viktor-rolf-flowerbomb',   name: 'Flowerbomb',          brand: 'Viktor & Rolf',       accords: ['floral','sweet','powdery'],         notes: { top: ['Tea','Bergamot','Osmanthus'],                  middle: ['Sambac Jasmine','Cattleya Orchid','Freesia','Rose'], base: ['Musk','Patchouli'] } },
  { id: 'glossier-you',             name: 'Glossier You',        brand: 'Glossier',            accords: ['musky','powdery','warm'],           notes: { top: ['Pink Pepper','Iris'],                          middle: ['Ambrette','Ambers'],                        base: ['Musk','Woody Notes','Exaltolide'] } },
  { id: 'maison-margiela-replica-beach', name: 'Replica Beach Walk', brand: 'Maison Margiela', accords: ['fresh','citrus','coconut'],         notes: { top: ['Lemon','Bergamot','Aldehydes'],               middle: ['Ylang-Ylang','Irone'],                      base: ['Vanilla','Sandal','Musk','Cashmeran'] } },
  { id: 'maison-margiela-replica-lazy-sunday', name: 'Replica Lazy Sunday Morning', brand: 'Maison Margiela', accords: ['powdery','musky','clean'], notes: { top: ['Aldehydes','Peach'],                        middle: ['Peony','Rose','Iris'],                      base: ['Musk','Cedar','Benzyl Benzoate'] } },
]

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q')
  if (!q || q.trim().length < 2) return NextResponse.json({ results: [] })

  // ── Primary: Fragella ────────────────────────────────────────────────────
  if (process.env.FRAGELLA_API_KEY && process.env.FRAGELLA_API_KEY !== 'your_fragella_api_key') {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_FRAGELLA_BASE_URL}/v1/fragrances/search?q=${encodeURIComponent(q)}&limit=20`,
        { headers: { Authorization: `Bearer ${process.env.FRAGELLA_API_KEY}` }, next: { revalidate: 300 } }
      )
      if (res.ok) {
        const data = await res.json() as { results?: FragranceResult[] }
        if (data.results?.length) return NextResponse.json(data)
      }
    } catch { /* fall through */ }
  }

  // ── Backup: RapidAPI ─────────────────────────────────────────────────────
  if (process.env.RAPIDAPI_KEY && process.env.RAPIDAPI_KEY !== 'your_rapidapi_key') {
    try {
      const res = await fetch(
        `https://perfumes-and-fragrances.p.rapidapi.com/fragrances?name=${encodeURIComponent(q)}&limit=20`,
        {
          headers: {
            'x-rapidapi-host': 'perfumes-and-fragrances.p.rapidapi.com',
            'x-rapidapi-key': process.env.RAPIDAPI_KEY,
          },
          next: { revalidate: 300 },
        }
      )
      if (res.ok) {
        const raw = await res.json() as { data?: RapidApiFragrance[]; results?: RapidApiFragrance[] } | RapidApiFragrance[]
        const list: RapidApiFragrance[] = Array.isArray(raw) ? raw : (raw.data || raw.results || [])
        const results: FragranceResult[] = list.map(f => ({
          id:        String(f.id || f._id || ''),
          name:      f.name || f.title || '',
          brand:     f.brand || f.designer || f.house || '',
          image_url: f.image || f.image_url || KNOWN_IMAGES[String(f.id || f._id || '')] || null,
          accords:   f.accords || f.main_accords || [],
          notes: {
            top:    flattenNotes(f.top_notes    || f.notes?.top    || []),
            middle: flattenNotes(f.middle_notes || f.heart_notes || f.notes?.middle || []),
            base:   flattenNotes(f.base_notes   || f.notes?.base  || []),
          },
        }))
        if (results.length) return NextResponse.json({ results })
      }
    } catch { /* fall through */ }
  }

  // ── Demo data ─────────────────────────────────────────────────────────────
  const lower = q.toLowerCase()
  const matched = DEMO_FRAGRANCES.filter(f =>
    f.name.toLowerCase().includes(lower) ||
    f.brand.toLowerCase().includes(lower) ||
    f.id.includes(lower.replace(/\s+/g, '-'))
  )

  const results: FragranceResult[] = matched.slice(0, 20).map(f => ({
    ...f,
    image_url: KNOWN_IMAGES[f.id] || null,
  }))

  if (results.length === 0) {
    const imageUrl = await getFragranticaImage(q, '')
    return NextResponse.json({
      results: [{
        id: `custom-${q.toLowerCase().replace(/\s+/g, '-')}`,
        name: q,
        brand: 'Unknown Brand',
        image_url: imageUrl,
        accords: [],
        notes: { top: [], middle: [], base: [] },
      }] as FragranceResult[],
    })
  }

  return NextResponse.json({ results })
}
