import { useRef, useEffect, useState } from "react";

interface SectionData {
  name: string;
  className?: string;
  image?: string;
  title?: string;
  text?: string;
  textStyle?: string;
  children?: React.ReactNode;
}

const sectionsData: SectionData[] = [];

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
    <>
      {sectionsData.map((section, index) => (
        <section
          key={index}
          ref={sectionRefs[index]}
          className={`h-screen ${section.className}`}
          style={{ backgroundImage: `url(${section.image})` }}
        >
          {section.title && <h1>{section.title}</h1>}
          {section.text && (
            <p className={`${section.textStyle}`}>{section.text}</p>
          )}
          {section.children}
          {index < sectionsData.length - 1 && (
            <div className="flex items-center justify-center h-screen">
              <div className="p-6 bg-amber-200 opacity-50 hover:opacity-100 transition-opacity rounded-lg shadow-lg">
                <button onClick={() => scrollToSection(index + 1)}>
                  Go to the {sectionsData[index + 1].name}
                </button>
              </div>
            </div>
          )}
        </section>
      ))}
    </>
  );
};
export default Scroll;
