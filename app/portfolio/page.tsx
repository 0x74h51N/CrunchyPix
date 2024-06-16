import FsLoading from '@/components/Loading/FsLoading';
import dynamic from 'next/dynamic';
import { memo } from 'react';

import { generatePageMetadata } from '@/lib/metadata';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata('portfolio');
}

const PortfolioItemsTable = dynamic(
  () => import('./components/PortfolioItemsTable'),
  {
    ssr: false,
    loading: () => <FsLoading />,
  },
);
const Portfolio = () => {
  return (
    <div className="flex justify-center items-start w-full min-h-[100svh]">
      <PortfolioItemsTable />
    </div>
  );
};

export default memo(Portfolio);
