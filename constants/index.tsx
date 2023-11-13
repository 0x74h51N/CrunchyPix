import { RobustSection, slide } from "@/app/common.types";
import ContactSlide from "@/components/Slider/Childeren/ContactSlide";
import { FaCode, FaDesktop, FaMobileAlt, FaPaintBrush } from "react-icons/fa";

export const Links = [
  { href: "/", key: "Home", text: "links.Home" },
  { href: "/portfolio", key: "Portfolio", text: "links.Portfolio" },
  { href: "/services", key: "Services", text: "links.Services" },
  { href: "/about", key: "About", text: "links.About" },
  { href: "/contact", key: "Contact", text: "links.Contact" },
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

export const robustSections: RobustSection[] = [
  {
    title: "robust.0.title",
    description: "robust.0.description",
    icon: <FaDesktop size={50} color={"#4f52a2"} />,
  },
  {
    title: "robust.1.title",
    description: "robust.1.description",
    icon: <FaMobileAlt size={50} color={"#e91e63"} />,
  },
  {
    title: "robust.2.title",
    description: "robust.2.description",
    icon: <FaCode size={50} color={"#2196f3"} />,
  },
  {
    title: "robust.3.title",
    description: "robust.3.description",
    icon: <FaPaintBrush size={50} color={"#8bc34a"} />,
  },
];
