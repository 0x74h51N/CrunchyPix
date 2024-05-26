import { RootState } from "@/store";
import { clearSlide } from "@/store/redux/selectedSlide";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@/components/Buttons/IconButton";
import Label from "@/components/Labels";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Loading from "@/components/Loading";
import Link from "next/link";
import CancelButton from "@/components/Buttons/CancelButton";
import { sliderChange } from "@/store/redux/isSlider";

const SlideModal = () => {
  const dispatch = useDispatch();
  const [imageLoading, setImageLoading] = useState(true);
  const { t } = useTranslation(["portfolio"]);
  const isMobile = useSelector((state: RootState) => state.isMobile.mobile);
  const isSlider = useSelector((state: RootState) => state.isSlider.slider);
  const selectedSlide = useSelector(
    (state: RootState) => state.selectedSlide.selectedSlide
  );
  const id =selectedSlide && selectedSlide._id.toLowerCase().replace(/\s+/g, "");
  const [blurDataURL, setBlurDataURL] = useState<string>("");
  const scrollPosition = useSelector((state: RootState) => state.scrollSlice.scrollPosition);
  useEffect(() => {
    async function fetchBlurDataURL() {
      if (selectedSlide && selectedSlide.slideImage) {
        const response = await fetch(`/api/blur-placeholder?image=${encodeURIComponent(selectedSlide.slideImage)}`);
        const data = await response.json();
        setBlurDataURL(data.blurDataURL);
      }
    }
    fetchBlurDataURL();
  }, [selectedSlide]);

  useEffect(()=>{
    closeModal();
  }, [scrollPosition])

  const closeModal = () => {
    dispatch(clearSlide());
    setBlurDataURL("");
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
              onClick={closeModal}
            >
              <button
                onClick={closeModal}
                className="absolute -top-2 -right-4 z-40 cursor-none"
              >
                <CancelButton />
              </button>
              {blurDataURL && <Image
                loading="lazy"
                src={selectedSlide.slideImage || ""}
                alt={selectedSlide.title || ""}
                width={1800}
                height={1800}
                style={{ objectFit: isMobile ? "cover" : "contain", opacity: imageLoading ? 0:100}}
                quality={100}
                className="w-full h-full"
                placeholder="blur"
                blurDataURL={blurDataURL}
                onLoad={() => {
                  setImageLoading(false);
                }}
              />}
              {imageLoading && blurDataURL && (
                <img
                  src={blurDataURL}
                  alt={`${selectedSlide.title}-blur`}
                  style={{ objectFit: isMobile ? "cover" : "contain"}}
                  className="absolute w-full h-full"
                />
              )}
              {imageLoading ? (
                <div className="z-40"><Loading /></div>
              ) : (
                <div className="absolute bottom-0 bg-black bg-opacity-50 w-full p-4 text-stone-200">
                  <h2 className="text-lg font-bold">
                    {t(`${selectedSlide.title}`)}
                  </h2>
                  <p
                    className={`font-extralight overflow-hidden ${
                      isMobile ? "text-[10px]" : "text-[13px]"
                    }`}
                  >
                    {t(`${selectedSlide.slideDescription}`)}
                  </p>
                  <Link
                    href={`/portfolio/${id}`}
                    key={"portfolio"}
                    title={t("projectSlides.title2")}
                    className={`font-extralight hover:text-log-col underline underline-offset-2 cursor-none ${
                      isMobile ? "text-[10px]" : "text-[13px]"
                    } `}
                    onClick={onClickHandler}
                  >
                    {t("projectSlides.click")}
                  </Link>
                  <div className="flex">
                    <div className="flex flex-wrap items-start mr-auto">
                      {selectedSlide.labels &&
                        selectedSlide.labels.map((label, labelIndex) => (
                          <Label key={labelIndex} text={label} />
                        ))}
                    </div>
                    <div className="flex items-end gap-2">
                      {selectedSlide.icons &&
                        selectedSlide.icons.map((icon, iconIndex) => (
                          <span
                            key={iconIndex}
                            className="hover:text-log-col transition-all ease-in-out duration-300 text-cool-gray-50 lg:text-2xl text-xl"
                          >
                            <IconButton key={iconIndex} icon={icon} />
                          </span>
                        ))}
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
