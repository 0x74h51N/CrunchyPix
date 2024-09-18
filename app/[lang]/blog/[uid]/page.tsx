import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PrismicRichText, SliceZone } from '@prismicio/react';
import * as prismic from '@prismicio/client';

import { createClient, graphQuery } from '@/prismicio';
import { components } from '@/app/[lang]/blog/slices';
import { PrismicNextImage } from '@prismicio/next';

import { RichText } from '../components/RichText';

import { createTranslation } from '@/i18n/server';
import { Locales } from '@/i18n/settings';
import { langMap } from '@/utils/langMap';
import dynamic from 'next/dynamic';
import ShareButtons from '../components/ui/ShareButtons';

const PostCard = dynamic(
  () => import('../components/PostCard').then((mod) => mod.PostCard),
  {
    ssr: false,
  },
);
const Slide = dynamic(() => import('../components/Slide'), { ssr: false });
const Menu = dynamic(() => import('../components/ui/Menu'), { ssr: false });
const Toc = dynamic(
  () => import('../components/ui/ToC').then((mod) => mod.Toc),
  {
    ssr: false,
  },
);

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

  let recomendPosts = await client.getAllByType('blog_post', {
    lang: prismicioLanguacio,
    graphQuery,
    orderings: [
      { field: 'my.blog_post.publishDate', direction: 'desc' },
      { field: 'document.first_publication_date', direction: 'desc' },
    ],
    predicates: [prismic.filter.not('my.blog_post.uid', params.uid)],
    limit: 5,
  });

  const { slices, title, publication_date, description, featured_image } =
    page.data;
  const { t } = await createTranslation('blog');

  return (
    <div className="flex flex-col items-center bg-base-100 w-full h-full lg:py-32 md:py-28 py-20">
      <section
        id={'grid-wrapper'}
        className="grid lg:grid-cols-[minmax(179px,350px)_minmax(670px,1fr)_minmax(0px,350px)] xmd:grid-cols-[minmax(150px,280px)_minmax(670px,1fr)] grid-cols-1 mb-10 transition-all ease-in-out duration-500 pb-40 max-xmd:px-3 max-sm:px-0"
      >
        <div className="">
          <Toc slices={slices} title={title} />
        </div>
        <div
          id={'article-wrapper'}
          className="flex flex-col justify-center w-full lg:min-w-[770px] max-w-[850px] transition-all ease-in-out duration-500 relative"
        >
          <div className="flex flex-col items-center gap-3 w-full mb-6">
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
            className="w-full max-w-5xl self-center h-auto rounded-t-xl object-cover"
          />
          <Menu />
          <section
            id={'article-content'}
            className="flex flex-col md:pt-8 pt-4 sm:border rounded-b-lg border-t-base-100 border-base-300 pb-16 xl:px-10 lg:px-6 px-2 gap-4"
          >
            <SliceZone slices={slices} components={components} />
            <div className="absolute right-3 -bottom-8 bg-base-100 sm:border border-base-300 p-4 ">
              <ShareButtons textHidden={false} />
            </div>
          </section>
        </div>
        <div className="min-h-14"></div>
      </section>
      {recomendPosts.length > 0 && (
        <div className="w-full max-w-[1200px] flexCenter self-center flex-col gap-3 mt-20 md:px-8 px-2">
          <h2 className="font-bold text-lg w-full">
            {t('blog-post.recommend')}
          </h2>
          {recomendPosts.length < 3 ? (
            <section className="flex flex-wrap gap-4 w-full xmd:justify-start justify-center items-center">
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
  );
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType('blog_post', { lang: '*' });
  return pages.map((page) => {
    return { uid: page.uid };
  });
}
