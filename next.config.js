/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Enable App Router
  },
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  // Optimize performance
  compress: true,
  poweredByHeader: false,
}

module.exports = nextConfig