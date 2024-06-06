'use client';
import Loading from '@/components/Loading';
import LoadingComponent from '@/components/Loading';
import useSupabaseFetch from '@/hooks/useSupabaseFetch';
import { PortfolioItemProps, PortfolioItemSchema } from '@/schemas';
import dynamic from 'next/dynamic';

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
  const { data, loading, error } = useSupabaseFetch<PortfolioItemProps>(
    'portfolio_items',
    '*',
    PortfolioItemSchema,
  );

  if (loading) return <LoadingComponent />;
  if (error) console.log(error);

  if (loading)
    return (
      <div className="flexCenter w-full p-20 min-h-[100svh] overflow-hidden">
        <Loading />
      </div>
    );
  if (error) return <div className="text-red-500">Error: {error}</div>;
  return data && <PortfolioItemsTable portfolioPageItems={data} />;
};

export default Portfolio;
