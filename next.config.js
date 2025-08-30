/** @type {import('next').NextConfig} */
module.exports = {
  images: {
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
  experimental: {
    reactCompiler: true,
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
