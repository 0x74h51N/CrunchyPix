import { slide } from "@/app/common.types";
import ContactSlide from "@/components/Slider/Childeren/ContactSlide";
import { FaCode, FaDesktop, FaMobileAlt, FaPaintBrush } from "react-icons/fa";

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
  {
    imageUrl: "/",
    title: "slides.2.title",
    description: "slides.2.description",
    left: true,
    children: <ContactSlide active={false} />,
  },
];

export const robustSections = [
  {
    title: "Responsive Design",
    description: "Optimized for various devices",
    icon: <FaDesktop size={50} color={"#e91e63"} />,
  },
  {
    title: "Mobile Optimization",
    description: "Fast and smooth on mobile devices",
    icon: <FaMobileAlt size={50} color={"#e91e63"} />,
  },
  {
    title: "Clean Code",
    description: "Well-organized and maintainable codebase",
    icon: <FaCode size={50} color={"#e91e63"} />,
  },
  {
    title: "Creative Design",
    description: "Visually appealing and user-friendly",
    icon: <FaPaintBrush size={50} color={"#e91e63"} />,
  },
];
