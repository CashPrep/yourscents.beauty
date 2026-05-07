import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')
  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] })
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FRAGELLA_BASE_URL}/v1/fragrances/search?q=${encodeURIComponent(query)}&limit=20`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.FRAGELLA_API_KEY}`,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 },
      }
    )
    if (!response.ok) throw new Error('Fragrance API error')
    const data = await response.json()
    return NextResponse.json({ results: data.data || data.results || [] })
  } catch (error) {
    console.error('Fragrance search error:', error)
    return NextResponse.json({ error: 'Failed to search fragrances' }, { status: 500 })
  }
}
