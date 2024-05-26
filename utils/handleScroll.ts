import { HandleScroll } from "@/app/common.types";
import { scrollToSection } from "./scrollToSection";
import { disableScroll, enableScroll } from "./scrollEventControl";

export const handleScroll = ({
  event,
  currentIndex,
  sectionsData,
  sectionRefs,
  duration = 500,
  setScrollState
}: HandleScroll) => {

  if (!event) {
    return;
  }
  const scrollDirection = event.deltaY > 0 ? "down" : "up";

  if (
    scrollDirection === "down" && currentIndex < sectionsData.length - 1) 
    {
    const currentSectionRef = sectionRefs[currentIndex].current;

    const currentSectionBottom = currentSectionRef && window.scrollY + window.innerHeight >= currentSectionRef.offsetTop + currentSectionRef.clientHeight;
    if (currentSectionBottom)  {
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
        }, duration+100);
    }
  }

  if (scrollDirection === "up" && currentIndex > 0) {
    const currentSectionRef = sectionRefs[currentIndex].current;
    const currentSectionTop = currentSectionRef && window.scrollY <= currentSectionRef.offsetTop;
    if (currentSectionTop)  {
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
        }, duration+100);
      }
  }
};
