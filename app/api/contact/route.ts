import { NextRequest, NextResponse } from 'next/server'

// Rate limit: max 3 submissions per IP per 10 min
const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_MAX       = 3
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
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
  }

  const body    = await req.json().catch(() => null)
  const name    = (body?.name    || '').toString().slice(0, 100).trim()
  const email   = (body?.email   || '').toString().slice(0, 254).trim()
  const subject = (body?.subject || '').toString().slice(0, 200).trim()
  const message = (body?.message || '').toString().slice(0, 5000).trim()

  if (!email.includes('@') || !message) {
    return NextResponse.json({ error: 'Email and message are required.' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    // Resend not configured yet — still return success so the UI works
    console.warn('[contact] RESEND_API_KEY not set — email not sent')
    return NextResponse.json({ ok: true, warn: 'Email not configured' })
  }

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
      <h2 style="color:#c4716a;">New Contact Message 🌸</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:6px 0;color:#888;width:80px;">From</td><td style="padding:6px 0;font-weight:600;">${name || 'Anonymous'}</td></tr>
        <tr><td style="padding:6px 0;color:#888;">Email</td><td style="padding:6px 0;"><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td style="padding:6px 0;color:#888;">Subject</td><td style="padding:6px 0;">${subject || '(no subject)'}</td></tr>
      </table>
      <hr style="margin:16px 0;border:none;border-top:1px solid #f0e8e6;"/>
      <p style="white-space:pre-wrap;line-height:1.6;">${message.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</p>
      <hr style="margin:16px 0;border:none;border-top:1px solid #f0e8e6;"/>
      <p style="font-size:12px;color:#aaa;">Sent via yourscents.beauty/contact</p>
    </div>
  `

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method:  'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from:     'Your Scents Contact <onboarding@resend.dev>',
        to:       ['drewgarber31@gmail.com'],
        reply_to: email,
        subject:  `[YourScents Contact] ${subject || 'New message from ' + (name || email)}`,
        html,
      }),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      console.error('[contact] Resend error', err)
      return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact] unexpected', err)
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}
