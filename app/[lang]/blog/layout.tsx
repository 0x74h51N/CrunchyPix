import { PrismicPreview } from '@prismicio/next';
import { repositoryName } from '@/prismicio';

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full max-w-[100vw] min-h-[100svh] items-center !select-text !cursor-auto ">
      <div className=" w-full min-h-screen flex flex-col gap-20 items-center">
        {children}
        <PrismicPreview repositoryName={repositoryName} />
      </div>
    </div>
  );
}
