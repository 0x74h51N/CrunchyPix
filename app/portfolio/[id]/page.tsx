import { PortfolioItemProps, PortfolioItemSchema } from '@/schemas';
import { fetchSupabaseData } from '@/lib/utils/fetchSupabaseData';
import { notFound } from 'next/navigation';
import Project from './components/Project';
import { generateSubPageMetadata } from '@/lib/metadataSub';

export async function generateStaticParams() {
  try {
    const portfolioItems = await fetchSupabaseData<PortfolioItemProps>(
      'portfolio_schema',
      'portfolio_items',
      '*',
      PortfolioItemSchema,
    );

    if (!portfolioItems) {
      throw new Error(
        'Failed to fetch portfolio items for generate static params',
      );
    }

    return portfolioItems.map((item) => ({
      id: item._id,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

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

    const portfolioItem = portfolioItems
      ? portfolioItems.find((item) => item._id === params.id)
      : notFound();

    if (!portfolioItem) {
      notFound();
    }

    return <Project id={params.id} />;
  } catch (error) {
    console.error('Error fetching portfolio item on page:', error);
    notFound();
  }
};

export default PortfolioPage;
