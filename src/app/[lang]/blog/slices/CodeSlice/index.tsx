import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import { CodeBlock } from '../../components/CodeBlock';
import { asText } from '@prismicio/client/richtext';
import { JSX } from 'react';

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
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <CodeBlock
        language={slice.primary.language}
        code={asText(slice.primary.codeblock)}
        title={slice.primary.title || ''}
      />
    </div>
  );
};

export default CodeSlice;
