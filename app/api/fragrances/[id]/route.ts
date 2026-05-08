import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FRAGELLA_BASE_URL}/v1/fragrances/${id}`,
      {
        headers: { 'Authorization': `Bearer ${process.env.FRAGELLA_API_KEY}` },
        next: { revalidate: 86400 },
      }
    )
    if (!response.ok) throw new Error('Not found')
    const data = await response.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Fragrance not found' }, { status: 404 })
  }
}
