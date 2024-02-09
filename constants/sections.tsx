import { SectionData } from "@/app/common.types";
import CodeSect from "@/components/Sections/CodeSect/CodeSect";
import DesignSect from "@/components/Sections/DesignSect/DesignSect";
import IntroductionSect from "@/components/Sections/IntroductionSect/IntroductionSect";
import LandingSect from "@/components/Sections/LandingSect/LandingSect";
import LogoSect from "@/components/Sections/LogoSection/LogoSect";
import PortfolioSect from "@/components/Sections/PortfolioSect/PortfolioSect";
import ServicesSect from "@/components/Sections/ServicesSect/ServicesSect";

export const sectionsData: SectionData[] = [
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
    className: "h-auto min-h-[100svh] pt-14  repatingLines",
  },
  {
    name: "What I do?",
    className: "h-auto min-h-[100svh] w-full z-100  repatingLines",
    smoothScroll: true,
    children: <ServicesSect />,
  },
  {
    name: "Responsive Design",
    children: <DesignSect />,
    smoothScroll: true,
    className: "h-auto min-h-[100svh]  lg:py-20 py-0  repatingLines",
  },
  {
    name: "Code Sect",
    children: <CodeSect />,
    smoothScroll: true,
    className: "h-auto min-h-[100svh]  lg:py-20 py-0  repatingLines",
  },
  {
    name: "Portfolio",
    children: <PortfolioSect />,
    smoothScroll: true,
    className: "h-auto min-h-[100svh] py-24 w-full repatingLines",
  },
  {
    name: "Logo",
    smoothScroll: true,
    children: <LogoSect />,
    className: "h-auto min-h-auto",
  },
];
