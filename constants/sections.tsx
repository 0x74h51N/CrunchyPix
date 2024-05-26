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
    className: "h-auto min-h-[100svh] repatingLines",
  },
  {
    name: "What I do?",
    className: "h-auto min-h-[100svh] w-full z-100  repatingLines",
    children: <ServicesSect />,
  },
  {
    name: "Responsive Design",
    children: <DesignSect />,
    className: "h-auto min-h-[100svh] repatingLines",
  },
  {
    name: "Code Sect",
    children: <CodeSect />,
    className: "h-auto min-h-[100svh] repatingLines",
  },
  {
    name: "Portfolio",
    children: <PortfolioSect />,
    className: "h-auto min-h-[100svh] w-full repatingLines",
  },
  {
    name: "Logo",
    children: <LogoSect />,
    className: "h-auto min-h-auto",
  },
];
