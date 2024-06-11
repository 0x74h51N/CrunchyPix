'use client';

import FsLoading from '@/components/Loading/FsLoading';
import { RootState } from '@/store';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import { useSelector } from 'react-redux';

const PortfolioItemsTable = dynamic(
  () => import('./components/PortfolioItemsTable'),
  {
    ssr: false,
    loading: () => <FsLoading />,
  },
);
const Portfolio = () => {
  const portfolioItems = useSelector(
    (state: RootState) => state.portfolio.items,
  );
  return (
    portfolioItems && (
      <PortfolioItemsTable portfolioPageItems={portfolioItems} />
    )
  );
};

export default memo(Portfolio);
