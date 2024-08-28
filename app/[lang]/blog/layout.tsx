import { PrismicPreview } from '@prismicio/next';
import { createClient, repositoryName } from '@/prismicio';
import PostsReducer from './components/PostsReducer';

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = createClient();

  const posts = await client.getAllByType('blog_post', {
    orderings: [
      { field: 'my.blog_post.publication_date', direction: 'desc' },
      { field: 'document.first_publication_date', direction: 'desc' },
    ],
  });
  return (
    <div className="flex flex-col items-center">
      <PostsReducer posts={posts} />
      <div className=" w-full min-h-screen flex flex-col gap-20 items-center">
        {children}
        <PrismicPreview repositoryName={repositoryName} />
      </div>
    </div>
  );
}
