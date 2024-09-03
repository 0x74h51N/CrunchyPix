import { Content } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { SliceComponentProps } from '@prismicio/react';

/**
 * Props for `ImageSlice`.
 */
export type ImageSliceProps = SliceComponentProps<Content.ImageSliceSlice>;

/**
 * Component for "ImageSlice" Slices.
 */
const ImageSlice = ({ slice }: ImageSliceProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex w-full justify-center"
    >
      <PrismicNextImage
        field={slice.primary.image}
        sizes="auto"
        className="w-full max-w-4xl self-center h-auto rounded-xl object-cover"
      />
    </section>
  );
};

export default ImageSlice;
