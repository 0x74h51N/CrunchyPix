import { Metadata } from 'next';

import { SliceZone } from '@prismicio/react';

import { components } from '@/app/[lang]/blog/slices';
import { Locales } from '@/i18n/settings';
import { generatePageMetadata } from '@/lib/metadata';
import { createClient, graphQuery } from '@/prismicio';
import { langMap } from '@/utils/langMap';
import { PostCard } from './components/PostCard';

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata('blog');
}

export default async function Index({
  params,
}: {
  params: Promise<{ lang: Locales }> | undefined;
}) {
  const resolvedParams = params ? await params : { lang: 'en' as Locales };

  const client = createClient();
  const home = await client.getByUID('page', 'home');
  const prismicioLanguacio = langMap(resolvedParams.lang);
  const posts = await client.getAllByType('blog_post', {
    lang: prismicioLanguacio,
    graphQuery,
  });

  return (
    <>
      <SliceZone slices={home.data.slices} components={components} />
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
