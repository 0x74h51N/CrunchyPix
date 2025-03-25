/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: process.env.VERCEL_ENV !== 'production',
  images: {
    domains: ['res.cloudinary.com'],
  },
  experimental: {
    reactCompiler: true,
    serverActions: {
      allowedOrigins: ['crunchypix.com', 'www.crunchypix.com'],
    },
  },
  async redirects() {
    return [
      {
        source: '/:lang(en|tr)/policies',
        destination: '/',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/:lang(en|tr)/:path*',
        destination: '/:lang/:path*',
      },
      {
        source: '/:path*',
        destination: '/en/:path*',
      },
    ];
  },
};
