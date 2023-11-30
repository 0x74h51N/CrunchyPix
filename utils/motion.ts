export const textVariant = (delay: number) => {
  return {
    hidden: {
      y: -50,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 1.25,
        delay: delay,
      },
    },
  };
};

export const fadeIn = (
  direction: string,
  type: string,
  delay: number,
  duration: number
) => {
  return {
    hidden: {
      x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: type,
        delay: delay,
        duration: duration,
        ease: "easeOut",
      },
    },
  };
};

export const zoomIn = (delay: number, duration: number) => {
  return {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "tween",
        delay: delay,
        duration: duration,
        ease: "easeOut",
      },
    },
  };
};

export const slideIn = (
  direction: string,
  type: string,
  delay: number,
  duration: number
) => {
  return {
    hidden: {
      opacity: 0,
      x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
      y: direction === "up" ? "100%" : direction === "down" ? "-100%" : 0,
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: type,
        delay: delay,
        duration: duration,
        ease: "easeOut",
      },
    },
  };
};

export const staggerContainer = (
  staggerChildren: number,
  delayChildren: number
) => {
  return {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerChildren,
        delayChildren: delayChildren || 0,
      },
    },
  };
};

export const polygonIn = (
  direction: string,
  type: string,
  delay: number,
  duration: number
) => {
  const clipPath0 =
    direction === "down"
      ? "polygon(0 0, 100% 0, 100% 0, 0 0)"
      : direction === "up"
      ? "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)"
      : direction === "left"
      ? "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)"
      : direction === "right"
      ? "polygon(0 0, 0 0, 0 100%, 0 100%)"
      : "";
  const clipPath1 =
    direction === "down"
      ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
      : direction === "up"
      ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
      : direction === "left"
      ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
      : direction === "right"
      ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
      : "";

  return {
    hidden: { clipPath: clipPath0 },
    show: {
      clipPath: clipPath1,
      transition: {
        type: type,
        delay: delay,
        duration: duration,
        ease: "easeOut",
      },
    },
  };
};
