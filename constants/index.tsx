"use client";
import {
  ColorPacks,
  RobustSection,
  SectionData,
  SocialIconsType,
  slide,
} from "@/app/common.types";
import ContactSlide from "@/components/Slider/Childeren/ContactSlide";
import {
  FaCode,
  FaDesktop,
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaMobileAlt,
  FaPaintBrush,
  FaTelegram,
} from "react-icons/fa";
import { codeString } from "./codeString";
import TypingText from "@/components/typeText";
import AboutMeSect from "@/components/Sections/AboutMeSect";
import LandingSect from "@/components/Sections/LandingSect";
import PortfolioSect from "@/components/Sections/PortfolioSect";

export const Links = [
  { href: "/", key: "Home", text: "links.Home" },
  { href: "/portfolio", key: "Portfolio", text: "links.Portfolio" },
  { href: "/services", key: "Services", text: "links.Services" },
  { href: "/about", key: "About", text: "links.About" },
  { href: "/contact", key: "Contact", text: "links.Contact" },
];

export const sectionsData: SectionData[] = [
  {
    name: "Landing Section",
    children: <LandingSect />,
  },
  {
    name: "About Me",
    children: <AboutMeSect />,
    auto: true,
  },
  {
    name: "Portfolio",
    children: <PortfolioSect />,
  },
  { name: "Contact", className: "h-auto" },
];

export const socialIcons: SocialIconsType[] = [
  {
    title: "Instagram",
    url: "https://www.instagram.com/thetahsin_/",
    icon: <FaInstagram />,
  },
  {
    title: "Telegram",
    url: "https://t.me/Ox74h51N",
    icon: <FaTelegram />,
  },
  {
    title: "Mail",
    url: "mailto:mr.tahsin@windowslive.com",
    icon: <FaEnvelope />,
  },
  {
    title: "Github",
    url: "https://github.com/0x74h51N",
    icon: <FaGithub />,
  },
];

export const slides: slide[] = [
  {
    imageUrl: "/slider-0.jpg",
    title: "slides.0.title",
    description: "slides.0.description",
  },
  {
    imageUrl: "/slide-1_.jpg",
    title: "slides.1.title",
    description: "slides.1.description",
  },
  {
    title: "slides.2.title",
    description: "slides.2.description",
    children: <ContactSlide active={false} />,
  },
  {
    children: <TypingText text={codeString} />,
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

export const colorPacks: ColorPacks = {
  purpy: ["#6a7fff", "#ff8c8c", "#88c34a", "#f4d35e"],
  rainbow: [
    "#FF0000",
    "#FF7F00",
    "#FFFF00",
    "#00FF00",
    "#0000FF",
    "#4B0082",
    "#9400D3",
  ],
  earthTones: [
    "#8B4513",
    "#CD853F",
    "#D2B48C",
    "#C0C000",
    "#808000",
    "#556B2F",
    "#6B8E23",
  ],
  pastelColors: [
    "#FFD1DC",
    "#FFA07A",
    "#FFB6C1",
    "#87CEEB",
    "#98FB98",
    "#DDA0DD",
    "#FFE4E1",
  ],
  vibrantColors: [
    "#FF6347",
    "#FFD700",
    "#00FA9A",
    "#9370DB",
    "#20B2AA",
    "#FF4500",
    "#FF69B4",
  ],
  autumnColors: [
    "#8B4513",
    "#CD853F",
    "#FFD700",
    "#FF6347",
    "#D2691E",
    "#A0522D",
    "#FF8C00",
  ],
  oceanColors: [
    "#1E90FF",
    "#00BFFF",
    "#87CEEB",
    "#00CED1",
    "#4682B4",
    "#5F9EA0",
    "#B0C4DE",
  ],
  themeColors: ["#050816", "#3f4183"],
};
