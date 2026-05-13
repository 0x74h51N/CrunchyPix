'use client';
import { BlogPostDocument } from '@/prismicio-types';
import { memo, useEffect, useMemo, useRef } from 'react';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { PostCard } from './PostCard';

// eslint-disable-next-line react-hooks/rules-of-hooks
SwiperCore.use([Autoplay, Pagination, Navigation]);

const ProjectSlide = ({
  navigationItems,
}: {
  navigationItems: BlogPostDocument<string>[];
}) => {
  const navigation = {
    nextEl: '.swiper-button-next-cus',
    prevEl: '.swiper-button-prev-cus',
  };
  const swiperRef = useRef<SwiperCore | null>(null);
  const extendedPosts = useMemo(() => {
    return [...navigationItems, ...navigationItems];
  }, [navigationItems]);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.update();
    }
  }, []);
  return (
    <div className="flex h-full w-full relative">
      <Swiper
        navigation={navigation}
        onInit={(swiper) => (swiperRef.current = swiper)}
        modules={[Pagination, Autoplay, Navigation]}
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        loop
        slidesPerView={'auto'}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={1200}
        className="w-full"
      >
        {extendedPosts.map((post, i) => (
          <SwiperSlide
            className="max-w-[400px] max-h-[450px]"
            key={`${post.uid}-slide-${i}`}
          >
            <PostCard post={post} recomendSec />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute swiper-button-next-cus bottom-4 right-1 w-[50px] h-[55px] z-50 btn btn-ghost">
        <div className="swiper-button-next !cursor-pointer" />
      </div>
      <div className="absolute swiper-button-prev-cus bottom-4 left-1 w-[50px] h-[55px] z-50 btn btn-ghost">
        <div className="swiper-button-prev !cursor-pointer" />
      </div>
    </div>
  );
};

export default memo(ProjectSlide);
