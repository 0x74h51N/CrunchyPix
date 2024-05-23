/** @type {import('next').NextConfig} */
module.exports = {
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
