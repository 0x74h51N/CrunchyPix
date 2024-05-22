import { portfolioPageItems } from "@/constants/portfolioItems";
import Project from "./components/Project";
import OtherProjects from "../components/OtherProjects";
import { generateSubPageMetadata} from '@/lib/metadataSub';

export async function generateMetadata({ params }: { params: { id: string } }) {
  return await generateSubPageMetadata({ params, page: 'portfolio' });
}
const PortfolioPage = ({ params }: { params: { id: string } }) => {
  const selectedItem = portfolioPageItems.find(
    (item) => item._id.toLowerCase().replace(/\s+/g, "") === params.id
  );

  if (!selectedItem) {
    return null;
  }
  return (
  <>
    <Project Item={selectedItem} />
    <OtherProjects />
  </>
  );
};

export default PortfolioPage;
