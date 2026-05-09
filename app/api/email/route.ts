import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Simple in-memory rate limiter: max 3 requests per IP per 10 minutes.
// Edge deployments restart between requests so this is best-effort — it
// prevents trivial burst spam without needing Redis or an external service.
const RATE_WINDOW_MS   = 10 * 60 * 1000 // 10 minutes
const RATE_MAX         = 3
const ipMap = new Map<string, { count: number; windowStart: number }>()

function isRateLimited(ip: string): boolean {
  const now  = Date.now()
  const slot = ipMap.get(ip)
  if (!slot || now - slot.windowStart > RATE_WINDOW_MS) {
    ipMap.set(ip, { count: 1, windowStart: now })
    return false
  }
  if (slot.count >= RATE_MAX) return true
  slot.count++
  return false
}

export async function POST(req: NextRequest) {
  // Rate limit by IP
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 },
    )
  }

  try {
    const body = await req.json().catch(() => null)
    const email = body?.email

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    // Basic length guard — real emails are never this long.
    if (email.length > 254) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const { error } = await supabase
      .from('email_signups')
      .insert({ email: email.trim().toLowerCase() })

    // 23505 = unique_violation — already signed up, treat as success.
    if (error && error.code !== '23505') {
      console.error('[email signup]', error)
      return NextResponse.json({ error: 'Could not save email' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[email signup] unexpected', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
