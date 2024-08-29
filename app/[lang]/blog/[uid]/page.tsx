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
import Menu from '../components/Menu';
import { createTranslation } from '@/i18n/server';

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
    limit: 2,
  });

  // Destructure out the content of the current page
  const { slices, title, publication_date, description, feutured_image } =
    page.data;
  const { t } = await createTranslation('blog');
  return (
    <div className="flex flex-col items-center bg-base-100 w-full h-full pb-20">
      <div className="flex flex-col gap-12 w-full max-w-[1150px] lg:px-52 md:px-10 px-4">
        {/* Display the "hero" section of the blog post */}

        <section
          id={'blog-section'}
          className="flex flex-col gap-12 mb-40 -pb-40 relative"
        >
          <Menu />
          <div className="flex flex-col items-center gap-3 w-full">
            <div className="flex flex-col gap-6 items-center">
              <div className="text-center">
                <RichText field={title} />
              </div>
              <p className="opacity-75 w-full pb-1 text-right">
                {new Date(publication_date || '').toLocaleDateString()}
              </p>
            </div>
            <div className="text-center">
              <RichText field={description} />
            </div>
          </div>
          <PrismicNextImage
            field={feutured_image}
            sizes="100vw"
            className="w-full max-w-3xl self-center max-h-96 rounded-xl object-cover"
          />
          {/* Display the content of the blog post */}
          <Toc slices={slices} title={title} />
          <SliceZone slices={slices} components={components} />
        </section>
        {/* Display the Recommended Posts section using the posts we requested earlier */}
        {posts.length > 1 && (
          <>
            <h2 className="font-bold w-full">{t('blog-post.recommend')}</h2>
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl w-full justify-items-center mx-auto">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </section>
          </>
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
