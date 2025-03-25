import { OtherProjects } from './components/ClintComponents';

const PortfolioLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="!cursor-none">
      {children}
      <OtherProjects />
    </div>
  );
};

export default PortfolioLayout;
