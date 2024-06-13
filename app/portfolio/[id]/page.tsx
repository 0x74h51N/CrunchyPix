import { generateSubPageMetadata } from '@/lib/metadataSub';
import dynamic from 'next/dynamic';
import OtherProjects from './components/OtherProjects/OtherProjects';
import FsLoading from '@/components/Loading/FsLoading';

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
