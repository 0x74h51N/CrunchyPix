import { generateSubPageMetadata } from '@/lib/metadataSub';
import dynamic from 'next/dynamic';
import OtherProjects from './components/OtherProjects/OtherProjects';
import FsLoading from '@/components/Loading/FsLoading';
import { PortfolioItemProps, PortfolioItemSchema } from '@/schemas';
import { fetchSupabaseData } from '@/lib/utils/fetchSupabaseData';

const Project = dynamic(() => import('./components/Project'), {
  ssr: false,
  loading: () => <FsLoading />,
});

export async function generateMetadata({ params }: { params: { id: string } }) {
  return await generateSubPageMetadata({ params, page: 'portfolio' });
}
const PortfolioPage = async ({ params }: { params: { id: string } }) => {
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
