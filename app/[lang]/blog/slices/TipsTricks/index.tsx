import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import { RichText } from '../../components/RichText';
import { createTranslation } from '@/i18n/server';

/**
 * Props for `TipsTricks`.
 */
export type TipsTricksProps = SliceComponentProps<Content.TipsTricksSlice>;
const TipsTricks = async ({ slice }: TipsTricksProps): Promise<JSX.Element> => {
  const { t } = await createTranslation('blog');

  const titleClasses = () => {
    switch (slice.primary.option) {
      case 'tips':
        return 'cool-text';
      case 'question':
        return 'text-blue-600';
      case 'warn':
        return 'text-yellow-600';
      default:
        return '';
    }
  };

  const boxClasses = () => {
    switch (slice.primary.option) {
      case 'tips':
        return 'bg-base-200';
      case 'question':
        return 'bg-blue-50 border-l-4 border-blue-400';
      case 'warn':
        return 'bg-yellow-50 border-l-4 border-yellow-400';
      default:
        return '';
    }
  };
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-base-300 join-vertical rounded-lg"
    >
      <div className={`bg-base-200 p-4 join-item rounded-t-lg ${boxClasses()}`}>
        <span className={`text-lg ${titleClasses()}`}>
          {t(`blog-post.tipsSlice.${slice.primary.option}`)}
        </span>
      </div>
      <div className={`p-5 join-item ${boxClasses()} bg-opacity-50`}>
        <RichText field={slice.primary.tips} />
      </div>
    </section>
  );
};

export default TipsTricks;
