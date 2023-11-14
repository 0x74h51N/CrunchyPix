"use client";
import { createContext, useContext, useRef, useState } from "react";
import { SectionData } from "@/app/common.types";
import { staggerContainer } from "@/utils/motion";
import { motion } from "framer-motion";

const ScrollContext = createContext({
  scrollToSection: (index: number) => {},
});

export const useScroll = () => useContext(ScrollContext);

const Section = ({ sectionsData }: { sectionsData: SectionData[] }) => {
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

  return (
    <>
      <ScrollContext.Provider value={{ scrollToSection }}>
        {sectionsData.map((section, index) => (
          <motion.section
            variants={staggerContainer(0.2, 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            key={index}
            ref={sectionRefs[index]}
            className={`${section.className} flex items-center justify-center overflow-hidden`}
          >
            {section.children}
          </motion.section>
        ))}
      </ScrollContext.Provider>
    </>
  );
};

export default Section;
