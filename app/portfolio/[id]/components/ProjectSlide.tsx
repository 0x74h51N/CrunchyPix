import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import SwiperCore from "swiper";
import PortfolioItem from "../../components/PortfolioItem";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
import { PortfolioItemProps } from "@/app/common.types";

const ProjectSlide = ({ Items }: { Items: PortfolioItemProps[] }) => {
  SwiperCore.use([Autoplay, Pagination]);
  const screenWidth = useSelector(
    (state: RootState) => state.screenWidth.width
  );
  return (
    <Swiper
      centeredSlides={true}
      modules={[Pagination, Autoplay]}
      pagination={{
        dynamicBullets: true,
        clickable: true,
      }}
      spaceBetween={35}
      loop
      slidesPerView={
        screenWidth <= 450
          ? 1
          : screenWidth <= 610
          ? 1.5
          : screenWidth <= 769
          ? 2
          : screenWidth <= 1030
          ? 2.2
          : screenWidth <= 1250
          ? 2.5
          : 3
      }
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      speed={1000}
      className="w-full cursor-none flex items-center justify-center"
    >
      {Items.map((item, index) => (
        <SwiperSlide
          className="w-auto md:max-w-[400px] max-w-[300px]"
          key={index}
        >
          <PortfolioItem
            _id={item._id}
            key={index}
            image={item.image}
            imageAlt={item.imageAlt}
            title={item.title}
            projectType={item.projectType}
            slideImage={""}
            slideDescription={""}
            width={screenWidth <= 1030 ? 300 : 380}
            height={screenWidth <= 1030 ? 250 : 310}
            isSlide={true}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProjectSlide;
