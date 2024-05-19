import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import SwiperCore from "swiper";
import PortfolioItem from "./PortfolioItem";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { PortfolioItemProps } from "@/app/common.types";
import { useRef, useEffect } from "react";
import "swiper/css";

SwiperCore.use([Autoplay, Pagination]);

const ProjectSlide = ({ Items }: { Items: PortfolioItemProps[] }) => {
  const screenWidth = useSelector((state: RootState) => state.screenWidth.width);
  const swiperRef = useRef<SwiperCore | null>(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.update();
    }
  }, []);
  return (
    <Swiper
      onInit={(swiper) => (swiperRef.current = swiper)}
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
      {Items.map((item) => (
        <SwiperSlide
          className="w-auto lg:max-w-[380px] max-w-[300px] h-auto"
          key={`${item._id}-slide`}
        >
          <PortfolioItem
            _id={item._id}
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
