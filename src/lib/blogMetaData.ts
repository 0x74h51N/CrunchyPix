import { Locales } from '@/i18n/settings';
import { createClient } from '@/prismicio';
import { langMap } from '@/utils/langMap';
import * as prismic from '@prismicio/client';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateBlogMetadata({
  params,
}: {
  params: { uid: string; lang: Locales };
}): Promise<Metadata> {
  const paramss = await params;
  const lang = paramss.lang;
  const uid = paramss.uid;
  const client = createClient();
  const prismicioLanguacio = langMap(lang);

  const page = await client
    .getByUID('blog_post', uid, { lang: prismicioLanguacio })
    .catch(() => notFound());

  return {
    title: 'Blog | ' + prismic.asText(page.data.title),
    description: page.data.meta_description,
    keywords: page.tags.join(', '),
    icons: {
      icon: [
        {
          rel: 'icon',
          url: '/favicon-light.ico',
          media: '(prefers-color-scheme: light)',
        },
        {
          rel: 'icon',
          url: '/favicon.ico',
          media: '(prefers-color-scheme: dark)',
        },
      ],
    },
    openGraph: {
      title: page.data.meta_title || undefined,
      url: `https://crunchypix.com/${lang}/blog/${uid}`,
      images: [{ url: page.data.meta_image.url || '' }],
    },
    authors: [{ name: 'Tahsin Önemli', url: 'https://github.com/0x74h51N' }],
  };
}
