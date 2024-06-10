'use client';
import { motion } from 'framer-motion';
import { CldImage } from 'next-cloudinary';
import TitleText from '../TitleText';

const IntroductionSect = () => {
  return (
    <div className="flex flex-row items-center justify-center max-2xl:gap-10 lg-gap-auto h-auto p-24 max-md:px-1 max-md:py-18 bg-cool-gray-800 md:rounded-3xl gap-12 max-sm:flex-col max-lg:gap-6">
      <CldImage
        src="crunchypix/headColor.png"
        alt="Photo"
        quality={100}
        width={250}
        height={250}
        loading="lazy"
        className="object-center bg-opacity-0 grayscale w-auto max-lg:w-[230px] max-md:w-[200px] h-auto z-30"
      />
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        className="flex flex-col items-start h-full w-auto p-5 z-10"
      >
        <TitleText sectName={'introduction_sect'} />
      </motion.div>
    </div>
  );
};

export default IntroductionSect;
