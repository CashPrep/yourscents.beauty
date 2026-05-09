import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { analyzeStack } from '@/lib/scent-engine'

// Plan limits for stack analysis
const PLAN_STACK_LIMIT: Record<string, number> = {
  free:      0, // free users cannot run stack analysis — it's a Pro feature
  pro:       Infinity,
  collector: Infinity,
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // ── Plan gate — stack analysis is a Pro/Collector feature ──────────────
  const { data: profile } = await supabase
    .from('profiles')
    .select('plan')
    .eq('id', user.id)
    .single()

  const plan  = (profile?.plan as string) ?? 'free'
  const limit = PLAN_STACK_LIMIT[plan] ?? 0

  if (limit === 0) {
    return NextResponse.json(
      { error: 'Stack analysis is a Pro feature. Upgrade to unlock full stack scoring and combos.', upgrade: true },
      { status: 403 }
    )
  }

  const body = await request.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })

  const { fragranceIds, occasion } = body
  if (!fragranceIds || fragranceIds.length < 2)
    return NextResponse.json({ error: 'Select at least 2 fragrances' }, { status: 400 })

  const { data: items } = await supabase
    .from('wardrobe_items')
    .select('*')
    .in('id', fragranceIds)
    .eq('user_id', user.id)

  if (!items?.length) return NextResponse.json({ error: 'Fragrances not found' }, { status: 404 })

  const analysis = analyzeStack(items, occasion)
  return NextResponse.json(analysis)
}
