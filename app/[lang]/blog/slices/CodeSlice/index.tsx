import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import { CodeBlock } from '../../components/CodeBlock';
import { asText } from '@prismicio/client/richtext';

/**
 * Props for `CodeSlice`.
 */
export type CodeSliceProps = SliceComponentProps<Content.CodeSliceSlice>;

/**
 * Component for "CodeSlice" Slices.
 */
const CodeSlice = ({ slice }: CodeSliceProps): JSX.Element => {
  return (
    <div
      className="-my-9"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <CodeBlock
        language={slice.primary.language}
        code={asText(slice.primary.codeblock)}
      />
      {/* { Placeholder component for code_slice (variation: {slice.variation}) Slices} */}
    </div>
  );
};

export default CodeSlice;
