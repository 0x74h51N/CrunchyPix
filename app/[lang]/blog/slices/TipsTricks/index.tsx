import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import { RichText } from '../../components/RichText';

/**
 * Props for `TipsTricks`.
 */
export type TipsTricksProps = SliceComponentProps<Content.TipsTricksSlice>;

/**
 * Component for "TipsTricks" Slices.
 */
const TipsTricks = ({ slice }: TipsTricksProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-base-300 join-vertical rounded-lg"
    >
      <div className="bg-base-200 p-4 join-item rounded-t-lg">
        💡{' '}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-lg">
          Tips & Tricks
        </span>
      </div>
      <div className="p-5 join-item">
        <RichText field={slice.primary.tips} />
      </div>
    </section>
  );
};

export default TipsTricks;
