import IconButton from '@/components/Buttons/IconButton';
import LogoImage from '@/components/LogoImage';
import useDragHandler from '@/hooks/useDragHandler';
import { PortfolioItemProps } from '@/schemas';
import { setSlide } from '@/store/redux/selectedSlide';
import { CldImage } from 'next-cloudinary';
import React, { memo } from 'react';
import { useDispatch } from 'react-redux';

const SlideMaker = ({
  slide,
  index,
  activeIndex,
}: {
  slide: PortfolioItemProps;
  index: number;
  activeIndex: number;
}) => {
  const { hoverEnd } = useDragHandler();
  const dispatch = useDispatch();
  const _selectedSlide = (_slide: PortfolioItemProps) => {
    dispatch(setSlide(_slide));
    hoverEnd();
  };

  const clickHandler = (index: number, slide: PortfolioItemProps) => {
    if (index === activeIndex) {
      _selectedSlide(slide);
    }
  };
  return (
    <div
      key={`${index}-${slide._id}-slide`}
      className={`relative md:w-[640px] w-auto 2xl:w-[1020px] xl:w-[850px] lg:w-[750px] max-md:h-[450px] h-auto overflow-visible shadow-xl shadow-black mt-6`}
      onClick={() => clickHandler(index, slide)}
    >
      <CldImage
        src={`crunchypix/PortfolioSlides/${slide._id}` || ''}
        alt={slide._id}
        width="1000"
        height="1000"
        className="object-cover w-full h-full"
        quality="auto"
        fetchPriority="auto"
      />
      <div className="absolute bottom-0 bg-black bg-opacity-50 w-full p-4 text-stone-200">
        <h2 className="text-lg font-bold">
          {slide.project_overview && slide.project_overview[0].title}
        </h2>
        <div className="flex">
          <div className="flex items-start mr-auto grayscale">
            {slide.tech &&
              slide.tech.map((label: string, labelIndex: number) => (
                <div
                  className="w-5 h-5 flex flex-row mr-1"
                  key={`tech key ${label + index}`}
                >
                  <LogoImage logoKey={label} index={labelIndex} />
                </div>
              ))}
          </div>
          <div className="flex items-end gap-2">
            {slide.icons &&
              Object.entries(slide.icons).map(([key, icon], iconIndex) => (
                <span
                  key={`${slide._id}-${iconIndex}-icon`}
                  className="lg:text-2xl text-xl"
                >
                  <IconButton key={`icon-${index}-${key}`} icon={icon} />
                </span>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(SlideMaker);
