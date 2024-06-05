import { Metadata } from 'next';
import { portfolioPageItems } from '@/constants/portfolioItems';
import { createTranslation } from '@/i18n/server';

export async function generateSubPageMetadata({
  params,
  page,
}: {
  params: { id: string };
  page: string;
}): Promise<Metadata> {
  const { t } = await createTranslation(page);
  const selectedItem = portfolioPageItems.find(
    (item) => item._id.toLowerCase().replace(/\s+/g, '') === params.id,
  );

  if (!selectedItem) {
    return {
      title: 'Project Not Found',
      description: 'This project does not exist in the portfolio.',
    };
  }
  const ticksTranslate = selectedItem.ticks
    ? selectedItem.ticks.map((item) => t(item))
    : [];
  return {
    title: `${t('meta.title')} | ${t(selectedItem.title)}`,
    description: selectedItem.description && t(selectedItem.description),
    keywords: ticksTranslate.join(', '),
    openGraph: {
      title: `${t('meta.title')} | ${t(selectedItem.title)}`,
      description: selectedItem.description ? t(selectedItem.description) : '',
      url: `https://crunchypix.vercel.app/portfolio/${params.id}`,
      images: [
        {
          url: selectedItem.image,
          width: 800,
          height: 600,
          alt: selectedItem.title,
        },
      ],
    },
    authors: [{ name: 'Tahsin Önemli', url: 'https://github.com/0x74h51N' }],
  };
}
