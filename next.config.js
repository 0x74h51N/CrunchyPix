/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: process.env.NODE_ENV !== "production",
  images: {
    domains: ['res.cloudinary.com'],
  },
  async redirects() {
    return [
      {
        source: '/policies',
        destination: '/',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/:path*',
      },
    ];
  },
};
