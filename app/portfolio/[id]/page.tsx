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
  try {
    if (typeof params.id !== 'string') {
      notFound();
    }

    const portfolioItems = await fetchSupabaseData<PortfolioItemProps>(
      'portfolio_schema',
      'portfolio_items',
      '*',
      PortfolioItemSchema,
    );

    if (!portfolioItems) {
      notFound();
    }

    const portfolioItem = portfolioItems.find((item) => item._id === params.id);

    if (!portfolioItem) {
      notFound();
    }

    return (
      <>
        <Project id={params.id} />
        <OtherProjects />
      </>
    );
  } catch (error) {
    console.error('Error fetching portfolio item:', error);
    notFound();
  }
};

export default PortfolioPage;
