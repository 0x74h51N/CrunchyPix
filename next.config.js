/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    qualities: [75, 98, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/crunchypix/**',
        search: '',
      },
    ],
  },
  reactCompiler: true,
  experimental: {
    serverActions: {
      allowedOrigins: [
        'staging.crunchypix.com',
        'crunchypix.com',
        'www.crunchypix.com',
      ],
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
};
