import { PrismicPreview } from '@prismicio/next';
import { repositoryName } from '@/prismicio';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="mt-20 pt-40 lg:w-[1300px] max-w-full min-h-screen p-12 w-full flex flex-col gap-20 items-center">
        {children}
        <PrismicPreview repositoryName={repositoryName} />
      </div>
    </div>
  );
}
