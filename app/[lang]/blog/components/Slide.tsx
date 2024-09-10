'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import { useRef, useEffect, memo, useMemo } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { BlogPostDocument } from '@/prismicio-types';
import { PostCard } from './PostCard';

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
        centeredSlides={true}
        modules={[Pagination, Autoplay, Navigation]}
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        loop
        spaceBetween={25}
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
      <div className="absolute swiper-button-next-cus bottom-4 right-1 w-[50px] z-50 btn btn-ghost">
        <div className="swiper-button-next !cursor-pointer" />
      </div>
      <div className="absolute swiper-button-prev-cus bottom-4 left-1 w-[50px] z-50 btn btn-ghost">
        <div className="swiper-button-prev !cursor-pointer" />
      </div>
    </div>
  );
};

export default memo(ProjectSlide);
