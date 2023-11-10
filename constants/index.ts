import { slide } from "@/app/common.types";

export const Links = [
  { href: "/", key: "Home", text: "links.Home" },
  { href: "/", key: "Portfolio", text: "links.Portfolio" },
  { href: "/", key: "Services", text: "links.Services" },
  { href: "/", key: "About", text: "links.About" },
  { href: "/", key: "Contact", text: "links.Contact" },
];

export const slides: slide[] = [
  {
    imageUrl: "/slider-0.jpg",
    title: "slides.0.title",
    description: "slides.0.description",
    left: true,
  },
  {
    imageUrl: "/slide-1_.jpg",
    title: "slides.1.title",
    description: "slides.1.description",
    left: true,
  },
];

export const robustSections = [
  {
    title: "Responsive Design",
    description: "Optimized for various devices",
    icon: "FaDesktop",
  },
  {
    title: "Mobile Optimization",
    description: "Fast and smooth on mobile devices",
    icon: "FaMobile",
  },
  {
    title: "Clean Code",
    description: "Well-organized and maintainable codebase",
    icon: "FaCode",
  },
  {
    title: "Creative Design",
    description: "Visually appealing and user-friendly",
    icon: "FaPaintBrush",
  },
];
