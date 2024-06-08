// import { generateSubPageMetadata } from '@/lib/metadataSub';
import dynamic from 'next/dynamic';
import LoadingComponent from '@/components/Loading';
import OtherProjects from './components/OtherProjects/OtherProjects';

const Project = dynamic(() => import('./components/Project'), {
  ssr: false,
  loading: () => (
    <div className="absolute top-0 left-0 w-[100dvw] h-[100dvh] overflow-hidden z-50 bg-black">
      <LoadingComponent />
    </div>
  ),
});

// export async function generateMetadata({ params }: { params: { id: string } }) {
//   return await generateSubPageMetadata({ params, page: 'portfolio' });
// }
const PortfolioPage = async ({ params }: { params: { id: string } }) => {
  return (
    <>
      <Project id={params.id} />
      <OtherProjects />
    </>
  );
};

export default PortfolioPage;
