import { HandleScroll } from "@/app/common.types";
import { scrollToSection } from "./scrollToSection";

export const handleScroll = ({
  event,
  currentSectionIndex,
  sectionsData,
  sectionRefs,
  setCurrentSectionIndex,
}: HandleScroll) => {
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
      scrollToSection(
        currentSectionIndex + 1,
        sectionRefs,
        setCurrentSectionIndex
      );
    }
  }

  if (scrollDirection === "up" && currentSectionIndex > 0) {
    const currentSectionRef = sectionRefs[currentSectionIndex].current;
    const prevSectionRef = sectionRefs[currentSectionIndex - 1].current;

    const currentSectionTop =
      currentSectionRef && window.scrollY <= currentSectionRef.offsetTop;
    const prevSectionBottom =
      prevSectionRef &&
      window.scrollY <= prevSectionRef.offsetTop + prevSectionRef.clientHeight;

    if (!currentSectionTop && !prevSectionBottom) {
      event.preventDefault();
    } else {
      scrollToSection(
        currentSectionIndex - 1,
        sectionRefs,
        setCurrentSectionIndex
      );
    }
  }
};
