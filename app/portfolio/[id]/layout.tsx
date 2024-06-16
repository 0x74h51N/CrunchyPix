import { generateSubPageMetadata } from '@/lib/metadataSub';
import { fetchSupabaseData } from '@/lib/utils/fetchSupabaseData';
import { PortfolioItemProps, PortfolioItemSchema } from '@/schemas';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  try {
    const portfolioItems = await fetchSupabaseData<PortfolioItemProps>(
      'portfolio_schema',
      'portfolio_items',
      '*',
      PortfolioItemSchema,
    );

    if (!portfolioItems) {
      throw new Error('Failed to fetch portfolio items');
    }

    return portfolioItems.map((item) => ({
      id: item._id,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default function PortfolioPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
export async function generateMetadata({ params }: { params: { id: string } }) {
  if (typeof params.id !== 'string') {
    notFound();
  }
  return await generateSubPageMetadata({ params, page: 'portfolio' });
}
