import { HandleScroll } from '@/app/common.types';
import { scrollToSection } from './scrollToSection';

export const handleScroll = ({
  event,
  currentSection,
  sectionRefs,
  duration = 500,
}: HandleScroll) => {
  if (!event) {
    return;
  }
  const scrollDirection = event.deltaY > 0 ? 'down' : 'up';

  if (scrollDirection === 'down' && currentSection < sectionRefs.length - 1) {
    const currentSectionRef = sectionRefs[currentSection].current;

    const currentSectionBottom =
      currentSectionRef &&
      window.scrollY + window.innerHeight >=
        currentSectionRef.offsetTop + currentSectionRef.clientHeight;
    if (currentSectionBottom) {
      scrollToSection(currentSection + 1, duration, sectionRefs);
    }
  }

  if (scrollDirection === 'up' && currentSection > 0) {
    const currentSectionRef = sectionRefs[currentSection].current;
    const currentSectionTop =
      currentSectionRef && window.scrollY <= currentSectionRef.offsetTop;
    if (currentSectionTop) {
      scrollToSection(currentSection - 1, duration, sectionRefs);
    }
  }
};
