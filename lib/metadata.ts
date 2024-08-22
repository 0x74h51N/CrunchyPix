import { createTranslation, getLocale } from '@/i18n/server';
import { Metadata } from 'next';

export async function generatePageMetadata(page: string): Promise<Metadata> {
  const { t } = await createTranslation(page);

  const baseUrl = 'https://crunchypix.com';
  const pageUrl = `${baseUrl}/${page === 'home' ? '' : page}`;
  const locale = getLocale();
  return {
    title: t('meta.title'),
    description: t('meta.description'),
    keywords: t('meta.keywords'),
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      url: pageUrl,
      locale: locale,
      images: [
        {
          url: `${baseUrl}/ogImage.avif`,
          width: 1200,
          height: 630,
          alt: t('meta.title'),
        },
      ],
    },
    authors: [{ name: 'Tahsin Önemli', url: 'https://github.com/0x74h51N' }],
    metadataBase: new URL(baseUrl),
  };
}
