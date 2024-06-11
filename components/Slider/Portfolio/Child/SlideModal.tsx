import { RootState } from '@/store';
import { clearSlide } from '@/store/redux/selectedSlide';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@/components/Buttons/IconButton';
import Label from '@/components/Labels';
import { motion, AnimatePresence } from 'framer-motion';
import Loading from '@/components/Loading/Loading';
import Link from 'next/link';
import CancelButton from '@/components/Buttons/CancelButton';
import { sliderChange } from '@/store/redux/isSlider';
import { CldImage } from 'next-cloudinary';
import { useTranslation } from 'react-i18next';

const SlideModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation(['portfolio']);
  const [imageLoading, setImageLoading] = useState(true);

  const isMobile = useSelector((state: RootState) => state.isMobile.mobile);
  const isSlider = useSelector((state: RootState) => state.isSlider.slider);
  const selectedSlide = useSelector(
    (state: RootState) => state.selectedSlide.selectedSlide,
  );
  const id =
    selectedSlide && selectedSlide._id.toLowerCase().replace(/\s+/g, '');

  const closeModal = () => {
    dispatch(clearSlide());
    setTimeout(() => {
      setImageLoading(true);
    }, 300);
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  };

  const onClickHandler = () => {
    if (isSlider === true) {
      dispatch(sliderChange(false));
    }
  };

  useEffect(() => {
    const scrollHandler = () => {
      closeModal();
    };
    if (selectedSlide) {
      document.addEventListener('scroll', scrollHandler);
    } else {
      document.removeEventListener('scroll', scrollHandler);
    }
    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, [selectedSlide, clearSlide]);
  return (
    <AnimatePresence>
      {selectedSlide && (
        <div
          className="fixed inset-0 flex items-center justify-center backdrop-filter backdrop-blur-lg"
          onClick={closeModal}
        >
          <div
            className={`absolute flex justify-center items-center top-1/2 left-1/2  md:w-[70svw] md:h-[63svh] w-[95svw] h-[65svh] translate-x-[-50%] translate-y-[-50%] outline-none`}
          >
            <motion.div
              className="relative flex justify-center md:h-auto h-full w-full max-w-[1900px]"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={modalVariants}
            >
              <button
                onClick={closeModal}
                className="absolute -top-2 -right-4 z-40 cursor-none"
              >
                <CancelButton />
              </button>
              <CldImage
                priority
                src={`crunchypix/PortfolioSlides/${selectedSlide._id}.png`}
                alt={selectedSlide._id || ''}
                width={1800}
                height={1800}
                style={{
                  objectFit: isMobile ? 'cover' : 'contain',
                  opacity: imageLoading ? 0 : 100,
                }}
                quality="auto"
                className="w-full h-full"
                onLoad={() => {
                  setImageLoading(false);
                }}
              />
              {imageLoading ? (
                <div className="z-40">
                  <Loading />
                </div>
              ) : (
                <div className="absolute bottom-0 bg-black bg-opacity-50 w-full p-4 text-stone-200">
                  <h2 className="text-lg font-bold">
                    {selectedSlide.project_overview[0].title}
                  </h2>
                  <p
                    className={`font-extralight overflow-hidden ${
                      isMobile ? 'text-[10px]' : 'text-[13px]'
                    }`}
                  >
                    {selectedSlide.project_overview[0].slide_description}
                  </p>
                  <Link
                    href={`/portfolio/${id}`}
                    key={'portfolio'}
                    title={t('projectSlides.title2')}
                    className={`font-extralight hover:text-log-col underline underline-offset-2 cursor-none ${
                      isMobile ? 'text-[10px]' : 'text-[13px]'
                    } `}
                    onClick={onClickHandler}
                  >
                    {t('projectSlides.click')}
                  </Link>
                  <div className="flex">
                    <div className="flex flex-wrap items-start mr-auto">
                      {selectedSlide.tech &&
                        selectedSlide.tech.map(
                          (label: string, labelIndex: number) => (
                            <Label key={`label-${labelIndex}`} text={label} />
                          ),
                        )}
                    </div>
                    <div className="flex items-end gap-2">
                      {selectedSlide.icons &&
                        Object.entries(selectedSlide.icons).map(
                          ([key, icon], iconIndex) => (
                            <span
                              key={iconIndex}
                              className="lg:text-2xl text-xl"
                            >
                              <IconButton key={`icon-${key}`} icon={icon} />
                            </span>
                          ),
                        )}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SlideModal;
