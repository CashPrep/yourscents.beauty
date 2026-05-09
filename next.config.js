/** @type {import('next').NextConfig} */
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
