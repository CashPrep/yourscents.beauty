import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient as createSupabase } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const supabase = createSupabase(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Map a Stripe subscription object to the plan name stored in profiles.
// Matches the price IDs set in STRIPE_PRO_PRICE_ID / STRIPE_COLLECTOR_PRICE_ID.
function planFromSubscription(sub: Stripe.Subscription): string {
  const priceId = sub.items?.data?.[0]?.price?.id
  if (priceId === process.env.STRIPE_COLLECTOR_PRICE_ID) return 'collector'
  if (priceId === process.env.STRIPE_PRO_PRICE_ID) return 'pro'
  return 'free'
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')!
  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // ── New subscription created via Checkout ─────────────────────────────────
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.CheckoutSession
    const userId = session.metadata?.user_id
    const plan = session.metadata?.plan
    if (userId && plan) {
      await supabase.from('profiles').update({
        plan,
        stripe_customer_id: session.customer as string,
        stripe_subscription_id: session.subscription as string,
      }).eq('id', userId)
    }
  }

  // ── Plan changed (upgrade / downgrade / reactivation) ─────────────────────
  if (event.type === 'customer.subscription.updated') {
    const sub = event.data.object as Stripe.Subscription
    const newPlan = planFromSubscription(sub)
    await supabase
      .from('profiles')
      .update({ plan: newPlan })
      .eq('stripe_subscription_id', sub.id)
  }

  // ── Subscription cancelled / expired ─────────────────────────────────────
  if (event.type === 'customer.subscription.deleted') {
    const sub = event.data.object as Stripe.Subscription
    await supabase
      .from('profiles')
      .update({ plan: 'free', stripe_subscription_id: null })
      .eq('stripe_subscription_id', sub.id)
  }

  return NextResponse.json({ received: true })
}
