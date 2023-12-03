import { Icon, slide } from "@/app/common.types";

const commonIcons: Record<string, Icon> = {
  github: {
    type: "github",
    size: 24,
    color: "#FFFFFF",
  },
  web: {
    type: "web",
    size: 24,
    color: "#FFFFFF",
  },
};

export const projectSlides: slide[] = [
  {
    title: "projectSlides.0.title",
    imageUrl: "/PortfolioSlides/crunchypix.jpg",
    description: "projectSlides.0.description",
    labels: ["TypeScript", "Next.js", "Tailwind", "React", "Redux"],
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
    title: "projectSlides.1.title",
    imageUrl: "/PortfolioSlides/ccorder.jpg",
    description: "projectSlides.1.description",
    labels: ["TypeScript", "Next.js", "CSS", "Redux"],
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
    title: "projectSlides.2.title",
    imageUrl: "/PortfolioSlides/mintingui.jpg",
    description: "projectSlides.2.description",
    labels: ["TypeScript", "Next.js", "Tailwind", "Hardhat", "Wagmi"],
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
  {
    title: "projectSlides.3.title",
    imageUrl: "/PortfolioSlides/kykelectric.jpg",
    description: "projectSlides.3.description",
    labels: ["HTML", "CSS", "WordPress"],
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
];
