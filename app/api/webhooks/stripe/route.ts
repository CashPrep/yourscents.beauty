import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient as createSupabase } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const supabase = createSupabase(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

function planFromSubscription(sub: Stripe.Subscription): string {
  const priceId = sub.items?.data?.[0]?.price?.id
  if (priceId === process.env.STRIPE_COLLECTOR_PRICE_ID) return 'collector'
  if (priceId === process.env.STRIPE_PRO_PRICE_ID) return 'pro'
  return 'free'
}

function effectivePlan(sub: Stripe.Subscription): string {
  if (sub.status === 'past_due' || sub.status === 'unpaid' || sub.status === 'incomplete') return 'free'
  if (sub.status === 'canceled' || sub.status === 'incomplete_expired') return 'free'
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

  if (event.type === 'checkout.session.completed') {
    try {
      const session = event.data.object as Stripe.Checkout.Session
      const userId = session.metadata?.user_id
      const plan   = session.metadata?.plan
      if (userId && plan) {
        await supabase.from('profiles').update({
          plan,
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: session.subscription as string,
        }).eq('id', userId)
      }
    } catch (err) {
      console.error('checkout.session.completed error', err)
    }
  }

  if (event.type === 'customer.subscription.updated') {
    const sub = event.data.object as Stripe.Subscription
    await supabase.from('profiles').update({ plan: effectivePlan(sub) }).eq('stripe_subscription_id', sub.id)
  }

  if (event.type === 'customer.subscription.deleted') {
    const sub = event.data.object as Stripe.Subscription
    await supabase.from('profiles').update({ plan: 'free', stripe_subscription_id: null }).eq('stripe_subscription_id', sub.id)
  }

  if (event.type === 'invoice.payment_failed') {
    const invoice = event.data.object as Stripe.Invoice
    const subId = typeof invoice.subscription === 'string' ? invoice.subscription : invoice.subscription?.id
    if (subId) await supabase.from('profiles').update({ plan: 'free' }).eq('stripe_subscription_id', subId)
  }

  if (event.type === 'invoice.paid') {
    const invoice = event.data.object as Stripe.Invoice
    const subId = typeof invoice.subscription === 'string' ? invoice.subscription : invoice.subscription?.id
    if (subId) {
      const sub = await stripe.subscriptions.retrieve(subId)
      await supabase.from('profiles').update({ plan: effectivePlan(sub) }).eq('stripe_subscription_id', subId)
    }
  }

  return NextResponse.json({ received: true })
}
