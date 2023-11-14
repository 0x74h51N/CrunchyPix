import Section from "@/components/Section";
import AboutMeSect from "@/components/Sections/AboutMeSect";
import PortfolioSect from "@/components/Sections/PortfolioSect";
import LandingSect from "@/components/Sections/LandingSect";

interface SectionData {
  className?: string;
  name: string;
  auto?: boolean;
  children?: React.ReactNode;
}
const sectionsData: SectionData[] = [
  {
    name: "Landing Section",
    children: <LandingSect />,
  },
  {
    name: "About Me",
    children: <AboutMeSect />,
    auto: true,
  },
  {
    name: "Portfolio",
    children: <PortfolioSect />,
  },
];

const Home = () => {
  return (
    <>
      <div>
        <Section sectionsData={sectionsData}></Section>
      </div>
    </>
  );
};

export default Home;
