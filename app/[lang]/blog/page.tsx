import { Metadata } from 'next';

import { SliceZone } from '@prismicio/react';
import * as prismic from '@prismicio/client';

import { createClient } from '@/prismicio';
import { components } from '@/app/[lang]/blog/slices';
import { PostCard } from './components/PostCard';

/**
 * This component renders your homepage.
 *
 * Use Next's generateMetadata function to render page metadata.
 *
 * Use the SliceZone to render the content of the page.
 */

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const home = await client.getByUID('page', 'home');

  return {
    description: home.data.meta_description,
    openGraph: {
      title: home.data.meta_title || undefined,
      images: [
        {
          url: home.data.meta_image.url || '',
        },
      ],
    },
  };
}

export default async function Index() {
  // The client queries content from the Prismic API
  const client = createClient();
  // Fetch the content of the home page from Prismic
  const home = await client.getByUID('page', 'home');

  // Get all of the blog_post documents created on Prismic ordered by publication date
  const posts = await client.getAllByType('blog_post', {
    orderings: [
      { field: 'my.blog_post.publication_date', direction: 'desc' },
      { field: 'document.first_publication_date', direction: 'desc' },
    ],
  });

  return (
    <>
      <SliceZone slices={home.data.slices} components={components} />
      {/* Map over each of the blog posts created and display a `PostCard` for it */}
      <div className="container mx-auto px-4 sm:px-6 xl:px-0 lg:px-8 max-w-7xl w-auto pb-40">
        <div className="grid grid-cols-1 xmd:grid-cols-2 2xl:gap-14 md:gap-8 gap-4 justify-items-center">
          {posts &&
            posts.map((post, index) => (
              <PostCard key={post.uid + 'postcard-' + index} post={post} />
            ))}
        </div>
      </div>
    </>
  );
}
