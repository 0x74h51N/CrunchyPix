import { RootState } from '@/store';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { CldImage } from 'next-cloudinary';
import React, { CSSProperties, forwardRef, useState } from 'react';
import { useSelector } from 'react-redux';

interface InteractiveImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}

export const InteractiveImage = forwardRef<
  HTMLDivElement,
  InteractiveImageProps
>(({ src, alt, className, style, children }, containerRef) => {
  const [loading, setLoading] = useState(false);
  const isTouchDevice = useSelector((state: RootState) => state.isTouch.touch);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 50, damping: 120 });
  const y = useSpring(rawY, { stiffness: 50, damping: 120 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const posX =
      ((e.clientX - rect.left) / rect.width - 0.5) *
      (isTouchDevice ? 400 : 1000);
    const posY =
      ((e.clientY - rect.top) / rect.height - 0.5) *
      (isTouchDevice ? 400 : 1000);

    rawX.set(-posX);
    rawY.set(-posY);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <div
      className={`relative w-full overflow-hidden group ${className}`}
      style={style}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ height: '100%', x, y }}
        transition={{ type: 'tween', duration: 2, ease: 'easeInOut' }}
        className="w-full h-full"
      >
        <CldImage
          fill
          src={src}
          alt={alt}
          fetchPriority="high"
          format="avif"
          onLoad={() => setLoading(false)}
          className="object-cover w-full h-full group-hover:scale-[2] transition-all duration-[5000ms] out-expo"
        />
        {loading && (
          <CldImage
            fill
            quality={5}
            blur={'250'}
            src={src}
            alt={alt}
            className="w-full h-full object-cover transition-opacity ease-in-out duration-300"
          />
        )}
      </motion.div>
      {children}
    </div>
  );
});

InteractiveImage.displayName = 'InteractiveImage';
