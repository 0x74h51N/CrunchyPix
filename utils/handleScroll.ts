import { HandleScroll } from "@/app/common.types";
import { scrollToSection } from "./scrollToSection";
import { disableScroll, enableScroll } from "./scrollEventControl";

export const handleScroll = ({
  event,
  currentIndex,
  sectionsData,
  sectionRefs,
  duration = 1000,
  setScrollState
}: HandleScroll) => {

  if (!event) {
    return;
  }
  const scrollDirection = event.deltaY > 0 ? "down" : "up";

  if (
    scrollDirection === "down" &&
    currentIndex < sectionsData.length - 1
  ) {
    const currentSectionRef = sectionRefs[currentIndex].current;
    const nextSectionRef = sectionRefs[currentIndex + 1].current;

    const currentSectionBottom =
      currentSectionRef &&
      window.scrollY + window.innerHeight >=
        currentSectionRef.offsetTop + currentSectionRef.clientHeight;
    const nextSectionTop =
      nextSectionRef &&
      window.scrollY + window.innerHeight >= nextSectionRef.offsetTop;

    if (currentSectionBottom && nextSectionTop)  {
      disableScroll();
      setScrollState(false)
        scrollToSection(
          currentIndex + 1,
          duration,
          sectionRefs,
        ); 
        setTimeout(() => {
      setScrollState(true) 
          enableScroll();
        }, 1100);
    }
  }

  if (scrollDirection === "up" && currentIndex > 0) {
    const currentSectionRef = sectionRefs[currentIndex].current;
    const prevSectionRef = sectionRefs[currentIndex - 1].current;

    const currentSectionTop =
      currentSectionRef && window.scrollY <= currentSectionRef.offsetTop;
    const prevSectionBottom =
      prevSectionRef &&
      window.scrollY <= prevSectionRef.offsetTop + prevSectionRef.clientHeight;
    if (currentSectionTop && prevSectionBottom)  {
      disableScroll();
      setScrollState(false)
        scrollToSection(
          currentIndex - 1,
          duration,
          sectionRefs,
        );
        setTimeout(() => {
      setScrollState(true) 
          enableScroll();
        }, 1000);
      }
  }
};
