import OtherProjects from './[id]/components/OtherProjects/OtherProjects';

const PortfolioLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <OtherProjects />
    </>
  );
};

export default PortfolioLayout;
