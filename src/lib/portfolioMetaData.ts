import { createTranslation } from '@/i18n/server';
import { Locales } from '@/i18n/settings';
import { ProjectPageProps } from '@/lib/schemas';
import { Metadata } from 'next';
import { getCldImageUrl } from 'next-cloudinary';
import { notFound } from 'next/navigation';

export async function generatePortfolioMetadata({
  id,
  page,
  projectData,
  lang,
}: {
  id: string;
  page: string;
  projectData: ProjectPageProps;
  lang: Locales;
}): Promise<Metadata> {
  const { t } = await createTranslation(page);

  if (!projectData) {
    return notFound();
  }

  const imageUrl = getCldImageUrl({
    src: `crunchypix/portfolioItems/${id.replaceAll('_', '') + 'Top'}`,
    crop: { type: 'fill', width: 800, height: 600 },
  });

  return {
    title: `${t('meta.title')} | ${projectData.title && projectData.title}`,
    description: projectData.description && projectData.description,
    keywords: projectData.ticks.join(', '),
    icons: {
      icon: [
        { url: '/favicon-light.ico', media: '(prefers-color-scheme: light)' },
        { url: '/favicon.ico', media: '(prefers-color-scheme: dark)' },
      ],
    },
    openGraph: {
      title: `${t('meta.title')} | ${projectData.title && projectData.title}`,
      description: projectData.description2 ? projectData.description2 : '',
      url: `https://crunchypix.com/${lang}/portfolio/${id}`,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: projectData.project_id,
        },
      ],
    },
    authors: [{ name: 'Tahsin Önemli', url: 'https://github.com/0x74h51N' }],
  };
}
