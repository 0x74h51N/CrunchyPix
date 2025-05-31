import CancelButton from '@/components/Buttons/CancelButton';
import IconButton from '@/components/Buttons/IconButton';
import Loading from '@/components/Loading/Loading';
import LogoImage from '@/components/LogoImage';
import useClickableHandlers from '@/hooks/useClickableHandlers';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { PortfolioItemProps } from '@/lib/schemas';
import { AnimatePresence, motion } from 'framer-motion';
import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const SlideModal = ({
  setState,
  selectedSlide,
}: {
  setState: React.Dispatch<
    React.SetStateAction<PortfolioItemProps | undefined>
  >;
  selectedSlide: PortfolioItemProps;
}) => {
  const { t } = useTranslation(['portfolio']);
  const [imageLoading, setImageLoading] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);

  const id =
    selectedSlide && selectedSlide._id.toLowerCase().replace(/\s+/g, '');
  const { handleMouseEnter, handleMouseLeave } = useClickableHandlers();

  const closeModal = () => {
    if (modalRef.current) {
      setState(undefined);
      setTimeout(() => {
        setImageLoading(true);
      }, 300);
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  };

  useOutsideClick(modalRef as React.RefObject<HTMLDivElement>, closeModal);

  return (
    <AnimatePresence>
      {selectedSlide && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-filter backdrop-blur-lg">
          <div
            ref={modalRef}
            className="absolute flex justify-center items-center top-1/2 left-1/2 lg:h-auto xsm:h-[70vh] h-[65vh] xl:w-[75vw] md:[85vw] w-[95vw] translate-x-[-50%] translate-y-[-50%] outline-none"
          >
            <motion.div
              className="relative flex justify-center lg:h-auto h-full w-full max-w-[1900px]"
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
                  opacity: imageLoading ? 0 : 100,
                }}
                quality="auto"
                className="w-full h-full object-cover"
                onLoad={() => {
                  setImageLoading(false);
                }}
              />
              {imageLoading ? (
                <div className="z-40">
                  <Loading />
                </div>
              ) : (
                <div className="absolute bottom-0 bg-black/50 w-full p-4 text-stone-200">
                  {selectedSlide.project_overview && (
                    <>
                      <h2 className="text-lg font-bold">
                        {selectedSlide.project_overview[0].title}
                      </h2>
                      <p className="font-extralight overflow-hidden md:text-[13px] text-[10px] md:line-clamp-3 line-clamp-2">
                        {selectedSlide.project_overview[0].slide_description}
                      </p>
                    </>
                  )}
                  <Link
                    href={`/portfolio/${id}`}
                    key={'portfolio'}
                    data-tip={t('projectSlides.title2')}
                    className="font-extralight hover:text-log-col underline underline-offset-2 cursor-none md:text-[13px] text-[10px] tooltip tooltip-right"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {t('projectSlides.click')}
                  </Link>
                  <div className="flex mt-2">
                    <div className="flex flex-wrap items-start mr-auto">
                      {selectedSlide.tech &&
                        selectedSlide.tech.map(
                          (label: string, labelIndex: number) => (
                            <div
                              className="w-6 h-6 flex flex-row mr-1"
                              key={`tech key ${label + labelIndex}`}
                            >
                              <LogoImage logoKey={label} index={labelIndex} />
                            </div>
                          ),
                        )}
                    </div>
                    <div className="flex items-end gap-2">
                      {selectedSlide.icons &&
                        Object.entries(selectedSlide.icons).map(
                          ([key, icon], iconIndex) => (
                            <span
                              key={iconIndex}
                              className="lg:text-2xl text-xl hover:text-log-col"
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
