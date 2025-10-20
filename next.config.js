/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removido 'output: export' para permitir API Routes
  trailingSlash: true,
  images: {
    // Permitir imagens externas do Credly
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.credly.com',
      },
      {
        protocol: 'https',
        hostname: '**.credly.com',
      }
    ]
  }
}

module.exports = nextConfig