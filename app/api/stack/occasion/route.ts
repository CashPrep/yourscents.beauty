import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { buildOccasionStack } from '@/lib/scent-engine'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { occasion } = await request.json()
  if (!occasion) return NextResponse.json({ error: 'Occasion required' }, { status: 400 })
  const { data: wardrobe } = await supabase.from('wardrobe_items').select('*').eq('user_id', user.id)
  if (!wardrobe?.length) return NextResponse.json({ error: 'Add fragrances first' }, { status: 400 })
  const recommendation = buildOccasionStack(wardrobe, occasion)
  return NextResponse.json(recommendation)
}
