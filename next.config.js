/** @type {import('next').NextConfig} */

// ── Production environment validation ───────────────────────────────────────
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
  typescript: { ignoreBuildErrors: false },
  eslint:     { ignoreDuringBuilds: false },

  // ── Tree-shake large icon/component libraries so only used exports are bundled
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },

  // ── Strip console.* calls in production builds
  compiler: {
    removeConsole: isProd ? { exclude: ['error'] } : false,
  },

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'fimgs.net' },
      { protocol: 'https', hostname: '*.fimgs.net' },
      { protocol: 'https', hostname: 'www.fragrantica.com' },
      { protocol: 'https', hostname: 'fragrantica.com' },
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: '*.supabase.in' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      // Unsplash hero/CTA images served via next/image
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    // Prefer AVIF → WebP for ~30% smaller images
    formats: ['image/avif', 'image/webp'],
  },

  // ── Aggressive static-asset caching & security headers
  async headers() {
    return [
      {
        // Cache immutable JS/CSS chunks for 1 year
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Cache public assets (logo, og-image, etc.) for 7 days
        source: '/:path((?!_next).*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
}
module.exports = nextConfig
