import { asText, Content } from '@prismicio/client';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import { richTextComponents } from '../../components/RichText';

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
        <div className="p-7 rounded-md rounded-l-none text-sm bg-base-200 border-l-4 border-nav-col overflow-auto">
          <PrismicRichText
            field={slice.primary.blockquote_richtext}
            components={richTextComponents}
          />
        </div>
      )}
    </section>
  );
};

export default Blockquote;
