import { useState, useRef, useEffect, useCallback } from 'react';

const useThrottle = (func: () => void, limit: number) => {
  const [ready, setReady] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const throttledFunction = useCallback(() => {
    if (!ready) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    func();
    setReady(false);
    timeoutRef.current = setTimeout(() => {
      setReady(true);
    }, limit);
  }, [ready, func, limit]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return throttledFunction;
};

export default useThrottle;
