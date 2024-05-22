/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  async redirects() {
    return [
      {
        source: "/policies",
        destination: "/",
        permanent: true,
      },
    ];
  },
};
