export const disableScroll = () => {
    document.addEventListener('wheel', preventScroll, { passive: false });
  };
  
export const enableScroll = () => {
  document.removeEventListener('wheel', preventScroll);
  };
  
  const preventScroll = (e: WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };