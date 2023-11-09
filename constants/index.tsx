export const Links = [
  { href: "/", key: "Home", text: "links.Home" },
  { href: "/", key: "Portfolio", text: "links.Portfolio" },
  { href: "/", key: "Services", text: "links.Services" },
  { href: "/", key: "About", text: "links.About" },
  { href: "/", key: "Contact", text: "links.Contact" },
];

export const slides: Array<{
  imageUrl: string;
  title: string;
  description: string;
  left: boolean;
  children?: React.ReactElement | null;
}> = [
  {
    imageUrl: "/slider-0.jpg",
    title: "slides.0.title",
    description: "slides.0.description",
    left: true,
    children: null,
  },
  {
    imageUrl: "/slide-1_.jpg",
    title: "slides.1.title",
    description: "slides.1.description",
    left: false,
    children: null,
  },
];
