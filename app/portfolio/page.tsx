'use client';
import LoadingComponent from '@/components/Loading';
import { RootState } from '@/store';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';

const PortfolioItemsTable = dynamic(
  () => import('./components/PortfolioItemsTable'),
  {
    ssr: false,
    loading: () => (
      <div className="absolute top-0 left-0 w-[100dvw] h-[100dvh] overflow-hidden z-50 bg-black">
        <LoadingComponent />
      </div>
    ),
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

export default Portfolio;
