import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { analyzeStack } from '@/lib/scent-engine'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { fragranceIds, occasion } = await request.json()
  if (!fragranceIds || fragranceIds.length < 2)
    return NextResponse.json({ error: 'Select at least 2 fragrances' }, { status: 400 })
  const { data: items } = await supabase.from('wardrobe_items').select('*').in('id', fragranceIds).eq('user_id', user.id)
  if (!items?.length) return NextResponse.json({ error: 'Fragrances not found' }, { status: 404 })
  const analysis = analyzeStack(items, occasion)
  return NextResponse.json(analysis)
}
