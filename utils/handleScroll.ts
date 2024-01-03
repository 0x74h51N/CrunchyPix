import { HandleScroll } from "@/app/common.types";
import { scrollToSection } from "./scrollToSection";

export const handleScroll = ({
  event,
  currentSectionIndex,
  sectionsData,
  sectionRefs,
  smoothScroll = true,
  duration = 0,
  dispatchSetIndex,
}: HandleScroll) => {
  if (!event) {
    return;
  }

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
    } else {
      if (smoothScroll) {
        scrollToSection(
          currentSectionIndex + 1,
          duration,
          sectionRefs,
          dispatchSetIndex
        );
      } else {
        dispatchSetIndex(currentSectionIndex + 1);
      }
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
    } else {
      if (smoothScroll) {
        scrollToSection(
          currentSectionIndex - 1,
          duration,
          sectionRefs,
          dispatchSetIndex
        );
      } else {
        dispatchSetIndex(currentSectionIndex - 1);
      }
    }
  }
};
