/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'media.istockphoto.com', 'imgs.search.brave.com'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig 