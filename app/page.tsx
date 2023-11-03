"use client";
import Footer from "@/components/Footer";
import Scroll from "@/components/Scroll";
import AboutMe from "@/components/Sections/AboutMe";
import Portfolio from "@/components/Sections/Portfolio";

interface SectionData {
  className?: string;
  name: string;
  auto?: boolean;
  children?: React.ReactNode;
}
const sectionsData: SectionData[] = [
  {
    name: "About Me",
    children: <AboutMe />,
  },
  {
    name: "Forking",
  },
  {
    name: "Portfolio",
    children: <Portfolio />,
  },
  {
    name: "Contact Me",
    auto: true,
    children: <Footer />,
  },
];

const Home = () => {
  return (
    <>
      <Scroll sectionsData={sectionsData}></Scroll>
    </>
  );
};

export default Home;
