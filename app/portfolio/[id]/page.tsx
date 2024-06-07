import { generateSubPageMetadata } from '@/lib/metadataSub';
import dynamic from 'next/dynamic';
import LoadingComponent from '@/components/Loading';
import OtherProjects from './components/OtherProjects/OtherProjects';
import { PortfolioItemProps, PortfolioItemSchema } from '@/schemas';
import { fetchSupabaseData } from '@/lib/fetchSupabaseData';

const Project = dynamic(() => import('./components/Project'), {
  ssr: false,
  loading: () => (
    <div className="absolute top-0 left-0 w-[100dvw] h-[100dvh] overflow-hidden z-50 bg-black">
      <LoadingComponent />
    </div>
  ),
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
    'portfolio_items',
    '*',
    PortfolioItemSchema,
  );

  const paths = portfolioItems.map((item) => ({
    params: { id: item._id.toLowerCase().replace(/\s+/g, '') },
  }));

  return paths;
}
