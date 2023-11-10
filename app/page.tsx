import Scroll from "@/components/Scroll";
import AboutMeSect from "@/components/Sections/AboutMeSect";
import PortfolioSect from "@/components/Sections/PortfolioSect";
import SliderSect from "@/components/Sections/SliderSect";

interface SectionData {
  className?: string;
  name: string;
  auto?: boolean;
  children?: React.ReactNode;
}
const sectionsData: SectionData[] = [
  {
    name: "Slider Page",
    children: <SliderSect />,
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
  {
    name: "Contact Me",
    auto: true,
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
