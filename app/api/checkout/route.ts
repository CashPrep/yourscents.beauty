import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.redirect(new URL('/login', request.url))
  const plan = request.nextUrl.searchParams.get('plan')
  const priceId = plan === 'collector' ? process.env.STRIPE_COLLECTOR_PRICE_ID : process.env.STRIPE_PRO_PRICE_ID
  if (!priceId) return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    customer_email: user.email,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?upgraded=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    metadata: { user_id: user.id, plan: plan! },
  })
  return NextResponse.redirect(session.url!)
}
