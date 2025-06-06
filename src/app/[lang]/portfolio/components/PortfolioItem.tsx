import { RootState } from '@/store';
import { slideIn } from '@/utils/motion';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CldImage } from 'next-cloudinary';
import { PortfolioItemProps } from '@/lib/schemas';
import useClickableHandlers from '@/hooks/useClickableHandlers';
import { FaAnglesRight } from 'react-icons/fa6';
import { usePathname } from 'next/navigation';

const areEqual = (
  prevProps: PortfolioItemInterface,
  nextProps: PortfolioItemInterface,
) => {
  return (
    prevProps._id === nextProps._id &&
    prevProps.project_overview === nextProps.project_overview &&
    prevProps.width === nextProps.width &&
    prevProps.height === nextProps.height &&
    prevProps.isSlide === nextProps.isSlide
  );
};

interface PortfolioItemInterface extends PortfolioItemProps {
  width?: string;
  height?: string;
  isSlide: boolean;
}

const PortfolioItem = memo(
  ({
    _id,
    project_overview = [],
    width,
    height,
    isSlide,
  }: PortfolioItemInterface) => {
    const isTouch = useSelector((state: RootState) => state.isTouch.touch);
    const mobileWidth = isSlide ? '300px' : '350px';
    const id = _id.toLowerCase().replace(/\s+/g, '');
    const route = usePathname();
    const locale = route.split('/')[1];
    useEffect(() => {
      if (!project_overview) {
        console.warn('Project overview is undefined or missing');
      }
    }, [project_overview]);
    const { handleMouseEnter, handleMouseLeave } = useClickableHandlers();

    return (
      <div
        className={`relative flex flex-col items-center justify-between rounded-xl overflow-hidden ${isSlide ? 'md:h-[250px] mt-[25px]' : `md:w-[${width}] w-[${mobileWidth}] md:h-[550px] h-[345px] mt-0`}`}
      >
        <motion.div
          initial="hidden"
          whileHover="show"
          whileTap={'show'}
          className={`group relative flex justify-center items-center rounded-xl bg-gradient-to-br to-cool-gray-700 from-slate-800 z-10 ${isSlide ? 'lg:w-[380px] w-[300px] lg:h-[310px] h-[250px]' : `md:w-[${width}] w-[${mobileWidth}] h-auto md:h-[${height}]`} `}
        >
          <CldImage
            src={`crunchypix/portfolioItems/${_id.replaceAll('_', '')}`}
            alt={_id}
            format="avif"
            quality="auto"
            fetchPriority="high"
            width={900}
            height={900}
            className={`object-cover object-center rounded-xl  ${isSlide ? 'md:h-[250px]' : 'md:h-full md:min-h-[450px]'} w-full h-[280px]`}
          />

          <div className="absolute w-full h-full  group-hover:backdrop-filter group-hover:backdrop-blur-sm bg-black/0 group-hover:bg-black/30 transition-all duration-500 ease-in-out rounded-xl " />
          {isTouch || isSlide ? (
            <Link
              href={`/${locale}/portfolio/${id}`}
              className="absolute cursor-none w-full h-full"
            />
          ) : (
            <>
              <motion.div
                variants={slideIn('up', 'spring', 0.2, 0.75)}
                className="absolute flex justify-center items-center rounded-full bg-log-col opacity-0 group-hover:opacity-70 w-[70px] h-[70px]"
              >
                <Link
                  href={`/${locale}/portfolio/${id}`}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="cursor-none bg-log-col w-[70px] h-[70px] rounded-full flexCenter"
                >
                  <FaAnglesRight className="text-white text-2xl -rotate-45" />
                </Link>
              </motion.div>
            </>
          )}
        </motion.div>
        <div
          className={`absolute bottom-0 rounded-b-xl z-10 w-full flex justify-start ${
            isSlide
              ? 'left-0 bg-black/50 h-auto'
              : 'md:-bottom-4 -bottom-2 md:h-32 h-22'
          }`}
        >
          {project_overview && project_overview.length > 0 && (
            <Link
              href={`/portfolio/${id}`}
              passHref
              className="flex flex-col justify-center w-auto md:p-4 p-2 text-stone-200 cursor-none"
            >
              <h2 className="md:text-sm text-xs text-log-col">
                {project_overview[0].project_type}
              </h2>
              <h1
                className={`${
                  isSlide
                    ? 'h2'
                    : 'text-cool-gray-50 font-black md:text-[40px] sm:text-[30px] xs:text-[28px] text-[25px] antialiased'
                } hover:text-log-col transition-all duration-300 ease-in-out`}
              >
                {project_overview[0].title}
              </h1>
            </Link>
          )}
        </div>
      </div>
    );
  },
  areEqual,
);
PortfolioItem.displayName = 'PortfolioItem';
export default PortfolioItem;
