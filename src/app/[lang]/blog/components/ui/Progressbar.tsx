'use client';

import React, { useState, useEffect, useRef } from 'react';

const ScrollProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const rafId = useRef<number | null>(null);
  const prevScrollY = useRef(0);

  useEffect(() => {
    const articleElement = document.getElementById('article-content');
    if (!articleElement) {
      console.error('Cannot find article content');
      return;
    }

    const updateProgress = () => {
      const articleRect = articleElement.getBoundingClientRect();
      const articleTop = articleRect.top + window.scrollY;
      const articleBottom = articleRect.bottom + window.scrollY;
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;

      if (scrollY !== prevScrollY.current) {
        prevScrollY.current = scrollY;

        if (scrollY < articleTop) {
          setProgress(0);
        } else if (scrollY + viewportHeight >= articleBottom) {
          setProgress(100);
        } else {
          const availableScroll = articleBottom - articleTop - viewportHeight;
          const currentScroll = scrollY - articleTop;
          const progressPercentage = (currentScroll / availableScroll) * 100;
          setProgress(Math.min(100, Math.max(0, progressPercentage)));
        }
      }

      rafId.current = requestAnimationFrame(updateProgress);
    };

    rafId.current = requestAnimationFrame(updateProgress);

    const handleResize = () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      rafId.current = requestAnimationFrame(updateProgress);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed z-[250] top-0 left-0 right-0 w-full h-1 bg-primary">
      <div
        className="h-full bg-log-col transition-[width] duration-75 ease-out-expo"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
      ></div>
    </div>
  );
};

export default ScrollProgressBar;
