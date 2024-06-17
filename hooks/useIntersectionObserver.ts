import { useEffect, useRef } from 'react';

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
