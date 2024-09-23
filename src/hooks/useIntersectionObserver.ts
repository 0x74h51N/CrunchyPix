import { useEffect, useRef } from 'react';

/**
 * Custom hook for observing when an HTML element enters or leaves the viewport.
 *
 * @param {IntersectionObserverCallback} callback - The function to be executed whenever the target element
 * enters or exits the viewport. The callback receives an array of IntersectionObserverEntry objects,
 * each representing a target element being observed.
 *
 * @param {IntersectionObserverInit} [options] - Optional configuration object for the IntersectionObserver.
 * This can include properties such as 'root', 'rootMargin', and 'threshold' to customize the observer's behavior.
 *
 * @returns {Object} - An object containing the `targetRef`, which should be assigned to the HTML element you want to observe.
 */
const useIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit,
) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(callback, options);
    const currentObserver = observerRef.current;
    const currentTarget = targetRef.current;

    if (currentTarget) {
      currentObserver.observe(currentTarget);
    }

    return () => {
      if (currentObserver && currentTarget) {
        currentObserver.unobserve(currentTarget);
      }
    };
  }, [callback, options]);

  return { targetRef };
};

export default useIntersectionObserver;
