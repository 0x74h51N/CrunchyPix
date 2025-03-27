import { generateSubPageMetadata } from '@/lib/metadataSub';
import { PortfolioItemProps, PortfolioItemSchema } from '@/lib/schemas';
import { fetchSupabaseData } from '@/lib/utils/fetchSupabaseData';
import { notFound } from 'next/navigation';
import Project from './components/Project';
type Params = Promise<{ id: string }>;

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

    return portfolioItems.map((item) => ({ id: item._id }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: Params }) {
  const { id } = await params;
  if (typeof id !== 'string') {
    notFound();
  }
  return await generateSubPageMetadata({ id, page: 'portfolio' });
}
export default async function Page(props: { params: Params }) {
  try {
    const params = await props.params;
    const id = params.id;
    if (!params || typeof id !== 'string') {
      notFound();
    }
    const portfolioItems = await fetchSupabaseData<PortfolioItemProps>(
      'portfolio_schema',
      'portfolio_items',
      '*',
      PortfolioItemSchema,
    );

    const portfolioItem = portfolioItems
      ? portfolioItems.find((item) => item._id === id)
      : notFound();

    if (!portfolioItem) {
      notFound();
    }

    return <Project id={id} />;
  } catch (error) {
    console.error('Error fetching portfolio item on page:', error);
    notFound();
  }
}
