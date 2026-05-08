/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'api.fragella.com' },
      { protocol: 'https', hostname: 'fimgs.net' },
      { protocol: 'https', hostname: '*.fragrantica.com' },
    ],
  },
}

module.exports = nextConfig
