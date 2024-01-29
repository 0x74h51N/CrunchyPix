import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import PortfolioItem from "../../components/PortfolioItem";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
import { PortfolioItemProps } from "@/app/common.types";

const ProjectSlide = ({ Items }: { Items: PortfolioItemProps[] }) => {
  const screenWidth = useSelector(
    (state: RootState) => state.screenWidth.width
  );
  const [_, setInit] = useState(false);
  const isTranslationsLoadedRedux = useSelector(
    (state: RootState) => state.language.isTranslationsLoaded
  );
  useEffect(() => {
    if (isTranslationsLoadedRedux) {
      setInit(true);
    }
  }, [isTranslationsLoadedRedux]);

  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      centeredSlides={true}
      pagination={{
        dynamicBullets: true,
        clickable: true,
      }}
      slidesPerView={
        screenWidth <= 450
          ? 1
          : screenWidth <= 610
          ? 1.3
          : screenWidth <= 769
          ? 1.8
          : screenWidth <= 1030
          ? 2.2
          : screenWidth <= 1250
          ? 2.5
          : 3
      }
      initialSlide={1}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      speed={1000}
      loop
      onInit={() => setInit(true)}
      className="w-full h-full cursor-none"
    >
      {Items.map((item, index) => (
        <SwiperSlide key={index}>
          <PortfolioItem
            _id={item._id}
            key={index}
            image={item.image}
            imageAlt={item.imageAlt}
            title={item.title}
            projectType={item.projectType}
            slideImage={""}
            slideDescription={""}
            width={screenWidth <= 1030 ? 300 : 370}
            height={screenWidth <= 1030 ? 250 : 290}
            isSlide={true}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProjectSlide;
