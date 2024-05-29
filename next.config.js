/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ["res.cloudinary.com"],
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
