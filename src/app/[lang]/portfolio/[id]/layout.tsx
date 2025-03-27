import { use } from 'react';
import { OtherProjects } from './components/ClintComponents';

const PortfolioLayout = (props: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) => {
  const params = use(props.params);
  const id = params.id;
  return (
    <div className="!cursor-none">
      {props.children}
      <OtherProjects currentId={id} />
    </div>
  );
};

export default PortfolioLayout;
