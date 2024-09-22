import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/private/*',
          '/public/*',
          '/actions/*',
          '/404',
          '/policies/*',
        ],
      },
    ],
    sitemap: 'https://crunchypix.com/sitemap.xml',
  };
}
