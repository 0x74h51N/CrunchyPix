"use client";
import { useEffect, useRef, useState } from "react";
import { SectionData } from "@/app/common.types";
import { staggerContainer } from "@/utils/motion";
import { motion, useScroll, useTransform } from "framer-motion";
import { handleScroll } from "@/utils/handleScroll";
import { ScrollProvider } from "@/context/ScrollContext";
import Image from "next/image";

const Section = ({ sectionsData }: { sectionsData: SectionData[] }) => {
  const sectionRefs = sectionsData.map(() =>
    useRef<any | HTMLDivElement>(null)
  );
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(0);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 2000], [0, -900]);

  useEffect(() => {
    const handleScrollEvent = (event: WheelEvent) => {
      const currentSection = sectionsData[currentSectionIndex];
      handleScroll({
        event,
        currentSectionIndex,
        sectionsData,
        sectionRefs,
        setCurrentSectionIndex,
        smoothScroll: currentSection.smoothScroll ?? false,
      });
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
            w-full min-w-[350px] flex items-center justify-center overflow-hidden bg-cool-gray-800 
            ${section.parallax ? "sticky top-0 z-0 " : " relative"} 
          `}
          >
            {section.background && (
              <Image
                src={section.background}
                alt={section.background}
                width={2000}
                height={2000}
                quality={100}
                loading="eager"
                priority={true}
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 0,
                }}
              />
            )}
            {section.children}
            {section.topImage && (
              <motion.div
                style={{
                  y,
                  width: "100%",
                  height: "auto",
                  minHeight: "100%",
                  minWidth: "350px",
                  pointerEvents: "none",
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  zIndex: 10,
                  overflow: "hidden",
                }}
                key={section.topImage}
                className="relative"
              >
                <Image
                  src={section.topImage}
                  alt={section.topImage}
                  width={2000}
                  height={2000}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  priority={true}
                  className="galata1 absolute bottom-0 pointer-events-none"
                />
              </motion.div>
            )}
          </motion.section>
        ))}
      </div>
    </ScrollProvider>
  );
};

export default Section;
