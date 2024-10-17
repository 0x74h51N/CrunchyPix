import React from 'react';
import { CldImage } from 'next-cloudinary';

const SlideCreator: React.FC<{
  imageUrl: string;
}> = ({ imageUrl = '' }) => {
  return (
    <div className="h-full w-full">
      <CldImage
        src={imageUrl}
        alt={'Image'}
        format="avif"
        fill
        quality={100}
        sizes="auto"
        loading={'lazy'}
        className=" object-cover w-full h-full"
      />
    </div>
  );
};

export default SlideCreator;
