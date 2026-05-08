import { NextResponse } from 'next/server'

export async function GET(request: Request, context: any) {
  const id = context.params?.id
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_FRAGELLA_BASE_URL}/v1/fragrances/${id}`,
      { headers: { Authorization: `Bearer ${process.env.FRAGELLA_API_KEY}` } }
    )
    if (!res.ok) throw new Error('Not found')
    return NextResponse.json(await res.json())
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
}
