"use client";
import { useRef, useEffect, useState, useContext, createContext } from "react";
import { SectionData } from "@/app/common.types";
import { staggerContainer } from "@/utils/motion";
import { motion } from "framer-motion";

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
        const nextSectionRef = sectionRefs[currentSectionIndex + 1].current;

        const currentSectionBottom =
          currentSectionRef &&
          window.scrollY + window.innerHeight >=
            currentSectionRef.offsetTop + currentSectionRef.clientHeight;
        const nextSectionTop =
          nextSectionRef &&
          window.scrollY + window.innerHeight >= nextSectionRef.offsetTop;

        if (!currentSectionBottom && !nextSectionTop) {
          event.preventDefault();
        } else {
          scrollToSection(currentSectionIndex + 1);
        }
      }

      if (scrollDirection === "up" && currentSectionIndex > 0) {
        const currentSectionRef = sectionRefs[currentSectionIndex].current;
        const prevSectionRef = sectionRefs[currentSectionIndex - 1].current;

        const currentSectionTop =
          currentSectionRef && window.scrollY <= currentSectionRef.offsetTop;
        const prevSectionBottom =
          prevSectionRef &&
          window.scrollY <=
            prevSectionRef.offsetTop + prevSectionRef.clientHeight;

        if (!currentSectionTop && !prevSectionBottom) {
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
  }, [currentSectionIndex, sectionRefs, sectionsData]);

  return (
    <ScrollContext.Provider value={{ scrollToSection }}>
      <>
        {sectionsData.map((section, index) => (
          <motion.section
            variants={staggerContainer(0.2, 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            key={index}
            ref={sectionRefs[index]}
            className={`${
              section.className
            } flex items-center justify-center overflow-hidden ${
              section.auto !== undefined
                ? section.auto
                  ? "h-auto"
                  : "h-screen"
                : "h-screen"
            }`}
          >
            {section.children}
          </motion.section>
        ))}
      </>
    </ScrollContext.Provider>
  );
};

export default Scroll;
