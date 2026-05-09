import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { buildOccasionStack } from '@/lib/scent-engine'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // ── Plan gate — occasion stack builder is a Pro/Collector feature ───────
  const { data: profile } = await supabase
    .from('profiles')
    .select('plan')
    .eq('id', user.id)
    .single()

  const plan = (profile?.plan as string) ?? 'free'
  if (plan === 'free') {
    return NextResponse.json(
      { error: 'Occasion-based stack recommendations are a Pro feature. Upgrade to unlock them.', upgrade: true },
      { status: 403 }
    )
  }

  const body = await request.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })

  const { occasion } = body
  if (!occasion) return NextResponse.json({ error: 'Occasion required' }, { status: 400 })

  const { data: wardrobe } = await supabase
    .from('wardrobe_items')
    .select('*')
    .eq('user_id', user.id)

  if (!wardrobe?.length) return NextResponse.json({ error: 'Add fragrances first' }, { status: 400 })

  const recommendation = buildOccasionStack(wardrobe, occasion)
  return NextResponse.json(recommendation)
}
