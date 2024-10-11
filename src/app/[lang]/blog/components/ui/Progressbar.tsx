'use client';

import React, { useState, useEffect } from 'react';

const Progressbar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const blogPostElement = document.getElementById('article-content');

    if (!blogPostElement) {
      console.log('cannot find');
      return;
    }

    const blogPostHeight = blogPostElement.clientHeight;
    const blogPostTop =
      blogPostElement.getBoundingClientRect().top + window.scrollY;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const maxScroll = blogPostTop + blogPostHeight - windowHeight;

      if (scrollTop >= blogPostTop && scrollTop <= maxScroll) {
        const newProgress =
          ((scrollTop - blogPostTop) / (maxScroll - blogPostTop)) * 100;
        setProgress(newProgress);
      } else if (scrollTop < blogPostTop) {
        setProgress(0);
      } else if (scrollTop > maxScroll) {
        setProgress(100);
      }
    };

    const timeoutId = setTimeout(() => {
      window.addEventListener('scroll', handleScroll);
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed z-[250] top-0 left-0 right-0 progress w-full h-1 mb-2 bg-primary">
      <div
        className="progress progress-success bg-log-col h-1"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      ></div>
    </div>
  );
};

export default Progressbar;
