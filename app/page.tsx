import Section from "@/components/Section";
import { SectionData } from "./common.types";
import AboutMeSect from "@/components/Sections/AboutMeSect";
import LandingSect from "@/components/Sections/LandingSect";
import PortfolioSect from "@/components/Sections/PortfolioSect";
import LogoSect from "@/components/Sections/LogoSect";
import ResponsiveSect from "@/components/Sections/ResponsiveSect";
import CodeSect from "@/components/Sections/CodeSect";

const Home = () => {
  const sectionsData: SectionData[] = [
    {
      name: "Landing Section",
      children: <LandingSect />,
      parallax: true,
      background: "/galata_0.png",
      topImage: "/galata_1.png",
      className: "h-auto min-h-[100svh]",
    },
    {
      name: "About Me",
      children: <AboutMeSect />,
      smoothScroll: true,
      className: "h-auto min-h-[100svh] bg-cool-gray-900 py-20",
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
