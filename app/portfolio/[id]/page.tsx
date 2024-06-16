import { generateSubPageMetadata } from '@/lib/metadataSub';
import dynamic from 'next/dynamic';
import OtherProjects from './components/OtherProjects/OtherProjects';
import FsLoading from '@/components/Loading/FsLoading';
import { PortfolioItemProps, PortfolioItemSchema } from '@/schemas';
import { fetchSupabaseData } from '@/lib/utils/fetchSupabaseData';
import { notFound } from 'next/navigation';

const Project = dynamic(() => import('./components/Project'), {
  ssr: false,
  loading: () => <FsLoading />,
});

export async function generateMetadata({ params }: { params: { id: string } }) {
  if (typeof params.id !== 'string') {
    notFound();
  }
  return await generateSubPageMetadata({ params, page: 'portfolio' });
}
const PortfolioPage = async ({ params }: { params: { id: string } }) => {
  if (typeof params.id !== 'string') {
    notFound();
  }

  const portfolioItem = await fetchSupabaseData<PortfolioItemProps>(
    'portfolio_schema',
    'portfolio_items',
    '*',
    PortfolioItemSchema,
  );

  if (
    !portfolioItem ||
    portfolioItem.length === 0 ||
    portfolioItem.map((item) => item._id !== params.id)
  ) {
    notFound();
  }
  return (
    <>
      <Project id={params.id} />
      <OtherProjects />
    </>
  );
};

export default PortfolioPage;

export async function generateStaticParams() {
  const portfolioItems = await fetchSupabaseData<PortfolioItemProps>(
    'portfolio_schema',
    'portfolio_items',
    '*',
    PortfolioItemSchema,
  );

  const paths = portfolioItems.map((item) => ({
    params: { id: item._id },
  }));
  return paths;
}
