import { PortfolioItemProps } from "@/app/common.types";

export const portfolioPageItems: PortfolioItemProps[] = [
  {
    _id: "crunchypix",
    image: "/portfolioItems/crunchypix.png",
    imageAlt: "CrunchyPix",
    title: "items.0.title",
    projectType: "items.0.projectType",
    ProjectInfo: {
      category: "items.0.projectType",
      client: "items.0.client",
      location: "items.0.location",
      date: "March 1,2024",
      tech: ["TypeScript", "Next.js", "Tailwind", "React", "Redux"],
    },
  },
  {
    _id: "KYK_Electric",
    image: "/PortfolioSlides/kykelectric.jpg",
    imageAlt: "CrunchyPix",
    title: "items.3.title",
    projectType: "items.3.projectType",
    ProjectInfo: {
      category: "items.3.projectType",
      client: "items.3.client",
      location: "items.3.location",
      date: "July 15,2019",
      tech: ["HTML", "CSS", "WordPress"],
    },
  },
  {
    _id: "CC_Order",
    image: "/portfolioItems/ccorder.png",
    imageAlt: "CrunchyPix",
    title: "items.1.title",
    projectType: "items.1.projectType",
    ProjectInfo: {
      category: "items.1.projectType",
      client: "items.1.client",
      location: "items.1.location",
      date: "September 28 ,2023",
      tech: ["TypeScript", "Next.js", "CSS", "Redux"],
    },
  },
  {
    _id: "Minting_UI",
    image: "/portfolioItems/mintingui.png",
    imageAlt: "MintingUI",
    title: "items.2.title",
    projectType: "items.2.projectType",
    ProjectInfo: {
      category: "items.2.projectType",
      client: "items.2.client",
      location: "items.2.location",
      date: "Agust 24 ,2023",
      tech: ["TypeScript", "Next.js", "Tailwind", "Hardhat", "Wagmi"],
    },
  },
];
