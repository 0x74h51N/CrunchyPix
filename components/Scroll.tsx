"use client";
import { useRef, useEffect, useState, useContext, createContext } from "react";
import { SectionData } from "@/app/common.types";

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
      const top = ref.current.offsetTop;
      window.scrollTo({
        top,
        behavior: "smooth",
      });
      setCurrentSectionIndex(index);
    }
  };

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      const scrollDirection = event.deltaY > 0 ? "down" : "up";

      if (
        scrollDirection === "down" &&
        currentSectionIndex < sectionsData.length - 1
      ) {
        const currentSectionRef = sectionRefs[currentSectionIndex].current;
        const currentSectionBottom =
          currentSectionRef &&
          window.scrollY + window.innerHeight >=
            currentSectionRef.offsetTop + currentSectionRef.clientHeight;

        if (!currentSectionBottom) {
          event.preventDefault();
        } else {
          scrollToSection(currentSectionIndex + 1);
        }
      }

      if (scrollDirection === "up" && currentSectionIndex > 0) {
        const currentSectionRef = sectionRefs[currentSectionIndex].current;
        const currentSectionTop =
          currentSectionRef && window.scrollY <= currentSectionRef.offsetTop;

        if (!currentSectionTop) {
          event.preventDefault();
        } else {
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
          >
            {section.children}
          </section>
        ))}
      </>
    </ScrollContext.Provider>
  );
};

export default Scroll;
