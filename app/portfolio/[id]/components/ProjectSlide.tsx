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
      spaceBetween={
        screenWidth <= 450
          ? 10
          : screenWidth <= 610
          ? 15
          : screenWidth <= 769
          ? 15
          : screenWidth <= 1030
          ? 20
          : screenWidth <= 1250
          ? 25
          : 32
      }
      loop
      slidesPerView={"auto"}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      speed={1200}
      className="w-full cursor-none"
    >
      {Items.map((item, index) => (
        <SwiperSlide
          className="w-auto lg:max-w-[380px] max-w-[300px] h-auto "
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
