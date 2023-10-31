"use client";
import Footer from "@/components/Footer";
import Scroll from "@/components/Scroll";

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
  },
  {
    className: " bg-green-500",
    name: "Portfolio",
  },
  {
    className: " bg-blue-500",
    name: "Forking",
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
