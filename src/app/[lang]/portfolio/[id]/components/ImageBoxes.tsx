import { fadeIn } from '@/utils/motion';
import { motion } from 'framer-motion';
import { CldImage } from 'next-cloudinary';
import { memo } from 'react';

const ImageBoxes = ({ _id }: { _id: string }) => {
  const imageBoxes = ['Respo0', 'Respo', 'Respo2'];
  const isLargeScreen =
    typeof window !== 'undefined' && window.innerWidth >= 768;
  return (
    <div className="flex md:flex-row flex-col items-center justify-between w-full h-auto md:mt-24 mt-10 mb-8 gap-6">
      {imageBoxes.map((image: string, index: number) => (
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 'all' }}
          variants={fadeIn('down', 'spring', isLargeScreen ? index : 0.3, 0)}
          key={index}
          className="duration-1000 overflow-hidden flexCenter"
        >
          <CldImage
            width={1200}
            height={1200}
            src={`crunchypix/portfolioItems/boxes/${_id.replaceAll('_', '').toLowerCase() + image}`}
            alt={_id}
            format="avif"
            quality="auto"
            fetchPriority="auto"
            key={index + ' image'}
            className="flex max-w-[400px] w-full h-auto object-contain hover:scale-[1.4] transition-all duration-[5000ms] out-expo"
            style={{
              backgroundImage:
                _id == 'kyk_electric'
                  ? 'linear-gradient(to bottom right,  #e2e8f0, #d6d3d1 90%)'
                  : 'linear-gradient(to bottom right,  #171717, #1e293b 90%)',
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default memo(ImageBoxes);
