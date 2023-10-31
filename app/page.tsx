"use client";
import Footer from "@/components/Footer";
import Scroll from "@/components/Scroll";
import AboutMe from "@/components/Sections/aboutMe";
import TypingText from "@/components/typeText";

interface SectionData {
  className?: string;
  name: string;
  auto?: boolean;
  children?: React.ReactNode;
}

const sectionsData: SectionData[] = [
  {
    className: " bg-red-500",
    name: "About Me",
    children: <AboutMe />,
  },
  {
    className: " bg-green-500",
    name: "Coding",
  },
  {
    className: " bg-blue-500",
    name: "Forking",
  },
  {
    className: " bg-yellow-500",
    name: "Portfolio",
    children: <TypingText text="Merhaba, bu bir örnek metindir." />,
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
