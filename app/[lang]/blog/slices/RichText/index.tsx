import { RichText } from '@/app/[lang]/blog/components/RichText';
import type { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

type RichTextProps = SliceComponentProps<Content.RichTextSlice>;

export default function RichTextSlice({ slice }: RichTextProps) {
  return (
    <section className="flex flex-col gap-2 overflow-hidden">
      <RichText field={slice.primary.content} />
    </section>
  );
}
