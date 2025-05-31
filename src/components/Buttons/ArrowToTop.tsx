'use client';
import { slideIn } from '@/utils/motion';
import { scrollToTop } from '@/utils/scrollToSection';
import { motion } from 'framer-motion';
import { useState } from 'react';
import ArrowSVG from './ArrowSVG';
import useClickableHandlers from '@/hooks/useClickableHandlers';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

export const ArrowToTop = () => {
  const [isArrowVisible, setArrowVisible] = useState(false);
  const { handleMouseEnter, handleMouseLeave } = useClickableHandlers();

  const observerCallback: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setArrowVisible(false);
      } else {
        setArrowVisible(true);
      }
    });
  };
  const isBlog = useSelector((state: RootState) => state.pathSlice.isBlogPage);

  const { targetRef } = useIntersectionObserver(observerCallback, {
    threshold: 0,
  });

  const handleButtonClick = () => {
    handleMouseLeave();
    scrollToTop(1500);
  };

  return (
    <>
      <div
        ref={targetRef}
        style={{
          position: 'absolute',
          top: '500px',
          width: '1px',
          height: '1px',
        }}
      ></div>
      <motion.div
        initial={'hidden'}
        animate={isArrowVisible ? 'show' : 'hidden'}
        variants={slideIn('right', 'spring', 0.1, 0.8)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="fixed flexCenter bottom-5 right-3 bg-cool-gray-900/50 hover:bg-cool-gray-900/100  w-[40px] h-[40px] z-50 rounded-lg"
      >
        <button
          className={`${isBlog ? 'curosr-pointer' : 'cursor-none'} stroke-white hover:stroke-log-col -rotate-90 -mb-2`}
          onClick={handleButtonClick}
        >
          <ArrowSVG width={45} height={45} strokeWidth={3} />
        </button>
      </motion.div>
    </>
  );
};
