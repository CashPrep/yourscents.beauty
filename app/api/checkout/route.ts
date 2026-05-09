import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

// POST /api/checkout
// Body: { plan: 'pro' | 'collector' }
// Returns: { url: string } — the Stripe Checkout URL for client-side redirect.
// We use POST (not GET) so the Stripe session URL never appears in browser
// history, network logs, or referrer headers.
export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })

  const { plan } = body as { plan?: string }
  const priceId =
    plan === 'collector' ? process.env.STRIPE_COLLECTOR_PRICE_ID
    : plan === 'pro'     ? process.env.STRIPE_PRO_PRICE_ID
    : null

  if (!priceId) {
    return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer_email: user.email,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?upgraded=true`,
      cancel_url:  `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
      metadata: { user_id: user.id, plan: plan! },
    })

    if (!session.url) {
      // Stripe returns null url for certain session modes — should not happen
      // for hosted checkout, but guard defensively.
      return NextResponse.json({ error: 'Stripe did not return a checkout URL' }, { status: 502 })
    }

    return NextResponse.json({ url: session.url })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Stripe error'
    return NextResponse.json({ error: msg }, { status: 502 })
  }
}

// GET /api/checkout?plan=pro
// Legacy support: existing links (e.g. email campaigns, older signup flows)
// that use GET are still handled gracefully — they server-redirect to Stripe.
export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const plan = request.nextUrl.searchParams.get('plan')
  const priceId =
    plan === 'collector' ? process.env.STRIPE_COLLECTOR_PRICE_ID
    : plan === 'pro'     ? process.env.STRIPE_PRO_PRICE_ID
    : null

  if (!priceId) {
    return NextResponse.redirect(new URL('/pricing', request.url))
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer_email: user.email,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?upgraded=true`,
      cancel_url:  `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
      metadata: { user_id: user.id, plan: plan! },
    })

    if (!session.url) {
      return NextResponse.redirect(new URL('/pricing', request.url))
    }

    return NextResponse.redirect(session.url)
  } catch {
    return NextResponse.redirect(new URL('/pricing', request.url))
  }
}
