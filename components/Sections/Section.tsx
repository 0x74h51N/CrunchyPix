'use client';
import { createRef, memo, useEffect, useRef, useState } from 'react';
import { SectionData } from '@/types/common.types';
import { motion, useScroll, useTransform } from 'framer-motion';
import { handleScroll } from '@/utils/handleScroll';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { ArrowButton } from '../Buttons/ArrowButton';
import { CldImage } from 'next-cloudinary';

const areEqual = (prevProps: SectionDataProps, nextProps: SectionDataProps) => {
  return prevProps.sectionsData === nextProps.sectionsData;
};

interface SectionDataProps {
  sectionsData: SectionData[];
}

const Section = memo(({ sectionsData }: SectionDataProps) => {
  const sectionRefs = useRef(
    sectionsData.map(() => createRef<HTMLDivElement>()),
  );
  const [currentSection, setCurrentSection] = useState(() => 0);
  const { scrollY } = useScroll();
  const isScrollEnabled = useSelector(
    (state: RootState) => state.isScrollEnabled.enabled,
  );
  const isTouchDevice = useSelector((state: RootState) => state.isTouch.touch);
  const y = useTransform(scrollY, [0, 2000], [0, -900]);

  /**IntersectionObserver */
  useEffect(() => {
    if (!isTouchDevice) {
      const observerCallback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.findIndex(
              (ref) => ref.current === entry.target,
            );
            setCurrentSection(index);
          }
        });
      };

      const observer = new IntersectionObserver(observerCallback, {
        threshold: 0.5,
      });
      const currentSectionRefs = sectionRefs.current;

      currentSectionRefs.forEach((ref, index) => {
        if (ref.current && index !== 0) {
          observer.observe(ref.current);
        }
      });

      return () => {
        currentSectionRefs.forEach((ref, index) => {
          if (ref.current && index !== 0) {
            observer.unobserve(ref.current);
          }
        });
      };
    }
  }, [isTouchDevice]);

  /**Wheel event listener */
  useEffect(() => {
    if (!isTouchDevice) {
      const handleScrollEvent = (event: WheelEvent) => {
        if (
          isScrollEnabled &&
          !(event.deltaY < 0 && currentSection === 1) &&
          currentSection !== 0
        ) {
          handleScroll({
            event,
            currentSection,
            sectionRefs: sectionRefs.current,
          });
        }
      };
      window.addEventListener('wheel', handleScrollEvent);

      return () => {
        window.removeEventListener('wheel', handleScrollEvent);
      };
    }
  }, [currentSection, sectionRefs, isTouchDevice, isScrollEnabled]);

  return (
    <div>
      {sectionsData.map((section, index) => (
        <section
          key={index}
          id={section.name.toLowerCase().replaceAll(' ', '-')}
          ref={sectionRefs.current[index]}
          className={`
            ${section.className} 
            w-full min-w-[350px] flex items-center justify-center overflow-hidden
            ${section.parallax ? 'sticky top-0 z-0 ' : ' relative'} 
          `}
        >
          {section.background && (
            <CldImage
              src={section.background}
              alt={section.background}
              format="avif"
              width={3000}
              height={2160}
              quality={100}
              fetchPriority="high"
              priority
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
                width: '100%',
                height: '100%',
                position: 'absolute',
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
                width: '100%',
                height: 'auto',
                minHeight: '100%',
                minWidth: '350px',
                pointerEvents: 'none',
                position: 'absolute',
                bottom: 0,
                left: 0,
                zIndex: 10,
                overflow: 'hidden',
              }}
              key={section.topImage}
              className="relative"
            >
              <CldImage
                src={section.topImage}
                alt={section.topImage}
                format="avif"
                quality={100}
                width={3000}
                height={2160}
                fetchPriority="high"
                priority
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                className="galata1 absolute bottom-0 pointer-events-none"
              />
            </motion.div>
          )}
          <div className="absolute bottom-0 w-auto flex justify-center z-50">
            {index === 0 && (
              <ArrowButton
                index={1}
                duration={1500}
                arrow={true}
                className="opacity-50 hover:opacity-100 transition-opacity animate-bounce-slow z-10"
                sectionRefs={sectionRefs.current}
              />
            )}
          </div>
        </section>
      ))}
    </div>
  );
}, areEqual);
Section.displayName = 'Section';
export default Section;
