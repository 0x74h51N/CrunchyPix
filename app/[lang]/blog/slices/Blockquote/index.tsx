import { asText, Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

/**
 * Props for `Blockquote`.
 */
export type BlockquoteProps = SliceComponentProps<Content.BlockquoteSlice>;

/**
 * Component for "Blockquote" Slices.
 */
const Blockquote = ({ slice }: BlockquoteProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {slice.primary.blockquote_richtext && (
        <div className="p-7 rounded-md bg-base-200">
          {asText(slice.primary.blockquote_richtext)}
        </div>
      )}
    </section>
  );
};

export default Blockquote;
