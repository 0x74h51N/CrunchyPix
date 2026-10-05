const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const siteHost = siteUrl ? new URL(siteUrl).host : undefined;

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
      // Same-origin requests are always allowed; this covers a custom domain
      // set via NEXT_PUBLIC_SITE_URL when it differs from the request host.
      allowedOrigins: siteHost ? [siteHost] : [],
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
