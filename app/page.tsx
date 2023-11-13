import ParticlesBack from "@/components/ParticlesBack/ParticlesBack";
import Scroll from "@/components/Scroll";
import AboutMeSect from "@/components/Sections/AboutMeSect";
import PortfolioSect from "@/components/Sections/PortfolioSect";

interface SectionData {
  className?: string;
  name: string;
  auto?: boolean;
  children?: React.ReactNode;
}
const sectionsData: SectionData[] = [
  {
    name: "Slider Page",
    children: <ParticlesBack />,
    className: "gradiantBack",
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
      <div>
        <Scroll sectionsData={sectionsData}></Scroll>
      </div>
    </>
  );
};

export default Home;
