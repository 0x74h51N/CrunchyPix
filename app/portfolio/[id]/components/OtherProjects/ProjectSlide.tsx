import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import SwiperCore from 'swiper';
import PortfolioItem from '../../../components/PortfolioItem';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useRef, useEffect, memo, useMemo } from 'react';
import 'swiper/css';
import { PortfolioItemProps } from '@/schemas';

SwiperCore.use([Autoplay, Pagination]);

const ProjectSlide = ({ Items }: { Items: PortfolioItemProps[] }) => {
  const screenWidth = useSelector(
    (state: RootState) => state.screenWidth.width,
  );
  const swiperRef = useRef<SwiperCore | null>(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.update();
    }
  }, []);
  const spaceBetween = useMemo(() => {
    if (screenWidth <= 769) return 15;
    if (screenWidth <= 1030) return 20;
    if (screenWidth <= 1250) return 25;
    return 32;
  }, [screenWidth]);
  return (
    <Swiper
      onInit={(swiper) => (swiperRef.current = swiper)}
      centeredSlides={true}
      modules={[Pagination, Autoplay]}
      pagination={{
        dynamicBullets: true,
        clickable: true,
      }}
      spaceBetween={spaceBetween}
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
          className="w-auto lg:max-w-[380px] max-w-[300px] h-auto"
          key={`${item._id}-slide`}
        >
          <PortfolioItem
            _id={item._id}
            project_overview={item.project_overview}
            width={screenWidth <= 1030 ? 300 : 380}
            height={screenWidth <= 1030 ? 250 : 310}
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
