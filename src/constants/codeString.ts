export const codeString = `import FsLoading from '@/components/Loading/FsLoading';
import dynamic from 'next/dynamic';

import { generatePageMetadata } from '@/lib/metadata';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata('portfolio');
}

const PortfolioItemsTable = dynamic(
  () => import('./components/PortfolioItemsTable'),
  { ssr: true, loading: () => <FsLoading /> },
);
const Portfolio = () => {
  return (
    <div className="flex justify-center items-start w-full min-h-[100svh] !select-none !cursor-none">
      <PortfolioItemsTable />
    </div>
  );
};

export default Portfolio;
`;
