import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { SliceZone } from '@prismicio/react';
import * as prismic from '@prismicio/client';

import { createClient } from '@/prismicio';
import { components } from '@/app/[lang]/blog/slices';
import { PrismicNextImage } from '@prismicio/next';

import { PostCard } from '../components/PostCard';
import { RichText } from '../components/RichText';
import { Toc } from '../components/ToC';
import Menu from '../components/Menu/Menu';
import { createTranslation } from '@/i18n/server';
import Slide from '../components/Slide';

type Params = { uid: string };

/**
 * This page renders a Prismic Document dynamically based on the URL.
 */

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID('blog_post', params.uid)
    .catch(() => notFound());

  return {
    title: prismic.asText(page.data.title),
    description: page.data.meta_description,
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
      images: [
        {
          url: page.data.meta_image.url || '',
        },
      ],
    },
  };
}

export default async function Page({ params }: { params: Params }) {
  const client = createClient();

  // Fetch the current blog post page being displayed by the UID of the page
  const page = await client
    .getByUID('blog_post', params.uid)
    .catch(() => notFound());

  /**
   * Fetch all of the blog posts in Prismic (max 2), excluding the current one, and ordered by publication date.
   *
   * We use this data to display our "recommended posts" section at the end of the blog post
   */
  const posts = await client.getAllByType('blog_post', {
    predicates: [prismic.filter.not('my.blog_post.uid', params.uid)],
    orderings: [
      { field: 'my.blog_post.publication_date', direction: 'desc' },
      { field: 'document.first_publication_date', direction: 'desc' },
    ],
    limit: 4,
  });

  // Destructure out the content of the current page
  const { slices, title, publication_date, description, featured_image } =
    page.data;
  const { t } = await createTranslation('blog');

  return (
    <div className="flex flex-col items-center bg-base-100 w-full h-full py-36">
      <div
        id={'article-wrapper'}
        className="flex flex-col gap-12 w-full xl:max-w-[1350px] max-w-[1150px] xl:px-64 lg:px-48 md:px-18 sm:px-8 px-3 transition-all ease-in-out duration-500"
      >
        <section className="flex flex-col gap-12 mb-10 relative">
          <div className="flex flex-col items-center gap-3 w-full">
            <div className="flex flex-col gap-3 pb-4 items-center w-full">
              <div className="text-center">
                <RichText field={title} />
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
            className="w-full max-w-4xl self-center max-h-96 rounded-t-xl object-cover"
          />
          <section id={'article-content'} className="flex flex-col gap-10">
            <Menu />
            {/* Display the content of the blog post */}
            <Toc slices={slices} title={title} />
            <SliceZone slices={slices} components={components} />
          </section>
          <div className="min-h-24"></div>
        </section>
        {/* Display the Recommended Posts section using the posts we requested earlier */}
        {posts.length > 1 && (
          <div className="w-full max-w-[1000px] flexCenter self-center flex-col gap-3">
            <h2 className="font-bold text-lg w-full">
              {t('blog-post.recommend')}
            </h2>
            {posts.length < 3 ? (
              <section className="grid grid-cols-1 xmd:grid-cols-2 gap-8 max-w-3xl w-full justify-items-center mx-auto">
                {posts.map((post, i) => (
                  <PostCard
                    key={`${post.uid}-recKey-${i}`}
                    post={post}
                    recSec
                  />
                ))}
              </section>
            ) : (
              <Slide posts={posts} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType('blog_post');
  return pages.map((page) => {
    return { uid: page.uid };
  });
}
