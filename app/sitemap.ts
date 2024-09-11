import type { MetadataRoute } from 'next';
import { generateStaticParams as generatePortfolioStaticParams } from './[lang]/portfolio/[id]/page';
import { generateStaticParams as generateBlogParams } from './[lang]/blog/[uid]/page';

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
          tr: `${baseUrl}/tr`,
        },
      },
    },
    {
      url: `${baseUrl}/en/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
      alternates: {
        languages: {
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
          tr: `${baseUrl}/tr/about`,
        },
      },
    },
    {
      url: `${baseUrl}/en/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
      alternates: {
        languages: {
          tr: `${baseUrl}/tr/blog`,
        },
      },
    },
  ];
  const blogItems = await generateBlogParams();
  const portfolioItems = await generatePortfolioStaticParams();

  const dynamicPortfolioUrls = portfolioItems.map((item) => ({
    url: `${baseUrl}/en/portfolio/${item.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
    alternates: {
      languages: {
        tr: `${baseUrl}/tr/portfolio/${item.id}`,
      },
    },
  }));

  const dynamicBlogUrls = blogItems.map((item) => ({
    url: `${baseUrl}/en/blog/${item.uid}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1,
    alternates: {
      languages: {
        tr: `${baseUrl}/tr/blog/${item.uid}`,
      },
    },
  }));

  return [...staticUrls, ...dynamicBlogUrls, ...dynamicPortfolioUrls];
}
