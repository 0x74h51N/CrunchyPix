import { portfolioPageItems } from "@/constants/portfolioItems";
import Project from "./components/WebProject";

const PortfolioPage = ({ params }: { params: { id: string } }) => {
  const selectedItem = portfolioPageItems.find(
    (item) => item._id.toLowerCase().replace(/\s+/g, "") == params.id
  );

  if (!selectedItem) {
    return <p>Couldn't find a portfolio item.</p>;
  }

  return <Project Item={selectedItem} />;
};

export default PortfolioPage;
