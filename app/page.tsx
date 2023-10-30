"use client";
import Footer from "@/components/Footer";
import Scroll from "@/components/Scroll";

interface SectionData {
  className: string;
  name: string;
  children?: React.ReactNode;
}

const sectionsData: SectionData[] = [
  {
    className: "h-screen bg-red-500",
    name: "About Me",
  },
  {
    className: "h-screen bg-green-500",
    name: "Coding",
  },
  {
    className: "h-screen bg-blue-500",
    name: "Forking",
  },
  {
    className: "h-screen bg-yellow-500",
    name: "Portfolio",
  },
  {
    className: "h-auto",
    name: "Contact Me",
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
