import IconButton from '@/components/Buttons/IconButton';
import { IconProps } from '@/schemas';
import { slideIn } from '@/utils/motion';
import { motion } from 'framer-motion';
import { CldImage } from 'next-cloudinary';
import { useEffect, useRef, useState } from 'react';

const TopImage = ({ id, icons }: { id: string; icons?: IconProps[] }) => {
  const [loading, setLoading] = useState(true);
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

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-auto overflow-hidden ${
        imageTop.includes('catalog')
          ? 'lg:min-h-[870px] md:min-h-[700px]'
          : 'md:min-h-[700px]'
      } md:min-h-[400px] min-h-[650px]`}
      style={{
        backgroundImage: imageTop.includes('kyk')
          ? 'linear-gradient(to bottom right,  #e2e8f0, #d6d3d1)'
          : 'linear-gradient(to bottom right,  #171717, #334155)',
      }}
    >
      <CldImage
        fill
        fetchPriority="high"
        format="avif"
        src={mobile ? imageMobile : imageTop}
        alt={id}
        onLoad={() => setLoading(false)}
        className={`w-full h-full object-cover transition-opacity ease-in-out duration-300`}
        style={{ opacity: loading ? 0 : 100 }}
      />
      {loading && (
        <CldImage
          fill
          quality={5}
          blur={250}
          src={mobile ? imageMobile : imageTop}
          alt={id}
          className={`w-full h-full object-cover transition-opacity ease-in-out duration-300 `}
        />
      )}
      {icons &&
        (icons.length > 0 ? (
          <motion.div
            variants={slideIn('right', 'spring', 2, 1)}
            className="absolute flex flex-row gap-4 bottom-5 py-3 right-0 pr-7 pl-4 bg-black bg-opacity-50 rounded-l-lg"
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
                  <span className="hover:text-log-col transition-all ease-in-out duration-300 text-cool-gray-50 lg:text-4xl text-3xl hover:scale-110">
                    <IconButton key={iconIndex} icon={icon} />
                  </span>
                </div>
              ))}
          </motion.div>
        ) : null)}
    </div>
  );
};

export default TopImage;
