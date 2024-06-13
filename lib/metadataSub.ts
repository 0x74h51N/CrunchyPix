import { Metadata } from 'next';
import { createTranslation, getLocale } from '@/i18n/server';
import { fetchSupabaseData } from './utils/fetchSupabaseData';
import { ProjectPageProps, ProjectPageSchema } from '@/schemas';
import { getCldImageUrl } from 'next-cloudinary';

export async function generateSubPageMetadata({
  params,
  page,
}: {
  params: { id: string };
  page: string;
}): Promise<Metadata> {
  const { t } = await createTranslation(page);
  const lang = getLocale();
  const selectedItem = await fetchSupabaseData<ProjectPageProps>(
    'portfolio_schema',
    'project_page',
    'title,description,ticks,project_id,lang',
    ProjectPageSchema,
    [
      { column: 'lang', value: lang },
      { column: 'project_id', value: params.id },
    ],
  );

  if (!selectedItem) {
    return {
      title: 'Project Not Found',
      description: 'This project does not exist in the portfolio.',
    };
  }
  const imageUrl = getCldImageUrl({
    src: `crunchypix/portfolioItems/${params.id.replaceAll('_', '') + 'Top'}`,
    crop: { type: 'fill', width: 800, height: 600 },
  });

  return (
    selectedItem[0] && {
      title: `${t('meta.title')} | ${selectedItem[0].title && selectedItem[0].title}`,
      description: selectedItem[0].description && selectedItem[0].description,
      keywords: selectedItem[0].ticks.join(', '),
      openGraph: {
        title: `${t('meta.title')} | ${selectedItem[0].title && selectedItem[0].title}`,
        description: selectedItem[0].description
          ? selectedItem[0].description
          : '',
        url: `https://crunchypix.vercel.app/portfolio/${params.id}`,
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
