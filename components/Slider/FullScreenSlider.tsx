import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ArrowButton from "../ArrowButton";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/effect-creative";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const FullScreenSlider = () => {
  const { t } = useTranslation(["translation"]);
  const [activeIndex, setActiveIndex] = useState(0);
  const onSlideChange = (swiper: any) => {
    setActiveIndex(swiper.realIndex);
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      setActiveIndex(0);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <>
      <Swiper
        cssMode={true}
        navigation={true}
        loop
        centeredSlides={true}
        onSlideChange={onSlideChange}
        autoplay={{
          delay: 15000,
          disableOnInteraction: false,
        }}
        speed={5000}
        modules={[Navigation, Autoplay, Pagination]}
        className="w-full h-full flex flex-center justify-center  text-center bg-stone-900"
      >
        <SwiperSlide>
          <Image
            src={"/slider-0.jpg"}
            alt={"Image"}
            layout="fill"
            objectFit="cover"
            loading="lazy"
            className="z-0"
          ></Image>
          {activeIndex === 0 && (
            <motion.div
              className={`
         absolute bottom-24 boxStyle flex flex-col px-24 py-14 bg-stone-900 w-auto h-auto bg-opacity-30  hover:bg-opacity-60 rounded-br-xl rounded-tr-xl`}
              initial={{ opacity: 0, x: "-100%" }}
              transition={{ delay: 0.5, duration: 1 }}
              animate={{ opacity: 1, x: "0%" }}
              whileHover={{ scale: 1.1 }}
            >
              <p className="text-start text-stone-200 text-xl font-medium">
                {t("slides.0.title")}
              </p>
              <p className="text-start text-stone-200 text-l font-normal mt-2 max-w-sm">
                {t("slides.0.description")}
              </p>
            </motion.div>
          )}
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={"/slide-1_.jpg"}
            alt={"Image"}
            layout="fill"
            objectFit="cover"
            loading="lazy"
            className="z-0"
          ></Image>
          {activeIndex === 1 && (
            <motion.div
              className={`
         absolute right-0 bottom-24 boxStyle flex flex-col px-24 py-14 bg-stone-900 w-auto h-auto bg-opacity-30 hover:bg-opacity-60 rounded-bl-xl rounded-tl-xl`}
              initial={{ opacity: 0, x: "100%" }}
              transition={{ delay: 0.5, duration: 1 }}
              animate={{ opacity: 1, x: "0%" }}
              whileHover={{ scale: 1.1 }}
            >
              <p className="text-start text-stone-200 text-xl font-medium">
                {t("slides.1.title")}
              </p>
              <p className="text-start text-stone-200 text-l font-normal mt-2 max-w-sm">
                {t("slides.1.description")}
              </p>
            </motion.div>
          )}
        </SwiperSlide>
        <div className="absolute  bottom-0 w-full items-center z-30">
          <ArrowButton
            index={1}
            arrow={true}
            className="opacity-50 hover:opacity-100 transition-opacity animate-my-bounce-slow z-10"
          />
        </div>
      </Swiper>
    </>
  );
};

export default FullScreenSlider;
