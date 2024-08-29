import FsLoading from '@/components/Loading/FsLoading';

import dynamic from 'next/dynamic';
const OtherProjects = dynamic(
  () => import('./components/OtherProjects/OtherProjects'),
  {
    ssr: false,
    loading: () => <FsLoading />,
  },
);
const PortfolioLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <OtherProjects />
    </>
  );
};

export default PortfolioLayout;
