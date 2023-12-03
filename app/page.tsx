import Section from "@/components/Section";
import { SectionData } from "./common.types";
import AboutMeSect from "@/components/Sections/AboutMeSect/AboutMeSect";
import LandingSect from "@/components/Sections/LandingSect/LandingSect";
import PortfolioSect from "@/components/Sections/PortfolioSect/PortfolioSect";
import LogoSect from "@/components/Sections/LogoSection/LogoSect";
import ResponsiveSect from "@/components/Sections/ResponsiveSect/ResponsiveSect";
import CodeSect from "@/components/Sections/CodeSect/CodeSect";

const Home = () => {
  const sectionsData: SectionData[] = [
    {
      name: "Landing Section",
      children: <LandingSect />,
      parallax: true,
      background: "/galata_0.png",
      topImage: "/galata_1.png",
      className: "h-auto min-h-[100svh] w-[100svw]",
    },
    {
      name: "About Me",
      children: <AboutMeSect />,
      smoothScroll: true,
      className: "h-auto min-h-[100svh] bg-cool-gray-900 py-8",
    },
    {
      name: "Responsive Design",
      children: <ResponsiveSect />,
      smoothScroll: true,
      className: "h-auto min-h-[100svh] py-20",
    },
    {
      name: "Code Sect",
      children: <CodeSect />,
      smoothScroll: true,
      className: "h-auto min-h-[100svh] bg-cool-gray-900 py-20",
    },
    {
      name: "Portfolio",
      children: <PortfolioSect />,
      smoothScroll: true,
      className: "h-auto py-16 w-full",
    },
    {
      name: "Logo",
      children: <LogoSect />,
      className: "h-auto min-h-auto bg-cool-gray-900 py-5",
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
