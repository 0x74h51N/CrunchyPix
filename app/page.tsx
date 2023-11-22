import Section from "@/components/Section";
import { SectionData } from "./common.types";
import AboutMeSect from "@/components/Sections/AboutMeSect";
import LandingSect from "@/components/Sections/LandingSect";
import PortfolioSect from "@/components/Sections/PortfolioSect";

const Home = () => {
  const sectionsData: SectionData[] = [
    {
      name: "Landing Section",
      children: <LandingSect />,
      parallax: true,
      background: "/galata_0.png",
      topImage: "/galata_1.png",
    },
    {
      name: "About Me",
      children: <AboutMeSect />,
      parallax: false,
    },
    {
      name: "Portfolio",
      children: <PortfolioSect />,
      parallax: false,
    },
  ];

  return (
    <>
      <div>
        <Section sectionsData={sectionsData}></Section>
      </div>
    </>
  );
};

export default Home;
