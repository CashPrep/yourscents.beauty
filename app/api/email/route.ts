import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const { error } = await supabase
      .from('email_signups')
      .insert({ email: email.trim().toLowerCase() })

    // 23505 = unique_violation — already signed up, treat as success
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
