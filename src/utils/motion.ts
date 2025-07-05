import { Variants, Easing, AnimationGeneratorType } from 'framer-motion';

type AnimationType = AnimationGeneratorType | 'easeInOut' | false;

// Helper function to convert animation type and easing
const getAnimationConfig = (type: AnimationType) => {
  if (type === 'easeInOut') {
    return {
      type: 'tween' as const,
      ease: 'easeInOut' as Easing,
    };
  }
  return {
    type: type,
    ease: 'easeOut' as Easing,
  };
};

export const textVariant = (
  delay: number,
  duration: number = 0.8,
): Variants => {
  return {
    hidden: {
      y: -40,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: duration,
        delay: delay,
      },
    },
  };
};

export const fadeIn = (
  direction: string,
  type: AnimationType,
  delay: number,
  duration: number,
): Variants => {
  const { type: animationType, ease } = getAnimationConfig(type);

  const getDirectionValues = (dir: string) => {
    switch (dir) {
      case 'left':
        return { x: 100, y: 0 };
      case 'right':
        return { x: -100, y: 0 };
      case 'up':
        return { x: 0, y: 50 };
      case 'down':
        return { x: 0, y: -100 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const { x, y } = getDirectionValues(direction);

  return {
    hidden: {
      x,
      y,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: animationType,
        delay: delay,
        duration: duration,
        ease: ease,
      },
    },
  };
};

export const zoomIn = (delay: number, duration: number): Variants => {
  return {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'tween' as const,
        delay: delay,
        duration: duration,
        ease: 'easeOut' as Easing,
      },
    },
  };
};

export const slideIn = (
  direction: string,
  type: AnimationType,
  delay: number,
  duration: number,
): Variants => {
  const { type: animationType, ease } = getAnimationConfig(type);

  const getSlideValues = (dir: string) => {
    switch (dir) {
      case 'left':
        return { x: '-100%', y: 0 };
      case 'right':
        return { x: '100%', y: 0 };
      case 'up':
        return { x: 0, y: '100%' };
      case 'down':
        return { x: 0, y: '-100%' };
      default:
        return { x: 0, y: 0 };
    }
  };

  const { x, y } = getSlideValues(direction);

  return {
    hidden: {
      opacity: 0,
      x,
      y,
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: animationType,
        delay: delay,
        duration: duration,
        ease: ease,
      },
    },
  };
};

export const staggerContainer = (
  staggerChildren: number,
  delayChildren: number,
): Variants => {
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
  type: AnimationType,
  delay: number,
  duration: number,
): Variants => {
  const getClipPath = (dir: string): string => {
    switch (dir) {
      case 'down':
        return 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)';
      case 'up':
        return 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)';
      case 'left':
        return 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)';
      case 'right':
        return 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)';
      case 'screen':
        return 'polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)';
      default:
        return '';
    }
  };

  const clipPath0 = getClipPath(direction);
  const { type: animationType, ease } = getAnimationConfig(type);

  return {
    hidden: { clipPath: clipPath0 },
    show: {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      transition: {
        type: animationType,
        delay: delay,
        duration: duration,
        ease: ease,
      },
    },
  };
};
