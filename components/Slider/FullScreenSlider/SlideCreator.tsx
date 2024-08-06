import React from 'react';
import { slide } from '@/types/common.types';
import { CldImage } from 'next-cloudinary';

const SlideCreator: React.FC<slide> = ({ imageUrl = '' }) => {
  return (
    <div className="h-full w-full">
      <div className="absolute inset-0 z-0">
        <CldImage
          src={imageUrl}
          alt={'Image'}
          fill
          sizes="auto"
          loading="lazy"
          className=" object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default SlideCreator;
