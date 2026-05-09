import { NextResponse } from 'next/server'

type Context = { params: Promise<{ id: string }> }

export async function GET(_request: Request, { params }: Context) {
  // Next.js 15: params is a Promise — must be awaited before accessing.
  const { id } = await params
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

  // ── Primary: Fragella ─────────────────────────────────────────────────────
  if (process.env.FRAGELLA_API_KEY && process.env.FRAGELLA_API_KEY !== 'your_fragella_api_key') {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_FRAGELLA_BASE_URL}/v1/fragrances/${encodeURIComponent(id)}`,
        { headers: { Authorization: `Bearer ${process.env.FRAGELLA_API_KEY}` }, next: { revalidate: 3600 } }
      )
      if (res.ok) return NextResponse.json(await res.json())
    } catch { /* fall through */ }
  }

  // ── Backup: RapidAPI ─────────────────────────────────────────────────────
  if (process.env.RAPIDAPI_KEY && process.env.RAPIDAPI_KEY !== 'your_rapidapi_key') {
    try {
      const res = await fetch(
        `https://perfumes-and-fragrances.p.rapidapi.com/fragrances/${encodeURIComponent(id)}`,
        {
          headers: {
            'x-rapidapi-host': 'perfumes-and-fragrances.p.rapidapi.com',
            'x-rapidapi-key': process.env.RAPIDAPI_KEY,
          },
          next: { revalidate: 3600 },
        }
      )
      if (res.ok) return NextResponse.json(await res.json())
    } catch { /* fall through */ }
  }

  // If demo ID (from search fallback) just return 404 — notes already embedded
  return NextResponse.json({ error: 'Not found' }, { status: 404 })
}
