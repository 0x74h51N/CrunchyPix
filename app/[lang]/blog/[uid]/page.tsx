import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PrismicRichText, SliceZone } from '@prismicio/react';
import * as prismic from '@prismicio/client';

import { createClient, graphQuery } from '@/prismicio';
import { components } from '@/app/[lang]/blog/slices';
import { PrismicNextImage } from '@prismicio/next';

import { PostCard } from '../components/PostCard';
import { RichText } from '../components/RichText';
import { Toc } from '../components/ToC';
import Menu from '../components/Menu/Menu';
import { createTranslation } from '@/i18n/server';
import Slide from '../components/Slide';
import { Locales } from '@/i18n/settings';
import { langMap } from '@/utils/langMap';

type Params = { uid: string; lang: Locales };

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const prismicioLanguacio = langMap(params.lang);

  const page = await client
    .getByUID('blog_post', params.uid, { lang: prismicioLanguacio })
    .catch(() => notFound());

  return {
    title: prismic.asText(page.data.title),
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
          url: '/favicon-dark.ico',
          media: '(prefers-color-scheme: dark)',
        },
      ],
    },
    openGraph: {
      title: page.data.meta_title || undefined,
      url: `https://crunchypix.com/blog/${params.uid}`,
      images: [
        {
          url: page.data.meta_image.url || '',
        },
      ],
    },
    authors: [{ name: 'Tahsin Önemli', url: 'https://github.com/0x74h51N' }],
  };
}

export default async function Page({ params }: { params: Params }) {
  const client = createClient();

  const prismicioLanguacio = langMap(params.lang);

  const page = await client
    .getByUID('blog_post', params.uid, { lang: prismicioLanguacio })
    .catch(() => notFound());

  const recomendPosts = await client.getAllByType('blog_post', {
    lang: prismicioLanguacio,
    graphQuery,
    limit: 5,
  });
  const { slices, title, publication_date, description, featured_image } =
    page.data;
  const { t } = await createTranslation('blog');

  return (
    <div className="flex flex-col items-center bg-base-100 w-full h-full py-36">
      <div
        id={'article-wrapper'}
        className="flex flex-col gap-10 w-full xl:max-w-[1350px] max-w-[1150px] xl:px-64 lg:px-48 md:px-24 sm:px-8 px-3 transition-all ease-in-out duration-500"
      >
        <section className="flex flex-col gap-8 mb-10 relative">
          <div className="flex flex-col items-center gap-3 w-full">
            <div className="flex flex-col gap-3 pb-4 items-center w-full">
              <div className="text-center text-h1 h1-blog">
                <PrismicRichText field={title} />
              </div>
              <p className="opacity-75 w-full text-right">
                {new Date(publication_date || '').toLocaleDateString()}
              </p>
            </div>
            <div className="text-center">
              <RichText field={description} />
            </div>
          </div>
          <PrismicNextImage
            field={featured_image}
            sizes="100vw"
            className="w-full max-w-4xl self-center h-auto rounded-t-xl object-cover"
          />
          <section id={'article-content'} className="flex flex-col gap-4">
            <Menu />
            <Toc slices={slices} title={title} />
            <SliceZone slices={slices} components={components} />
          </section>
          <div className="min-h-24"></div>
        </section>
        {recomendPosts.length > 0 && (
          <div className="w-full max-w-[1000px] flexCenter self-center flex-col gap-3">
            <h2 className="font-bold text-lg w-full">
              {t('blog-post.recommend')}
            </h2>
            {recomendPosts.length < 3 ? (
              <section className="grid grid-cols-1 xmd:grid-cols-2 gap-8 max-w-3xl w-full justify-items-center mx-auto">
                {recomendPosts.map((post, i) => (
                  <PostCard
                    key={`${post.uid}-recKey-${i}`}
                    post={post}
                    recomendSec
                  />
                ))}
              </section>
            ) : (
              <Slide navigationItems={recomendPosts} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType('blog_post', { lang: '*' });
  return pages.map((page) => {
    return { uid: page.uid };
  });
}
