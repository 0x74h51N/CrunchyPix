import React, { useEffect } from 'react';

/**
 * Handles clicks outside of passed ref element and scroll events
 * @param ref - react ref of the element
 * @param callback - callback function to call when clicked outside
 * @param scroll - to run callback function when scrolled, default true
 */
export const useOutsideClick = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void,
  scroll: boolean = true,
) => {
  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    function handleScroll() {
      if (ref.current) {
        callback();
      }
    }

    document.addEventListener('mousedown', handleOutsideClick, true);

    if (scroll) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick, true);
      if (scroll) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [ref, callback, scroll]);
};
