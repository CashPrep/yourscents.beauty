import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

// POST /api/billing-portal
// Creates a Stripe Customer Portal session and returns the URL.
// The client redirects the user there so they can manage / cancel their subscription.
export async function POST() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabase
    .from('profiles')
    .select('stripe_customer_id')
    .eq('id', user.id)
    .single()

  const customerId = profile?.stripe_customer_id as string | undefined
  if (!customerId) {
    return NextResponse.json(
      { error: 'No billing account found. Please contact support.' },
      { status: 404 }
    )
  }

  try {
    const session = await stripe.billingPortal.sessions.create({
      customer:   customerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    })
    return NextResponse.json({ url: session.url })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Stripe error'
    return NextResponse.json({ error: msg }, { status: 502 })
  }
}
