import OtherProjects from './components/OtherProjects/OtherProjects';
import { PortfolioItemProps, PortfolioItemSchema } from '@/schemas';
import { fetchSupabaseData } from '@/lib/utils/fetchSupabaseData';
import { notFound } from 'next/navigation';
import Project from './components/Project';

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
