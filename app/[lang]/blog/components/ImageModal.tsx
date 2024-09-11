'use client';
import CancelButton from '@/components/Buttons/CancelButton';
import { PrismicNextImage } from '@prismicio/next';
import React, { useRef, useState } from 'react';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { Content } from '@prismicio/client';

type ImageModalProps = {
  slice: Content.ImageSliceSlice;
};
const ImageModal = ({ slice }: ImageModalProps): JSX.Element => {
  const modalRef = useRef(null);
  const [isModal, setModal] = useState(false);

  useOutsideClick(modalRef, () => {
    setModal(false);
  });
  return (
    <>
      <PrismicNextImage
        field={slice.primary.image}
        sizes="auto"
        quality={100}
        className="w-full max-w-6xl self-center h-auto rounded-md object-cover cursor-pointer"
        onClick={() => setModal(true)}
      />
      {isModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div ref={modalRef} className="relative">
            <button
              className="absolute top-0 -right-5 z-50"
              onClick={() => setModal(false)}
            >
              <CancelButton />
            </button>
            <PrismicNextImage
              field={slice.primary.image}
              key={slice.id + 'modal'}
              sizes="full"
              priority
              quality={100}
              className="w-full max-w-7xl h-auto"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ImageModal;
