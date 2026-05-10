/**
 * Centralized affiliate link router for YourScents.beauty
 *
 * Programs:
 *  - FragranceNet  (CJ Affiliate)  — replace FRAGRANCENET_AID with your CJ publisher ID
 *  - Sephora       (Rakuten/Impact) — replace SEPHORA_AID with your publisher ID
 *  - Amazon        (Associates)     — replace AMAZON_TAG with your Associates tag
 *
 * Until you have real IDs, the links fall back to clean search URLs that
 * still work — they just won’t track commissions yet.
 *
 * How to get IDs:
 *  FragranceNet: https://www.cj.com  → search advertiser “FragranceNet”
 *  Sephora:      https://www.rakutenadvertising.com  → search “Sephora”
 *  Amazon:       https://affiliate-program.amazon.com  → create tag
 */

const FRAGRANCENET_AID = process.env.NEXT_PUBLIC_FRAGRANCENET_AID || ''
const SEPHORA_AID      = process.env.NEXT_PUBLIC_SEPHORA_AID      || ''
const AMAZON_TAG       = process.env.NEXT_PUBLIC_AMAZON_TAG       || 'yourscents-20'

export type Retailer = 'fragrancenet' | 'sephora' | 'amazon' | 'nordstrom'

export interface ShopLink {
  retailer:  Retailer
  label:     string
  url:       string
  emoji:     string
  /** approximate commission range shown to devs, not users */
  commissionNote: string
}

/**
 * Build a set of affiliate shop links for a given fragrance.
 * Returns up to 4 retailer links, each with real affiliate params when
 * env vars are set.
 */
export function buildShopLinks(fragranceName: string, brand: string): ShopLink[] {
  const q   = encodeURIComponent(`${brand} ${fragranceName}`)
  const qFN = encodeURIComponent(`${brand} ${fragranceName}`.toLowerCase())

  // ── FragranceNet (CJ) ──────────────────────────────────────────
  // Up to 12% commission. Deep-link format:
  // https://www.fragrancenet.com/search#q=QUERY&kw=QUERY&dcmref=AID
  const fnBase = `https://www.fragrancenet.com/search#q=${qFN}`
  const fnUrl  = FRAGRANCENET_AID
    ? `${fnBase}&kw=${qFN}&dcmref=${FRAGRANCENET_AID}`
    : fnBase

  // ── Sephora (Rakuten) ──────────────────────────────────────────
  // Up to 5% commission.
  const sepBase = `https://www.sephora.com/search?keyword=${q}`
  const sepUrl  = SEPHORA_AID
    ? `${sepBase}&cm_mmc=Affiliates_PJCA-_-${SEPHORA_AID}-_-GS-_-fragrance`
    : sepBase

  // ── Amazon Associates ──────────────────────────────────────────
  // ~3-4% on beauty. Always append tag.
  const amzUrl = `https://www.amazon.com/s?k=${q}&i=beauty&tag=${AMAZON_TAG}`

  // ── Nordstrom (no formal aff program, but good UX + price anchor) ───
  const nordUrl = `https://www.nordstrom.com/sr?keyword=${q}&origin=keywordsearch`

  return [
    { retailer: 'fragrancenet', label: 'FragranceNet', url: fnUrl,   emoji: '💰', commissionNote: 'up to 12%' },
    { retailer: 'sephora',      label: 'Sephora',      url: sepUrl,  emoji: '🛒', commissionNote: 'up to 5%'  },
    { retailer: 'amazon',       label: 'Amazon',       url: amzUrl,  emoji: '📦', commissionNote: '~3-4%'    },
    { retailer: 'nordstrom',    label: 'Nordstrom',    url: nordUrl, emoji: '🛍️', commissionNote: '0% (UX)'  },
  ]
}

/**
 * Return only the single best link for compact card use.
 * Priority: FragranceNet (highest commission) → Sephora → Amazon
 */
export function bestShopLink(fragranceName: string, brand: string): ShopLink {
  return buildShopLinks(fragranceName, brand)[0]
}
