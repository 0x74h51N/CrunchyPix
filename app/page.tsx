import Section from "@/components/Section";
import { SectionData } from "./common.types";
import AboutMeSect from "@/components/Sections/AboutMeSect";
import LandingSect from "@/components/Sections/LandingSect";
import PortfolioSect from "@/components/Sections/PortfolioSect";
import LogoSect from "@/components/Sections/LogoSect";

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
      smoothScroll: true,
      className: "bg-cool-gray-900",
    },
    {
      name: "Portfolio",
      children: <PortfolioSect />,
      className: "p-0 px-0 w-full",
    },
    {
      name: "Logo",
      children: <LogoSect />,
      className: "h-auto min-h-0 bg-cool-gray-900 py-10",
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
