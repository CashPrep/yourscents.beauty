import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient as createSupabase } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const supabase = createSupabase(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Map a Stripe subscription price ID → plan name stored in profiles.
function planFromSubscription(sub: Stripe.Subscription): string {
  const priceId = sub.items?.data?.[0]?.price?.id
  if (priceId === process.env.STRIPE_COLLECTOR_PRICE_ID) return 'collector'
  if (priceId === process.env.STRIPE_PRO_PRICE_ID) return 'pro'
  return 'free'
}

// Derive the effective plan taking payment status into account.
// If Stripe marks the subscription as past_due or unpaid, we downgrade access
// to free until payment resolves — prevents indefinite free access on failed cards.
function effectivePlan(sub: Stripe.Subscription): string {
  if (sub.status === 'past_due' || sub.status === 'unpaid' || sub.status === 'incomplete') {
    return 'free'
  }
  if (sub.status === 'canceled' || sub.status === 'incomplete_expired') {
    return 'free'
  }
  return planFromSubscription(sub)
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

  // ── 1. New subscription created via Checkout ────────────────────────────
  if (event.type === 'checkout.session.completed') {
    try {
      const session = event.data.object as Stripe.CheckoutSession
      const userId = session.metadata?.user_id
      const plan   = session.metadata?.plan
      if (userId && plan) {
        await supabase.from('profiles').update({
          plan,
          stripe_customer_id:      session.customer as string,
          stripe_subscription_id:  session.subscription as string,
        }).eq('id', userId)
      }
    } catch (err) {
      console.error('[webhook] checkout.session.completed error:', err)
    }
  }

  // ── 2. Subscription updated (upgrade / downgrade / reactivation / past_due)
  if (event.type === 'customer.subscription.updated') {
    try {
      const sub  = event.data.object as Stripe.Subscription
      const plan = effectivePlan(sub)
      await supabase
        .from('profiles')
        .update({ plan })
        .eq('stripe_subscription_id', sub.id)
    } catch (err) {
      console.error('[webhook] customer.subscription.updated error:', err)
    }
  }

  // ── 3. Subscription cancelled / fully expired ────────────────────────────
  if (event.type === 'customer.subscription.deleted') {
    try {
      const sub = event.data.object as Stripe.Subscription
      await supabase
        .from('profiles')
        .update({ plan: 'free', stripe_subscription_id: null })
        .eq('stripe_subscription_id', sub.id)
    } catch (err) {
      console.error('[webhook] customer.subscription.deleted error:', err)
    }
  }

  // ── 4. Payment failed (initial charge or renewal) ────────────────────────
  //    Downgrade to free immediately so a declined card doesn't grant free
  //    indefinite access. Stripe will retry — invoice.paid will restore access.
  if (event.type === 'invoice.payment_failed') {
    try {
      const invoice       = event.data.object as Stripe.Invoice
      const subscriptionId = typeof invoice.subscription === 'string'
        ? invoice.subscription
        : invoice.subscription?.id
      if (subscriptionId) {
        await supabase
          .from('profiles')
          .update({ plan: 'free' })
          .eq('stripe_subscription_id', subscriptionId)
      }
    } catch (err) {
      console.error('[webhook] invoice.payment_failed error:', err)
    }
  }

  // ── 5. Payment succeeded (covers retries after a prior failure) ──────────
  //    Re-fetch the subscription from Stripe to get the canonical plan and
  //    restore access if it was downgraded by a previous payment failure.
  if (event.type === 'invoice.paid') {
    try {
      const invoice        = event.data.object as Stripe.Invoice
      const subscriptionId = typeof invoice.subscription === 'string'
        ? invoice.subscription
        : invoice.subscription?.id
      if (subscriptionId) {
        const sub  = await stripe.subscriptions.retrieve(subscriptionId)
        const plan = effectivePlan(sub)
        await supabase
          .from('profiles')
          .update({ plan })
          .eq('stripe_subscription_id', subscriptionId)
      }
    } catch (err) {
      console.error('[webhook] invoice.paid error:', err)
    }
  }

  return NextResponse.json({ received: true })
}
