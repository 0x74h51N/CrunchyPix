import { portfolioPageItems } from '@/constants/portfolioItems';
import { generatePageMetadata } from '@/lib/metadata';
import supabase from '@/lib/supabaseClient';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata('portfolio');
}

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}

export async function generateStaticParams() {
  const { data: portfolioItems, error } = await supabase
    .from('portfolio_items')
    .select('_id');

  if (error) {
    console.error('Error fetching portfolio items:', error);
    return [];
  }

  const paths = portfolioItems.map((item) => ({
    params: { id: item._id.toLowerCase().replace(/\s+/g, '') },
  }));

  return paths;
}
