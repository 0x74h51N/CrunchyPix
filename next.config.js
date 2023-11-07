/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ["picsum.photos"],
  },
  i18n: {
    locales: ["en", "de", "tr"],
    defaultLocale: "en",
    localeDetection: false,
  },
};
