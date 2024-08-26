/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: process.env.NODE_ENV !== 'production',
  images: {
    domains: ['res.cloudinary.com'],
  },
  async redirects() {
    return [
      {
        source: '/:lang(en|tr|de)/policies',
        destination: '/',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/:lang(en|tr|de)/:path*',
        destination: '/:lang/:path*',
      },
      {
        source: '/:path*',
        destination: '/en/:path*',
      },
    ];
  },
};
