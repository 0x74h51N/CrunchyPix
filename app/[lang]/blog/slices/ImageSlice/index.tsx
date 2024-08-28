import { Content } from '@prismicio/client';
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
    >
      Placeholder component for image_slice (variation: {slice.variation})
      Slices
    </section>
  );
};

export default ImageSlice;
