import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import { RichText } from '../../components/RichText';
import ImageModal from '../../components/ImageModal';

export type ImageSliceProps = SliceComponentProps<Content.ImageSliceSlice>;

const ImageSlice = ({ slice }: ImageSliceProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      key={slice.id}
      data-slice-variation={slice.variation}
      className="flex flex-col mb-4 w-full justify-center gap-2"
    >
      <ImageModal slice={slice} key={slice.id + 'image'} />
      <div className="px-2">
        <RichText field={slice.primary.description} />
      </div>
    </section>
  );
};

export default ImageSlice;
