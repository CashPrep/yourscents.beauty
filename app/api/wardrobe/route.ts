import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// RFC 4122 UUID regex — guards against malformed IDs in DELETE / PATCH
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

function isValidUUID(id: unknown): id is string {
  return typeof id === 'string' && UUID_RE.test(id)
}

// Clamp a string to maxLen and strip control characters.
function sanitizeStr(v: unknown, maxLen: number): string {
  if (typeof v !== 'string') return ''
  return v.replace(/[\x00-\x1F\x7F]/g, '').trim().slice(0, maxLen)
}

// Ensure a value is a plain string array; silently drop bad elements.
function sanitizeStringArray(v: unknown, maxItems: number, maxItemLen: number): string[] {
  if (!Array.isArray(v)) return []
  return v
    .filter((x): x is string => typeof x === 'string')
    .map(x => sanitizeStr(x, maxItemLen))
    .filter(Boolean)
    .slice(0, maxItems)
}

// Validate image_url: must be https and point to a known image CDN or be empty.
// We don't fetch the URL — we just sanity-check the shape.
function sanitizeImageUrl(v: unknown): string | null {
  if (!v || typeof v !== 'string') return null
  try {
    const url = new URL(v)
    if (url.protocol !== 'https:') return null
    // Allow known fragrance image CDNs only.
    const ALLOWED_HOSTS = [
      'fimgs.net',
      'fragrantica.com',
      'images.fragrantica.com',
      'cdn.fragrantica.com',
      'img.fragrantica.com',
      'upload.wikimedia.org',
      'supabase.co',        // in case users upload their own
      'supabase.in',
    ]
    if (!ALLOWED_HOSTS.some(h => url.hostname === h || url.hostname.endsWith('.' + h))) return null
    if (url.href.length > 512) return null
    return url.href
  } catch {
    return null
  }
}

// ── POST /api/wardrobe — add a fragrance ─────────────────────────────────────
export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })

  const fragrance_name = sanitizeStr(body.fragrance_name, 120)
  const brand          = sanitizeStr(body.brand, 80)

  if (!fragrance_name) return NextResponse.json({ error: 'fragrance_name is required' }, { status: 400 })
  if (!brand)          return NextResponse.json({ error: 'brand is required' },          { status: 400 })

  // Validate the external fragrance ID — either a slug or UUID, max 80 chars.
  const fragrance_id = sanitizeStr(body.fragrance_id, 80) || null

  const accords   = sanitizeStringArray(body.accords,  20, 40)
  const image_url = sanitizeImageUrl(body.image_url)

  // notes can be array-of-strings or { top, middle, base } — normalise to object
  let notes: { top: string[]; middle: string[]; base: string[] } = { top: [], middle: [], base: [] }
  if (body.notes) {
    if (Array.isArray(body.notes)) {
      notes.top = sanitizeStringArray(body.notes, 20, 60)
    } else if (typeof body.notes === 'object') {
      notes.top    = sanitizeStringArray(body.notes.top,    10, 60)
      notes.middle = sanitizeStringArray(body.notes.middle, 10, 60)
      notes.base   = sanitizeStringArray(body.notes.base,   10, 60)
    }
  }

  // Enforce plan limit server-side (belt-and-suspenders with RLS).
  const { data: profile } = await supabase.from('profiles').select('plan').eq('id', user.id).single()
  if (profile?.plan === 'free') {
    const { count } = await supabase
      .from('wardrobe_items')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
    if ((count || 0) >= 3) {
      return NextResponse.json(
        { error: 'Free plan is limited to 3 fragrances. Upgrade to Pro for unlimited.' },
        { status: 403 },
      )
    }
  }

  const { data, error } = await supabase
    .from('wardrobe_items')
    .insert({ user_id: user.id, fragrance_id, fragrance_name, brand, notes, accords, image_url })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// ── PATCH /api/wardrobe — update rating / personal note ───────────────────────
export async function PATCH(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })

  const { id } = body
  if (!isValidUUID(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

  const updates: Record<string, unknown> = {}

  if ('rating' in body) {
    const r = Number(body.rating)
    if (!Number.isInteger(r) || r < 0 || r > 5) {
      return NextResponse.json({ error: 'rating must be 0–5' }, { status: 400 })
    }
    updates.rating = r
  }

  if ('personal_note' in body) {
    updates.personal_note = sanitizeStr(body.personal_note, 500)
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'Nothing to update' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('wardrobe_items')
    .update(updates)
    .eq('id', id)
    .eq('user_id', user.id) // ensures users can only update their own items
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// ── DELETE /api/wardrobe — remove a fragrance ────────────────────────────────
export async function DELETE(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json().catch(() => null)
  const { id } = body || {}

  if (!isValidUUID(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  }

  const { error } = await supabase
    .from('wardrobe_items')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id) // belt-and-suspenders on top of RLS

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
