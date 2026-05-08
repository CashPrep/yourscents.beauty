import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q')
  if (!q) return NextResponse.json({ results: [] })
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_FRAGELLA_BASE_URL}/v1/fragrances/search?q=${encodeURIComponent(q)}&limit=20`,
      { headers: { Authorization: `Bearer ${process.env.FRAGELLA_API_KEY}` } }
    )
    if (!res.ok) throw new Error('Search failed')
    return NextResponse.json(await res.json())
  } catch {
    return NextResponse.json({ results: [] })
  }
}
