import IconButton from '@/components/Buttons/IconButton';
import { IconProps } from '@/schemas';
import { slideIn } from '@/utils/motion';
import { motion } from 'framer-motion';
import { CldImage } from 'next-cloudinary';
import { useState } from 'react';

const TopImage = ({ id, icons }: { id: string; icons?: IconProps[] }) => {
  const [loading, setLoading] = useState(true);
  const imageTop = `crunchypix/portfolioItems/${id.includes('kyk') ? id.replaceAll('_', '') : id.replaceAll('_', '') + 'Top'}`;
  return (
    <div
      className={`relative w-full h-auto overflow-hidden ${
        imageTop.includes('catalog')
          ? 'lg:min-h-[870px] md:min-h-[700px]'
          : 'md:min-h-[700px]'
      } min-h-[400px]`}
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
        src={imageTop}
        alt={id}
        onLoad={() => setLoading(false)}
        className={`w-full h-full object-cover max-md:object-contain max-md:scale-150 transition-opacity ease-in-out duration-300 `}
        style={{ opacity: loading ? 0 : 100 }}
      />
      {loading && (
        <CldImage
          fill
          quality={5}
          blur={250}
          src={imageTop}
          alt={id}
          className={`w-full h-full object-cover transition-opacity ease-in-out duration-300 `}
        />
      )}
      {icons &&
        (icons.length > 1 ? (
          <motion.div
            variants={slideIn('right', 'spring', 2, 1)}
            className="absolute flex flex-row gap-4 bottom-5 py-3 right-0 pr-6 pl-4 bg-black bg-opacity-50 rounded-l-lg"
          >
            {icons.map((icon, iconIndex) => (
              <span
                key={iconIndex}
                className="hover:text-log-col transition-all ease-in-out duration-300 text-cool-gray-50 lg:text-4xl text-2xl"
              >
                <IconButton key={iconIndex} icon={icon} />
              </span>
            ))}
          </motion.div>
        ) : null)}
    </div>
  );
};

export default TopImage;
