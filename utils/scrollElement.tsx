// Handles scrolling of Element to view
export function scrollElementToView(scrollToId: string) {
  const element = document.querySelector(`#${scrollToId}`) as HTMLElement;

  const elRect = element.getBoundingClientRect();

  const scrollDistance = elRect.top + window.scrollY;

  // Incase you want to offset the scroll To view Position.
  const offset =
    Number(element.getAttribute("data-scroll-to-view-offset")) || 0;

  window.scrollTo({
    top: scrollDistance + offset,
    behavior: "smooth",
  });
}
