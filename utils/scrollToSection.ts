export const scrollToSection = (
  index: number,
  sectionRefs: React.RefObject<HTMLDivElement>[],
  setCurrentSectionIndex: React.Dispatch<React.SetStateAction<number>>
) => {
  const ref = sectionRefs[index];
  if (ref.current) {
    const top = ref.current.offsetTop;
    window.scrollTo({
      top,
      behavior: "smooth",
    });
    setCurrentSectionIndex(index);
  }
};
