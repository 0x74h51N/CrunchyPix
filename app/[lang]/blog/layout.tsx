import { PrismicPreview } from '@prismicio/next';
import { createClient, repositoryName } from '@/prismicio';
import PostsReducer from './components/PostsReducer';

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = createClient();
  const navigation = await client.getSingle('navigation');

  const menuItems = navigation.data.menu_items;

  return (
    <div className="flex flex-col min-w-[100svw] min-h-[100svh] items-center !select-text !cursor-auto ">
      <PostsReducer items={menuItems} />
      <div className=" w-full min-h-screen flex flex-col gap-20 items-center">
        {children}
        <PrismicPreview repositoryName={repositoryName} />
      </div>
    </div>
  );
}
