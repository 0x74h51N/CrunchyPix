"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
const LogoSlider = () => {
  const isMobile = useSelector((state: RootState) => state.isMobile.mobile);
  const isTablet = useSelector((state: RootState) => state.isTablet.tablet);
  const icons = [
    { icon: "/html.svg", text: "HTML" },
    { icon: "/css.svg", text: "CSS" },
    { icon: "/javascript.svg", text: "JavaScript" },
    { icon: "/typescript.svg", text: "TypeScript" },
    { icon: "/react.svg", text: "React" },
    { icon: "/nextjs.svg", text: "Next.js" },
    { icon: "/redux.svg", text: "Redux" },
    { icon: "/bootstrap.svg", text: "Bootstrap" },
    { icon: "/nodejs.svg", text: "Node.js" },
    { icon: "/git.svg", text: "Git" },
    { icon: "/tailwind.svg", text: "Tailwind" },
    { icon: "/figma.svg", text: "Figma" },
    { icon: "/photoshop.svg", text: "Photoshop" },
  ];
  SwiperCore.use([Autoplay, Pagination]);
  return (
    <Swiper
      spaceBetween={0}
      centeredSlides
      slidesPerView={isMobile ? 6 : isTablet ? 9 : 11}
      grabCursor
      loop
      pagination={{ clickable: true }}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      speed={1000}
      className="w-full h-auto "
    >
      {icons.map((item, index) => (
        <SwiperSlide key={index}>
          <div className="w-[84px] h-[84px] max-lg:w-[70px] max-lg:h-[70px] max-sm:w-[55px] max-sm:h-[55px] flex justify-center">
            <img
              src={item.icon}
              alt={item.text}
              className="h-auto w-full grayscale"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default LogoSlider;
