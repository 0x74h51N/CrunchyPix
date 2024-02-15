"use client";
import { useEffect, useRef, useState } from "react";
import { SectionData } from "@/app/common.types";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollProvider } from "@/context/ScrollContext";
import Image from "next/image";
import { handleScroll } from "@/utils/handleScroll";
import { useDispatch, useSelector } from "react-redux";
import { setIndex } from "@/store/redux/currentSectionIndex";
import { RootState } from "@/store";

const Section = ({ sectionsData }: { sectionsData: SectionData[] }) => {
  const sectionRefs = sectionsData.map(() =>
    useRef<any | HTMLDivElement>(null)
  );
  const currentSectionIndex = useSelector(
    (state: RootState) => state.sectionIndex.index
  );
  const { scrollY } = useScroll();
  const isScrollEnabled = useSelector(
    (state: RootState) => state.isScrollEnabled.enabled
  );
  const dispatch = useDispatch();
  const y = useTransform(scrollY, [0, 2000], [0, -900]);
  useEffect(() => {
    const handleScrollEvent = (event: WheelEvent) => {
      if (isScrollEnabled) {
        const currentSection = sectionsData[currentSectionIndex];
        handleScroll({
          event,
          currentSectionIndex,
          sectionsData,
          sectionRefs,
          smoothScroll: currentSection.smoothScroll ?? false,
          dispatchSetIndex: (index: number) => {
            dispatch(setIndex(index));
          },
        });
      }
    };

    window.addEventListener("wheel", handleScrollEvent);

    return () => {
      window.removeEventListener("wheel", handleScrollEvent);
    };
  }, [currentSectionIndex, sectionRefs, sectionsData]);

  return (
    <ScrollProvider sectionRefs={sectionRefs}>
      <div>
        {sectionsData.map((section, index) => (
          <section
            key={index}
            ref={sectionRefs[index]}
            className={`
            ${section.className} 
            w-full min-w-[350px] flex items-center justify-center overflow-hidden 
            ${section.parallax ? "sticky top-0 z-0 " : " relative"} 
          `}
          >
            {section.background && (
              <Image
                src={section.background}
                alt={section.background}
                quality={100}
                fill
                priority
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
                  quality={100}
                  fill
                  priority
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  className="galata1 absolute bottom-0 pointer-events-none"
                />
              </motion.div>
            )}
          </section>
        ))}
      </div>
    </ScrollProvider>
  );
};

export default Section;
