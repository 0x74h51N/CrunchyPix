import { useRef, useEffect, useState, useContext, createContext } from "react";
import CusButton from "./Button";

interface SectionData {
  name: string;
  auto?: boolean;
  className?: string;
  image?: string;
  textStyle?: string;
  children?: React.ReactNode;
}

const ScrollContext = createContext({
  scrollToSection: (index: number) => {},
});

export const useScroll = () => useContext(ScrollContext);

const Scroll = ({ sectionsData }: { sectionsData: SectionData[] }) => {
  const sectionRefs = sectionsData.map(() =>
    useRef<null | HTMLDivElement>(null)
  );
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(0);

  const scrollToSection = (index: number) => {
    const ref = sectionRefs[index];
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
      setCurrentSectionIndex(index);
    }
  };

  useEffect(() => {
    const handleScroll = (event: { deltaY: number }) => {
      if (event.deltaY > 0) {
        if (currentSectionIndex < sectionsData.length - 1) {
          scrollToSection(currentSectionIndex + 1);
        }
      } else {
        if (currentSectionIndex > 0) {
          scrollToSection(currentSectionIndex - 1);
        }
      }
    };

    window.addEventListener("wheel", handleScroll);

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [currentSectionIndex]);

  return (
    <ScrollContext.Provider value={{ scrollToSection }}>
      <>
        {sectionsData.map((section, index) => (
          <section
            key={index}
            ref={sectionRefs[index]}
            className={`${section.className} ${
              section.auto !== undefined
                ? section.auto
                  ? "h-auto"
                  : "h-screen"
                : "h-screen"
            }`}
            style={{ backgroundImage: `url(${section.image})` }}
          >
            {section.children}
          </section>
        ))}
      </>
    </ScrollContext.Provider>
  );
};

export default Scroll;
