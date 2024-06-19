import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import SwiperCore from 'swiper';
import PortfolioItem from '../../../components/PortfolioItem';
import { useRef, useEffect, memo, useMemo } from 'react';
import { PortfolioItemProps } from '@/schemas';
import 'swiper/css';
import 'swiper/css/pagination';

SwiperCore.use([Autoplay, Pagination]);

const ProjectSlide = ({ Items }: { Items: PortfolioItemProps[] }) => {
  const swiperRef = useRef<SwiperCore | null>(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.update();
    }
  }, []);
  const breakpoints = useMemo(
    () => ({
      0: {
        spaceBetween: 15,
      },
      769: {
        spaceBetween: 20,
      },
      1030: {
        spaceBetween: 25,
      },
      1250: {
        spaceBetween: 32,
      },
    }),
    [],
  );
  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.update();
    }
  }, [breakpoints]);
  return (
    <Swiper
      onInit={(swiper) => (swiperRef.current = swiper)}
      centeredSlides={true}
      modules={[Pagination, Autoplay]}
      pagination={{
        dynamicBullets: true,
        clickable: true,
      }}
      breakpoints={breakpoints}
      loop
      slidesPerView={'auto'}
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
          className="lg:max-w-[380px] max-w-[300px] h-[320px]"
          key={`${item._id}-slide`}
        >
          <PortfolioItem
            _id={item._id}
            project_overview={item.project_overview}
            isSlide={true}
            date={''}
            id={0}
            icons={[]}
            tech={[]}
            catalogue={null}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default memo(ProjectSlide);
