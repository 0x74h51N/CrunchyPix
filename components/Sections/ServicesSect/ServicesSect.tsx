"use client";
import CardMaker from "@/components/CardMaker";
import { Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { generateSpans } from "@/components/GenerateSpans";
import { RootState } from "@/store";
import { polygonIn, slideIn } from "@/utils/motion";
import { useTranslation } from "@/hooks/useTranslation";
import { useSelector, useDispatch } from "react-redux";
import { servicesSectCards } from "@/constants/servicesSectCards";
import { sliderChange } from "@/store/redux/isSlider";
import { clickableChange } from "@/store/redux/isClickable";

const ServicesSect = () => {
  const { t } = useTranslation("home");
  const isMobile = useSelector((state: RootState) => state.isMobile.mobile);
  const isTablet = useSelector((state: RootState) => state.isTablet.tablet);
  const dispatch = useDispatch();
  const isClickable = useSelector(
    (state: RootState) => state.isClickable.clickable
  );

  const pagination = {
    el: ".custom-pagy",
    clickable: true,
  };
  const navigation = {
    nextEl: ".swiper-button-next-cus",
    prevEl: ".swiper-button-prev-cus",
  };

  const hoverStart = () => {
    dispatch(sliderChange(true));
  };
  const hoverEnd = () => {
    dispatch(sliderChange(false));
  };
  const handleMouseEnter = () => {
    if (isClickable == false) {
      dispatch(clickableChange(true));
    }
  };
  const handleMouseLeave = () => {
    if (isClickable == true) {
      dispatch(clickableChange(false));
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}      
      className="flex justify-center items-center w-full h-full min-h-[100svh]"
    >
      <motion.div
        variants={polygonIn("screen", "spring", 0.7, 2.2)}
        className="flex flex-col items-start h-full w-auto md:p-16 xs:p-6 p-4 z-10 mt-14 rounded-lg 2xl:ml-36 bg-neutral-900 shadow-lg relative"
      >
        <motion.h1 variants={slideIn("left", "spring", 1.3, 1)}>
          <div className="h2 max-sm:ml-4">
            {isMobile || isTablet
              ? t("servicesSect.intro")
              : generateSpans({
                  text: t("servicesSect.intro"),
                  colorType: "vibrantColors",
                  zeroColor: "#909090",
                })}
          </div>
          <div className="h1 mb-2 max-sm:ml-4">
            {isMobile || isTablet
              ? t("servicesSect.title")
              : generateSpans({
                  text: t("servicesSect.title"),
                  colorType: "vibrantColors",
                })}
          </div>
        </motion.h1>
        <motion.div
          className="flex flex-wrap justify-center gap-8 w-auto relative"
          onHoverStart={hoverStart}
          onHoverEnd={hoverEnd}
        >
            <Swiper
              modules={[Pagination, Navigation]}
              slidesPerView={isMobile ? 1.2 : isTablet ? 1.8 : 3}
              spaceBetween={30}
              centeredSlides
              initialSlide={1}
              loop
              pagination={pagination}
              navigation={navigation}
              className="2xl:w-[1030px] lg:w-[900px] md:w-[680px] w-[340px] h-auto cursor-none"
            >
              {servicesSectCards.map((section, index) => (
                <SwiperSlide key={index} className="w-[300px] h-auto ">
                  <CardMaker
                    key={index}
                    cardSections={section}
                    cardWidth={320}
                    cardHeight={520}
                    className="cursor-none"
                    translatePath="home"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
        </motion.div>
        <div className="absolute swiper-button-next-cus top-10 right-1 h-full w-[50px] bg- z-50 ">
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="swiper-button-next"
          />
        </div>
        <div className="absolute swiper-button-prev-cus top-10 left-1 h-full w-[50px] bg- z-50 ">
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="swiper-button-prev"
          />
        </div>
      </motion.div>
      <motion.div
        variants={polygonIn("down", "spring", 0.7, 2.2)}
        className="custom-pagy absolute cursor-none left-0 bottom-0 z-30 flex 2xl:flex-col flex-row justify-center items-center h-auto 2xl:min-h-[100svh] 
        w-full 2xl:max-w-[180px] 2xl:bg-neutral-900 2xl:p-40 p-10 2xl:gap-8 gap-4"
      />
    </motion.div>
  );
};

export default ServicesSect;
