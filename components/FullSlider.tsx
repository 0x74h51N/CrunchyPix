import React, { useRef, useState } from "react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import ArrowButton from "./Button";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/effect-creative";

const FullScreenSlider = () => {
  const progressCircle = useRef<HTMLDivElement | null>(null);
  const progressContent = useRef<HTMLDivElement | null>(null);
  const [slideActiveIndexes, setSlideActiveIndexes] = useState([0, 1]);
  const slides = [
    {
      imageUrl: "/slider-0.jpg",
      title: "Unleash the Power of Web Innovation",
      description:
        "We're your trusted partner in web development. Our mission is to bring your digital dreams to life. Let's create something amazing together!",
    },
    {
      imageUrl: "/slide-1_.jpg",
      title: "Unleash the Power of Web Innovation",
      description:
        "We're your trusted partner in web development. Our mission is to bring your digital dreams to life. Let's create something amazing together!",
    },
  ];
  const onSlideChange = (swiper: any) => {
    setSlideActiveIndexes([swiper.activeIndex]);
  };
  const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
    if (progressCircle.current && progressContent.current) {
      progressCircle.current.style.setProperty(
        "--progress",
        String(1 - progress)
      );
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };
  return (
    <>
      <Swiper
        cssMode={true}
        navigation={true}
        loop
        centeredSlides={true}
        autoplay={{
          delay: 12000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Autoplay, Pagination]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="w-full h-full flex flex-center justify-center  text-center bg-stone-900"
      >
        {slides.map((slide, index) => (
          <div key={index}>
            <SwiperSlide>
              <div className="h-full">
                <Image
                  src={slide.imageUrl}
                  alt={"Image"}
                  layout="fill"
                  objectFit="cover"
                  loading="lazy"
                  className="z-0"
                ></Image>
                <div
                  className="animate-slideLeft opacity-0 absolute bottom-24 right-0 w-auto h-auto flex flex-col justify-center items-center bg-stone-700 bg-opacity-10 rounded-bl-xl rounded-tl-xl hover:bg-opacity-60 hover:transition-opacity duration-300 z-30 px-24 py-14 backdrop-blur-sm"
                  style={{
                    display: slideActiveIndexes.includes(index)
                      ? "block"
                      : "none",
                  }}
                >
                  <p className="text-start text-stone-200 text-xl font-medium">
                    {slide.title}
                  </p>
                  <p className="text-start text-stone-200 text-l font-normal mt-2 max-w-sm">
                    {slide.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          </div>
        ))}
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
