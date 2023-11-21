import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ParallaxSection = ({ children }: { children: React.ReactNode }) => {
  const sectionRef = useRef<null | HTMLDivElement>(null);
  const [scrollOffset, setScrollOffset] = useState<number>(0);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const offset = sectionRef.current.getBoundingClientRect().top;
        setScrollOffset(offset);
      }
    };

    const handleScrollThrottle = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", handleScrollThrottle);

    return () => {
      window.removeEventListener("scroll", handleScrollThrottle);
    };
  }, []);

  useEffect(() => {
    controls.start({
      y: -scrollOffset * 0.5,
    });
  }, [scrollOffset, controls]);

  return (
    <motion.div
      ref={sectionRef}
      style={{ position: "sticky", top: 0, height: "100vh", zIndex: 1 }}
      className="absolute h-auto w-full overflow-hidden"
    >
      {children}
    </motion.div>
  );
};

export default ParallaxSection;
