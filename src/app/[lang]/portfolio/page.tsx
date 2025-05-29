import FsLoading from '@/components/Loading/FsLoading';
import dynamic from 'next/dynamic';

import { generatePageMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import { Language } from '@prismicio/client';

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata('portfolio');
}

const PortfolioItemsTable = dynamic(
  () => import('./components/PortfolioItemsTable'),
  { ssr: true, loading: () => <FsLoading /> },
);
const Portfolio = async ({ params }: { params: Language }) => {
  const lang = await params;
  return (
    <div className="flex justify-center items-start w-full min-h-[100svh] !select-none !cursor-none">
      <PortfolioItemsTable lang={lang} />
    </div>
  );
};

export default Portfolio;
