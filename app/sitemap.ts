import type { MetadataRoute } from 'next';
import { fetchSupabaseData } from '@/lib/utils/fetchSupabaseData';
import { PortfolioItemProps, PortfolioItemSchema } from '@/schemas';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticUrls = [
    {
      url: 'https://crunchypix.com',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: 'https://crunchypix.com/portfolio',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: 'https://crunchypix.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  const portfolioItems = await fetchSupabaseData<PortfolioItemProps>(
    'portfolio_schema',
    'portfolio_items',
    '*',
    PortfolioItemSchema,
  );

  const dynamicUrls = portfolioItems.map((item) => ({
    url: `https://crunchypix.com/portfolio/${item._id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticUrls, ...dynamicUrls];
}
