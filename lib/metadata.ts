import { createTranslation } from '@/i18n/server';
import { Metadata } from 'next';


export async function generatePageMetadata(page: string): Promise<Metadata> {
  const { t } = await createTranslation(page);

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    keywords: t('meta.keywords'),
    openGraph:{
      title: t('meta.title'),
      description: t('meta.description'),
      url: `https://crunchypix.vercel.app/${page==='home'?'' : page}`,
      images: [
          {
            url: `/api/og?title=${encodeURIComponent(t('meta.title'))}`,
            width: 1200,
            height: 630,
            alt: t('meta.title'),
          },
        ],
    },
    authors: [{ name: "Tahsin Önemli", url: "https://github.com/0x74h51N" }]
  };
}
