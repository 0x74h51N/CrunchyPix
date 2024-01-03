"use client";
import CardMaker from "@/components/CardMaker";
import { Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { generateSpans } from "@/components/GenerateSpans";
import { RootState } from "@/store";
import { setIsTranslationsLoaded } from "@/store/redux/language";
import { polygonIn, slideIn } from "@/utils/motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { servicesSectCards } from "@/constants/servicesSectCards";
import { sliderChange } from "@/store/redux/isSlider";

const ServicesSect = () => {
  const [_, setInit] = useState(false);
  const { t, i18n } = useTranslation(["home"]);
  const isTranslationsLoadedRedux = useSelector(
    (state: RootState) => state.language.isTranslationsLoaded
  );
  const isMobile = useSelector((state: RootState) => state.isMobile.mobile);
  const isTablet = useSelector((state: RootState) => state.isTablet.tablet);
  const dispatch = useDispatch();

  useEffect(() => {
    if (i18n.isInitialized) {
      dispatch(setIsTranslationsLoaded(true));
    } else {
      i18n.on("initialized", () => {
        dispatch(setIsTranslationsLoaded(true));
      });
    }
  }, [i18n, dispatch]);

  useEffect(() => {
    if (isTranslationsLoadedRedux) {
      setInit(true);
    }
  }, [isTranslationsLoadedRedux]);

  const pagination = {
    el: ".custom-pagy",
    clickable: true,
  };

  const hoverStart = () => {
    dispatch(sliderChange(true));
  };
  const hoverEnd = () => {
    dispatch(sliderChange(false));
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        className="flex flex-col items-start h-full w-auto p-16 z-10"
      >
        <motion.h1 variants={slideIn("left", "spring", 0.5, 1)}>
          <div
            className="text-cool-gray-200 font-medium lg:text-[30px] sm:text-[26px] 
          xs:text-[20px] text-[16px] lg:leading-[40px]"
          >
            {isMobile || isTablet
              ? t("servicesSect.intro")
              : generateSpans({
                  text: t("servicesSect.intro"),
                  colorType: "vibrantColors",
                  zeroColor: "#737373",
                })}
          </div>
          <div className="text-cool-gray-50 font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] mb-2">
            {isMobile || isTablet
              ? t("servicesSect.title")
              : generateSpans({
                  text: t("servicesSect.title"),
                  colorType: "vibrantColors",
                })}
          </div>
        </motion.h1>
        <motion.div
          variants={polygonIn("down", "spring", 1, 2)}
          className="flex flex-wrap justify-center gap-8 w-auto bg-cool-gray-800 p-16 rounded-xl"
          onHoverStart={hoverStart}
          onHoverEnd={hoverEnd}
        >
          {isTranslationsLoadedRedux && (
            <Swiper
              modules={[Pagination]}
              slidesPerView={isMobile ? 1 : isTablet ? 2.5 : 3}
              spaceBetween={30}
              centeredSlides
              initialSlide={1}
              loop
              pagination={pagination}
              onInit={() => setInit(true)}
              className="2xl:w-[1030px] lg:w-[900px] md:w-[750px] w-[340px] h-auto cursor-none"
            >
              {servicesSectCards.map((section, index) => (
                <SwiperSlide key={index} className="w-[330px] h-auto ">
                  <CardMaker
                    key={index}
                    cardSections={section}
                    cardWidth={330}
                    cardHeight={520}
                    className="cursor-none"
                    translatePath="home"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </motion.div>
      </motion.div>
      <div
        className="custom-pagy absolute cursor-none left-0 bottom-0 z-30 flex 2xl:flex-col flex-row justify-center items-center h-auto 2xl:min-h-[100svh] 
      w-full 2xl:max-w-[180px] 2xl:bg-cool-gray-800 2xl:p-40 p-10 2xl:gap-8 gap-4"
      />
    </div>
  );
};

export default ServicesSect;
