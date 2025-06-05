import { PrismicNextImage } from '@prismicio/next';
import { PrismicText } from '@prismicio/react';
import Link from 'next/link';
import { FaAnglesRight } from 'react-icons/fa6';
import { BlogPostDocument } from '@/prismicio-types';
import clsx from 'clsx';
import { JSX } from 'react';

export const PostCard = ({
  post,
  recomendSec = false,
}: {
  post: BlogPostDocument<string>;
  recomendSec?: boolean;
}): JSX.Element => {
  const data = post.data;
  const cardClasses = clsx(
    'group !select-none relative hover:z-50 card flex flex-col lg:h-[450px] h-[400px] rounded-xl hover:border-log-col border-[1px] border-cool-gray-800 transition-all ease-in-out duration-500 overflow-hidden bg-cool-gray-700',
    recomendSec ? 'md:w-[380px] w-[360px]' : 'lg:w-[450px] xs:w-[390px] w-full',
  );
  return (
    <div className={cardClasses} tabIndex={1}>
      <div>
        <div className="lg:h-64 h-56">
          <PrismicNextImage
            field={data!.featured_image}
            fill
            className="w-full max-h-64 object-cover"
          />
        </div>
      </div>
      <div
        className={clsx(
          'min-h-full flex flex-col gap-1 justify-between p-5 card-body group-hover:-translate-y-[58%] max-md:group-focus:-translate-y-[58%] translate-y-[0] transition-all ease-in-out duration-700 bg-cool-gray-700 text-stone-300 lg:pt-7',
        )}
      >
        <h2 className="font-bold md:text-2xl text-lg text-stone-200 group-hover:text-log-col max-md:group-focus:text-log-col my-2 line-clamp-1 h-14">
          <PrismicText field={data!.title} />
        </h2>
        <div className="flex justify-between max-w-full items-start min-h-24 max-h-24">
          <div className="gap-1 flex flex-wrap  max-w-[250px] overflow-hidden">
            {post!.tags!.map((tag, index) => (
              <span
                key={post.uid + 'tag' + index}
                className="badge badge-primary min-h-6 pb-0.5 md:badge-md badge-xs text-cool-gray-300 max-md:p-2"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="text-sm opacity-75 flex w-min">
            {new Date(data?.publication_date || '').toLocaleDateString('en-GB')}
          </span>
        </div>

        <div className="flex flex-col justify-between h-full lg:mt-2 group-hover:mt-0 transition-all ease-in-out duration-500">
          <div className="text-opacity-90 w-full gap-4 lg:h-32 lg:py-1 h-24 md:text-sm text-xs">
            <PrismicText field={data!.description} />
          </div>
          <div className="lg:mt-4 self-end">
            <Link
              tabIndex={-1}
              aria-label="Read more"
              href={`/${post.lang === 'en-us' ? 'en' : post.lang}/blog/${post.uid}`}
              passHref
              className="bg-log-col hover:w-17 hover:h-17 md:w-7 md:h-7 w-14 h-14 hover:text-xl text-xs text-white rounded-full flexCenter transition-all duration-300 ease-in-out"
            >
              <FaAnglesRight className="-rotate-45" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
