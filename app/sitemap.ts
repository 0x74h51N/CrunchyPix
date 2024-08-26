import type { MetadataRoute } from 'next';
import { fetchSupabaseData } from '@/lib/utils/fetchSupabaseData';
import { PortfolioItemProps, PortfolioItemSchema } from '@/schemas';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://crunchypix.com';
  const staticUrls = [
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
      alternates: {
        languages: {
          de: `${baseUrl}/de`,
          tr: `${baseUrl}/tr`,
        },
      },
    },
    {
      url: `${baseUrl}/en/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
      alternates: {
        languages: {
          de: `${baseUrl}/de/portfolio`,
          tr: `${baseUrl}/tr/portfolio`,
        },
      },
    },
    {
      url: `${baseUrl}/en/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
      alternates: {
        languages: {
          de: `${baseUrl}/de/about`,
          tr: `${baseUrl}/tr/about`,
        },
      },
    },
  ];

  const portfolioItems = await fetchSupabaseData<PortfolioItemProps>(
    'portfolio_schema',
    'portfolio_items',
    '*',
    PortfolioItemSchema,
  );

  const dynamicUrls = portfolioItems.map((item) => ({
    url: `${baseUrl}/en/portfolio/${item._id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
    alternates: {
      languages: {
        de: `${baseUrl}/de/portfolio/${item._id}`,
        tr: `${baseUrl}/tr/portfolio/${item._id}`,
      },
    },
  }));

  return [...staticUrls, ...dynamicUrls];
}
