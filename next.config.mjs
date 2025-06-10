/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'export',
  trailingSlash: true,
  basePath: '/translator',
  assetPrefix: '/translator/',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
