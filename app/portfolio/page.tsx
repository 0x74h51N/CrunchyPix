import LoadingComponent from '@/components/Loading';
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
  return <PortfolioItemsTable />;
};

export default Portfolio;
