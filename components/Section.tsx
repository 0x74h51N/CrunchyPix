import { useEffect, useRef, useState } from "react";
import { SectionData } from "@/app/common.types";
import { staggerContainer } from "@/utils/motion";
import { motion, useAnimation } from "framer-motion";
import { handleScroll } from "@/utils/handleScroll";
import { ScrollProvider } from "@/context/ScrollContext";

const Section = ({ sectionsData }: { sectionsData: SectionData[] }) => {
  const sectionRefs = sectionsData.map(() =>
    useRef<any | HTMLDivElement>(null)
  );
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(0);
  const controls = useAnimation();
  const [scrollOffset, setScrollOffset] = useState<number>(0);

  useEffect(() => {
    const handleScrollEvent = (event: WheelEvent) => {
      const currentSection = sectionsData[currentSectionIndex];
      handleScroll({
        event,
        currentSectionIndex,
        sectionsData,
        sectionRefs,
        setCurrentSectionIndex,
        smoothScroll: !currentSection.parallax ?? true,
      });
      setScrollOffset(window.scrollY);
    };

    window.addEventListener("wheel", handleScrollEvent);

    return () => {
      window.removeEventListener("wheel", handleScrollEvent);
    };
  }, [currentSectionIndex, sectionRefs, sectionsData, setCurrentSectionIndex]);

  return (
    <ScrollProvider
      sectionRefs={sectionRefs}
      setCurrentSectionIndex={setCurrentSectionIndex}
    >
      <div>
        {sectionsData.map((section, index) => (
          <motion.section
            variants={staggerContainer(0.2, 0.2)}
            viewport={{ once: true, amount: 0.25 }}
            key={index}
            ref={sectionRefs[index]}
            className={`
              ${section.className} 
              h-auto w-screen flex items-center justify-center overflow-hidden 
              ${
                section.parallax
                  ? "sticky top-0 h-screen z-0 "
                  : "bg-black relative"
              } 
            `}
          >
            {section.children}
          </motion.section>
        ))}
      </div>
    </ScrollProvider>
  );
};

export default Section;
