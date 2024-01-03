import Section from "@/components/Section";
import { SectionData } from "./common.types";
import LandingSect from "@/components/Sections/LandingSect/LandingSect";
import PortfolioSect from "@/components/Sections/PortfolioSect/PortfolioSect";
import LogoSect from "@/components/Sections/LogoSection/LogoSect";
import ResponsiveSect from "@/components/Sections/DesignSect/DesignSect";
import CodeSect from "@/components/Sections/CodeSect/CodeSect";
import IntroductionSect from "@/components/Sections/IntroductionSect/IntroductionSect";
import ServicesSect from "@/components/Sections/ServicesSect/ServicesSect";

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
      name: "Introduction",
      children: <IntroductionSect />,
      smoothScroll: true,
      className: "h-auto min-h-[100svh] pt-14 ",
    },
    {
      name: "What I do?",
      className: "h-auto min-h-[100svh] w-full z-100",
      smoothScroll: true,
      children: <ServicesSect />,
    },
    {
      name: "Responsive Design",
      children: <ResponsiveSect />,
      smoothScroll: true,
      className: "h-auto min-h-[100svh]  lg:py-20 py-0",
    },
    {
      name: "Code Sect",
      children: <CodeSect />,
      smoothScroll: true,
      className: "h-auto min-h-[100svh]  lg:py-20 py-0",
    },
    {
      name: "Portfolio",
      children: <PortfolioSect />,
      smoothScroll: true,
      className: "h-auto min-h-[100svh] py-24 w-full",
    },
    {
      name: "Logo",
      smoothScroll: true,
      children: <LogoSect />,
      className: "h-auto min-h-auto  py-5",
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
