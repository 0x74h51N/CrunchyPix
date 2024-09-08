import { Metadata } from 'next';

import { SliceZone } from '@prismicio/react';

import { createClient } from '@/prismicio';
import { components } from '@/app/[lang]/blog/slices';
import { PostCard } from './components/PostCard';
import { Locales } from '@/i18n/settings';
import { langMap } from '@/utils/langMap';

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

export default async function Index({ params }: { params: { lang: Locales } }) {
  const client = createClient();
  const home = await client.getByUID('page', 'home');
  const prismicioLanguacio = langMap(params.lang);

  const navigations = await client.getAllByType('navigation', {
    lang: prismicioLanguacio,
    orderings: [
      { field: 'my.navitaion.publication_date', direction: 'desc' },
      { field: 'document.first_publication_date', direction: 'desc' },
    ],
  });

  return (
    <>
      <SliceZone slices={home.data.slices} components={components} />
      {/* Map over each of the blog posts created and display a `PostCard` for it */}
      <div className="container mx-auto px-4 sm:px-6 xl:px-0 lg:px-8 max-w-7xl w-auto pb-40">
        <div className="grid grid-cols-1 xmd:grid-cols-2 2xl:gap-14 md:gap-8 gap-4 justify-items-center">
          {navigations &&
            navigations[0].data.menu_items.map((post, index) => (
              <PostCard key={post.link + 'postcard-' + index} post={post} />
            ))}
        </div>
      </div>
    </>
  );
}
