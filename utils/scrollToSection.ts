export const scrollToSection = (
  index: number,
  duration: number = 0,
  sectionRefs: React.RefObject<HTMLDivElement>[],
  setCurrentSectionIndex: React.Dispatch<React.SetStateAction<number>>
) => {
  const ref = sectionRefs[index];
  if (duration === 0 || !duration) {
    if (ref.current) {
      const top = ref.current.offsetTop;
      window.scrollTo({
        top,
        behavior: "smooth",
      });
      setCurrentSectionIndex(index);
    }
  } else {
    if (ref.current) {
      const top = ref.current.offsetTop;
      const start = window.scrollY;
      const startTime =
        "now" in window.performance ? performance.now() : new Date().getTime();

      const scroll = () => {
        const currentTime =
          "now" in window.performance
            ? performance.now()
            : new Date().getTime();
        const timeElapsed = currentTime - startTime;
        const scrollY = easeInOutCubic(
          timeElapsed,
          start,
          top - start,
          duration
        );

        window.scrollTo(0, scrollY);

        if (timeElapsed < duration) {
          requestAnimationFrame(scroll);
        } else {
          setCurrentSectionIndex(index);
        }
      };

      scroll();
    }
  }
};
const easeInOutCubic = (t: number, b: number, c: number, d: number) => {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t * t + b;
  t -= 2;
  return (c / 2) * (t * t * t + 2) + b;
};
