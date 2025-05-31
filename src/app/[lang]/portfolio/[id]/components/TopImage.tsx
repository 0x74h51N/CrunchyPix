import IconButton from '@/components/Buttons/IconButton';
import { IconProps } from '@/lib/schemas';
import { slideIn } from '@/utils/motion';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { InteractiveImage } from './InteractiveImage';

const TopImage = ({ id, icons }: { id: string; icons?: IconProps[] }) => {
  const [mobile, setMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageTop = `crunchypix/portfolioItems/${id.replaceAll('_', '') + 'Top'}`;
  const imageMobile = `crunchypix/portfolioItems/${id.replaceAll('_', '') + 'Mobile'}`;

  useEffect(() => {
    const currentContainerRef = containerRef.current;
    const handleResize = (entry: ResizeObserverEntry) => {
      if (entry.contentRect.width < 450) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    };

    const resizeObserver = new ResizeObserver(([entry]) => handleResize(entry));
    if (currentContainerRef) {
      resizeObserver.observe(currentContainerRef);
    }
    return () => {
      if (currentContainerRef) {
        resizeObserver.unobserve(currentContainerRef);
      }
    };
  }, []);
  const className = `${
    imageTop.includes('catalog')
      ? 'lg:h-[870px] md:min-h-[700px]'
      : 'md:h-[700px]'
  } md:h-[400px] h-[630px]`;
  const style = {
    backgroundImage: imageTop.includes('catalog')
      ? 'linear-gradient(to bottom right,  #e2e8f0, #d6d3d1)'
      : 'linear-gradient(to bottom right,  #171717, #334155)',
  };
  return (
    <InteractiveImage
      src={mobile ? imageMobile : imageTop}
      alt={id}
      className={className}
      style={style}
      ref={containerRef}
    >
      {icons &&
        (icons.length > 0 ? (
          <motion.div
            variants={slideIn('right', 'spring', 2, 1)}
            className="absolute flex flex-row sm:gap-4 gap-3 bottom-5 sm:py-3 py-2 sm:right-0 -right-3 pr-7 pl-4 bg-black/50 rounded-l-lg"
          >
            {icons
              .sort((a, b) => a.id - b.id)
              .map((icon, iconIndex) => (
                <div key={`${id}-${iconIndex}-icon`} className="relative">
                  {icon.type === 'web' && (
                    <span className="absolute -right-6 -top-3 badge badge-sm badge-warning animate-beat z-10">
                      Live
                    </span>
                  )}
                  <span className="flex hover:text-log-col transition-all ease-in-out duration-300 text-cool-gray-50 lg:text-4xl text-3xl hover:scale-110">
                    <IconButton key={iconIndex} icon={icon} />
                  </span>
                </div>
              ))}
          </motion.div>
        ) : null)}
    </InteractiveImage>
  );
};

export default TopImage;
