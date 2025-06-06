import { createTranslation, getLocale } from '@/i18n/server';
import { ProjectPageProps, ProjectPageSchema } from '@/lib/schemas';
import { Metadata } from 'next';
import { getCldImageUrl } from 'next-cloudinary';
import { notFound } from 'next/navigation';
import { fetchSupabaseData } from './utils/fetchSupabaseData';

export async function generateSubPageMetadata({
  id,
  page,
}: {
  id: string;
  page: string;
}): Promise<Metadata> {
  const { t } = await createTranslation(page);
  const lang = await getLocale();
  const selectedItem = await fetchSupabaseData<ProjectPageProps>(
    'portfolio_schema',
    'project_page',
    'title,description,ticks,project_id,lang',
    ProjectPageSchema,
    [
      { column: 'lang', value: lang },
      { column: 'project_id', value: id },
    ],
  );

  if (!selectedItem) {
    return notFound();
  }
  const imageUrl = getCldImageUrl({
    src: `crunchypix/portfolioItems/${id.replaceAll('_', '') + 'Top'}`,
    crop: { type: 'fill', width: 800, height: 600 },
  });

  return (
    selectedItem[0] && {
      title: `${t('meta.title')} | ${selectedItem[0].title && selectedItem[0].title}`,
      description: selectedItem[0].description && selectedItem[0].description,
      keywords: selectedItem[0].ticks.join(', '),
      icons: {
        icon: [
          { url: '/favicon-light.ico', media: '(prefers-color-scheme: light)' },
          { url: '/favicon-dark.ico', media: '(prefers-color-scheme: dark)' },
        ],
      },
      openGraph: {
        title: `${t('meta.title')} | ${selectedItem[0].title && selectedItem[0].title}`,
        description: selectedItem[0].description2
          ? selectedItem[0].description2
          : '',
        url: `https://crunchypix.com/portfolio/${id}`,
        images: [
          {
            url: imageUrl,
            width: 800,
            height: 600,
            alt: selectedItem[0].project_id,
          },
        ],
      },
      authors: [{ name: 'Tahsin Önemli', url: 'https://github.com/0x74h51N' }],
    }
  );
}
