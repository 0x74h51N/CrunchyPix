import { PortfolioItemProps } from "@/app/common.types";

import { Icon, slide } from "@/app/common.types";

const commonIcons: Record<string, Icon> = {
  github: {
    type: "github",
  },
  web: {
    type: "web",
  },
};

export const portfolioPageItems: PortfolioItemProps[] = [
  {
    _id: "crunchypix",
    slideImage: "/PortfolioSlides/crunchypix.jpg",
    image: "/portfolioItems/crunchypix.png",
    imageAlt: "CrunchyPix",
    imageTop: "/portfolioItems/crunchypixTop.png",
    imageBoxes: [
      "/portfolioItems/crunchypixTop.png",
      "/portfolioItems/crunchypixRespo.png",
      "/portfolioItems/crunchypixTop.png",
    ],
    title: "items.0.title",
    title2: "items.0.title2",
    techTitle: "items.0.techTitle",
    techDescription: "items.0.techDescription",
    description: "items.0.description",
    description2: "items.0.description2",
    ticks: [
      "items.0.ticks.0",
      "items.0.ticks.1",
      "items.0.ticks.2",
      "items.0.ticks.3",
      "items.0.ticks.4",
      "items.0.ticks.5",
      "items.0.ticks.6",
      "items.0.ticks.7",
      "items.0.ticks.8",
      "items.0.ticks.9",
    ],
    slideDescription: "items.0.slideDescription",
    projectType: "items.0.projectType",
    ProjectInfo: {
      category: "items.0.projectType",
      client: "items.0.client",
      location: "items.0.location",
      date: "March 1,2024",
      tech: ["TypeScript", "Next.js", "Tailwind", "React", "Redux"],
    },
    icons: [
      {
        ...commonIcons.github,
        link: "https://github.com/0x74h51N/My-Webpage",
      },
      {
        ...commonIcons.web,
        link: "https://crunchypix.vercel.app/",
      },
    ],
  },
  {
    _id: "KYK_Electric",
    slideImage: "/PortfolioSlides/kykelectric.jpg",
    image: "/PortfolioSlides/kykelectric.jpg",
    imageAlt: "Kyk Electric",
    title: "items.3.title",
    slideDescription: "items.3.slideDescription",
    projectType: "items.3.projectType",
    ProjectInfo: {
      category: "items.3.projectType",
      client: "items.3.client",
      location: "items.3.location",
      date: "July 15,2019",
      tech: ["HTML", "CSS", "JavaScript", "WordPress"],
    },
    icons: [
      {
        ...commonIcons.github,
        link: "https://github.com/0x74h51N/",
      },
      {
        ...commonIcons.web,
        link: "https://kykelektrik.com/",
      },
    ],
  },
  {
    _id: "CC_Order",
    slideImage: "/PortfolioSlides/ccorder.jpg",
    image: "/portfolioItems/ccorder.png",
    imageAlt: "CC Order",
    imageTop: "/portfolioItems/ccorderTop.png",
    imageBoxes: [
      "/portfolioItems/ccorderTop.png",
      "/portfolioItems/ccorderRespo.png",
      "/portfolioItems/ccorderTop.png",
    ],
    title: "items.1.title",
    title2: "items.1.title2",
    techTitle: "items.1.techTitle",
    techDescription: "items.1.techDescription",
    description: "items.1.description",
    description2: "items.1.description2",
    ticks: [
      "items.1.ticks.0",
      "items.1.ticks.1",
      "items.1.ticks.2",
      "items.1.ticks.3",
      "items.1.ticks.4",
      "items.1.ticks.5",
      "items.1.ticks.6",
      "items.1.ticks.7",
    ],
    slideDescription: "items.1.slideDescription",
    projectType: "items.1.projectType",
    ProjectInfo: {
      category: "items.1.projectType",
      client: "items.1.client",
      location: "items.1.location",
      date: "September 28 ,2023",
      tech: ["TypeScript", "Next.js", "CSS", "React", "Redux"],
    },
    icons: [
      {
        ...commonIcons.github,
        link: "https://github.com/0x74h51N/",
      },
      {
        ...commonIcons.web,
        link: "https://signup-project-rosy.vercel.app/",
      },
    ],
  },
  {
    _id: "Minting_UI",
    slideImage: "/PortfolioSlides/mintingui.jpg",
    image: "/portfolioItems/mintingui.png",
    imageAlt: "MintingUI",
    imageTop: "/portfolioItems/mintingUiTop.png",
    imageBoxes: [
      "/portfolioItems/mintingUiTop.png",
      "/portfolioItems/mintingUiRespo.png",
      "/portfolioItems/mintingUiTop.png",
    ],
    title: "items.2.title",
    title2: "items.2.title2",
    techTitle: "items.2.techTitle",
    techDescription: "items.2.techDescription",
    description: "items.2.description",
    description2: "items.2.description2",
    ticks: [
      "items.2.ticks.0",
      "items.2.ticks.1",
      "items.2.ticks.2",
      "items.2.ticks.3",
      "items.2.ticks.4",
      "items.2.ticks.5",
      "items.2.ticks.6",
      "items.2.ticks.7",
      "items.2.ticks.8",
      "items.2.ticks.9",
    ],
    slideDescription: "items.2.slideDescription",
    projectType: "items.2.projectType",
    ProjectInfo: {
      category: "items.2.projectType",
      client: "items.2.client",
      location: "items.2.location",
      date: "Agust 24 ,2023",
      tech: ["TypeScript", "Next.js", "Tailwind", "Hardhat", "React"],
    },
    icons: [
      {
        ...commonIcons.github,
        link: "https://github.com/0x74h51N/SEth2-minting-N",
      },
      {
        ...commonIcons.web,
        link: "https://minting-ui.vercel.app/",
      },
    ],
  },
];
