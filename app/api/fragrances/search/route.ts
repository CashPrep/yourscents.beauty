import { NextRequest, NextResponse } from 'next/server'

// Helper: normalize note arrays from various API shapes
function flattenNotes(notes: any): string[] {
  if (!notes) return []
  if (Array.isArray(notes)) return notes.map((n: any) => (typeof n === 'string' ? n : n.name)).filter(Boolean)
  return Object.values(notes).flatMap((arr: any) =>
    Array.isArray(arr) ? arr.map((n: any) => (typeof n === 'string' ? n : n.name)) : []
  ).filter(Boolean)
}

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q')
  if (!q || q.trim().length < 2) return NextResponse.json({ results: [] })

  // ── Primary: Fragella (if API key is configured) ──────────────────────────
  if (process.env.FRAGELLA_API_KEY && process.env.FRAGELLA_API_KEY !== 'your_fragella_api_key') {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_FRAGELLA_BASE_URL}/v1/fragrances/search?q=${encodeURIComponent(q)}&limit=20`,
        { headers: { Authorization: `Bearer ${process.env.FRAGELLA_API_KEY}` }, next: { revalidate: 300 } }
      )
      if (res.ok) {
        const data = await res.json()
        if (data.results?.length) return NextResponse.json(data)
      }
    } catch { /* fall through to backup */ }
  }

  // ── Backup: RapidAPI Perfumes & Fragrances DB ─────────────────────────────
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
        const raw = await res.json()
        // Normalize to our internal shape
        const results = (raw.data || raw.results || raw || []).map((f: any) => ({
          id: f.id || f._id || String(Math.random()),
          name: f.name || f.title,
          brand: f.brand || f.designer || f.house,
          image_url: f.image || f.image_url || f.thumbnail || null,
          accords: f.accords || f.main_accords || [],
          notes: {
            top: flattenNotes(f.top_notes || f.notes?.top || []),
            middle: flattenNotes(f.middle_notes || f.heart_notes || f.notes?.middle || f.notes?.heart || []),
            base: flattenNotes(f.base_notes || f.notes?.base || []),
          },
        }))
        if (results.length) return NextResponse.json({ results })
      }
    } catch { /* fall through */ }
  }

  // ── Last resort: Parfumo public search (no key required) ──────────────────
  try {
    const res = await fetch(
      `https://www.parfumo.com/api/public/search?q=${encodeURIComponent(q)}&type=perfume&limit=20`,
      {
        headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'application/json' },
        next: { revalidate: 300 },
      }
    )
    if (res.ok) {
      const raw = await res.json()
      const results = (raw.results || raw.data || []).map((f: any) => ({
        id: f.id || f.slug,
        name: f.name,
        brand: f.brand || f.house,
        image_url: f.image || f.image_url || null,
        accords: f.main_accords || f.accords || [],
        notes: {
          top: flattenNotes(f.top_notes || f.notes?.top || []),
          middle: flattenNotes(f.middle_notes || f.notes?.middle || f.notes?.heart || []),
          base: flattenNotes(f.base_notes || f.notes?.base || []),
        },
      }))
      if (results.length) return NextResponse.json({ results })
    }
  } catch { /* fall through */ }

  // ── Hardcoded popular fragrance fallback for demo/testing ─────────────────
  const DEMO: Record<string, any[]> = {
    chanel: [
      { id: 'chanel-no5', name: 'No. 5', brand: 'Chanel', image_url: null, accords: ['floral', 'powdery', 'aldehyde'], notes: { top: ['Aldehyde', 'Neroli', 'Ylang-Ylang'], middle: ['Rose', 'Jasmine', 'Lily of the Valley'], base: ['Sandalwood', 'Vetiver', 'Musk'] } },
      { id: 'chanel-coco-mademoiselle', name: 'Coco Mademoiselle', brand: 'Chanel', image_url: null, accords: ['fresh', 'floral', 'woody'], notes: { top: ['Orange', 'Bergamot', 'Grapefruit'], middle: ['Rose', 'Jasmine', 'Mimosa'], base: ['Patchouli', 'Vetiver', 'Vanilla', 'Musk'] } },
      { id: 'chanel-chance', name: 'Chance', brand: 'Chanel', image_url: null, accords: ['floral', 'fresh', 'citrus'], notes: { top: ['Citrus', 'Pink Pepper'], middle: ['Jasmine', 'Iris'], base: ['Patchouli', 'Amber', 'White Musk'] } },
    ],
    dior: [
      { id: 'dior-miss-dior', name: 'Miss Dior', brand: 'Dior', image_url: null, accords: ['floral', 'chypre', 'rose'], notes: { top: ['Calabrian Bergamot', 'Blood Mandarin'], middle: ['Rose', 'Peony', 'Lily'], base: ['Patchouli', 'Musk', 'Virginia Cedar'] } },
      { id: 'dior-jadore', name: "J'adore", brand: 'Dior', image_url: null, accords: ['floral', 'fresh', 'yellow floral'], notes: { top: ['Pear', 'Bergamot', 'Mandarin Orange', 'Magnolia'], middle: ['Jasmine', 'Rose', 'Orchid', 'Violet'], base: ['Musk', 'Blackberry', 'Sandalwood', 'Cedar'] } },
    ],
    versace: [
      { id: 'versace-bright-crystal', name: 'Bright Crystal', brand: 'Versace', image_url: null, accords: ['floral', 'fresh', 'aquatic'], notes: { top: ['Pomegranate', 'Yuzu', 'Iced Accord'], middle: ['Magnolia', 'Lotus', 'Peony'], base: ['Musk', 'Amber', 'Mahogany'] } },
    ],
    ysl: [
      { id: 'ysl-black-opium', name: 'Black Opium', brand: 'Yves Saint Laurent', image_url: null, accords: ['sweet', 'coffee', 'vanilla'], notes: { top: ['Pink Pepper', 'Orange Blossom', 'Pear'], middle: ['Coffee', 'Jasmine', 'Bitter Almond'], base: ['Patchouli', 'Vanilla', 'White Musk', 'Cedar'] } },
      { id: 'ysl-libre', name: 'Libre', brand: 'Yves Saint Laurent', image_url: null, accords: ['floral', 'fresh lavender', 'woody'], notes: { top: ['Mandarin Orange', 'Petitgrain'], middle: ['Lavender', 'Orange Blossom'], base: ['Musk', 'Vanilla', 'Cedar', 'Ambergris'] } },
    ],
    gucci: [
      { id: 'gucci-bloom', name: 'Bloom', brand: 'Gucci', image_url: null, accords: ['floral', 'white floral', 'tuberose'], notes: { top: ['Tuberose'], middle: ['Jasmine', 'Rangoon Creeper'], base: ['Orris', 'Sandalwood'] } },
    ],
    lancome: [
      { id: 'lancome-la-vie-est-belle', name: 'La Vie Est Belle', brand: 'Lancôme', image_url: null, accords: ['sweet', 'floral', 'gourmand'], notes: { top: ['Black Currant', 'Pear'], middle: ['Iris', 'Jasmine', 'Orange Blossom'], base: ['Praline', 'Vanilla', 'Patchouli', 'Tonka Bean', 'Musk'] } },
    ],
    marc: [
      { id: 'marc-jacobs-daisy', name: 'Daisy', brand: 'Marc Jacobs', image_url: null, accords: ['floral', 'fruity', 'fresh'], notes: { top: ['Strawberry', 'Violet Leaves', 'Grapefruit'], middle: ['Violet', 'Gardenia', 'Jasmine'], base: ['Musk', 'Vanilla', 'White Woods'] } },
    ],
    sol: [
      { id: 'sol-de-janeiro-62', name: 'Cheirosa 62', brand: 'Sol de Janeiro', image_url: null, accords: ['sweet', 'gourmand', 'warm'], notes: { top: ['Pistachio', 'Salted Caramel'], middle: ['Jasmine', 'Heliotrope'], base: ['Vanilla', 'Sandalwood', 'Musk'] } },
    ],
    victoria: [
      { id: 'vs-bombshell', name: 'Bombshell', brand: "Victoria's Secret", image_url: null, accords: ['floral', 'fruity', 'sweet'], notes: { top: ['Strawberry', 'Peony', 'Passion Fruit'], middle: ['Rose', 'Orchid', 'Vanilla'], base: ['Musk', 'Oak', 'Sandalwood'] } },
    ],
    byredo: [
      { id: 'byredo-bal-dafrique', name: "Bal d'Afrique", brand: 'Byredo', image_url: null, accords: ['floral', 'woody', 'citrus'], notes: { top: ['Bergamot', 'Lemon', 'African Marigold'], middle: ['Violet', 'Jasmine', 'Cyclamen'], base: ['Musk', 'Vetiver', 'Amber'] } },
    ],
    jo: [
      { id: 'jo-malone-peony-blush', name: 'Peony & Blush Suede', brand: 'Jo Malone London', image_url: null, accords: ['floral', 'suede', 'powdery'], notes: { top: ['Red Apple'], middle: ['Peony', 'Rose', 'Jasmine'], base: ['Suede', 'Musk', 'Plum'] } },
    ],
  }

  const lower = q.toLowerCase()
  const matched: any[] = []
  for (const [key, items] of Object.entries(DEMO)) {
    if (lower.includes(key) || items.some(i => i.name.toLowerCase().includes(lower) || i.brand.toLowerCase().includes(lower))) {
      matched.push(...items.filter(i =>
        i.name.toLowerCase().includes(lower) ||
        i.brand.toLowerCase().includes(lower) ||
        lower.includes(key)
      ))
    }
  }

  // Also do a broad search across all demo items
  if (matched.length === 0) {
    for (const items of Object.values(DEMO)) {
      for (const item of items) {
        if (item.name.toLowerCase().includes(lower) || item.brand.toLowerCase().includes(lower)) {
          matched.push(item)
        }
      }
    }
  }

  return NextResponse.json({ results: matched.slice(0, 20) })
}
