"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css";
const LogoSlider = () => {
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
      slidesPerView={11}
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
          <div className="w-auto h-[84px] flex justify-center">
            <img
              src={item.icon}
              alt={item.text}
              className="h-auto w-[84px] grayscale"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default LogoSlider;
