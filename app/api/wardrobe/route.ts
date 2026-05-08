import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await request.json()
  const { fragrance_id, fragrance_name, brand, notes, accords, image_url } = body
  const { data: profile } = await supabase.from('profiles').select('plan').eq('id', user.id).single()
  if (profile?.plan === 'free') {
    const { count } = await supabase.from('wardrobe_items').select('*', { count: 'exact', head: true }).eq('user_id', user.id)
    if ((count || 0) >= 10) {
      return NextResponse.json({ error: 'Free plan limit reached. Upgrade to Pro.' }, { status: 403 })
    }
  }
  const { data, error } = await supabase.from('wardrobe_items').insert({
    user_id: user.id, fragrance_id, fragrance_name, brand,
    notes: notes || [], accords: accords || [], image_url,
  }).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await request.json()
  const { error } = await supabase.from('wardrobe_items').delete().eq('id', id).eq('user_id', user.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
