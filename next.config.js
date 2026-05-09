/** @type {import('next').NextConfig} */

// ── Production environment validation ───────────────────────────────────────
// Fail loudly at startup if critical env vars are missing or still set to
// localhost defaults. Catches misconfigured Vercel deployments before they
// silently break Stripe redirects or webhook verification.
const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  const required = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
    'STRIPE_SECRET_KEY',
    'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
    'STRIPE_WEBHOOK_SECRET',
    'STRIPE_PRO_PRICE_ID',
    'STRIPE_COLLECTOR_PRICE_ID',
    'NEXT_PUBLIC_APP_URL',
  ]
  const missing = required.filter(k => !process.env[k])
  if (missing.length) {
    throw new Error(
      `[yourscents.beauty] Missing required environment variables:\n  ${missing.join('\n  ')}\n` +
      `Set them in Vercel → Settings → Environment Variables.`
    )
  }
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || ''
  if (appUrl.includes('localhost')) {
    throw new Error(
      `[yourscents.beauty] NEXT_PUBLIC_APP_URL is set to "${appUrl}" in production.\n` +
      `It must be your live domain, e.g. https://yourscents.beauty`
    )
  }
}

const nextConfig = {
  // TypeScript and ESLint errors must be fixed before a production build succeeds.
  // Do NOT set these to true — it silently ships broken code.
  typescript: { ignoreBuildErrors: false },
  eslint:     { ignoreDuringBuilds: false },

  images: {
    remotePatterns: [
      // Fragrantica CDN — bottle images
      { protocol: 'https', hostname: 'fimgs.net' },
      { protocol: 'https', hostname: '*.fimgs.net' },

      // Fragrantica main site (search result thumbnails)
      { protocol: 'https', hostname: 'www.fragrantica.com' },
      { protocol: 'https', hostname: 'fragrantica.com' },

      // Supabase Storage — user-uploaded images
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: '*.supabase.in' },

      // Wikimedia — fallback bottle shots
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
    ],
  },
}
module.exports = nextConfig
