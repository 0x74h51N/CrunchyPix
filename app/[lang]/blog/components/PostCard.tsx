import { PrismicNextImage } from '@prismicio/next';
import { PrismicText } from '@prismicio/react';
import Link from 'next/link';
import { FaAnglesRight } from 'react-icons/fa6';
import { BlogPostDocument } from '@/prismicio-types';
import clsx from 'clsx';

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
    recomendSec ? 'md:w-[380px] w-[360px]' : 'lg:w-[450px] sm:w-[390px] w-full',
  );
  return (
    <div className={cardClasses}>
      <div>
        <div className="lg:h-64 h-56">
          <PrismicNextImage
            field={data!.featured_image}
            fill
            className="w-full max-h-64 object-cover"
          />
        </div>
      </div>
      <div className="min-h-full flex flex-col gap-3 justify-between p-5 card-body group-hover:-translate-y-[58%] translate-y-[0] transition-all ease-in-out duration-700 bg-cool-gray-700 text-stone-300">
        <h2 className="font-bold text-2xl text-stone-200 group-hover:text-log-col my-2">
          <PrismicText field={data!.title} />
        </h2>
        <div className="flex justify-between max-w-full items-start lg:mt-2">
          <p className="gap-1 flex flex-wrap max-w-[250px] h-20 overflow-hidden">
            {post!.tags!.map((tag, index) => (
              <span
                key={post.uid + 'tag' + index}
                className="badge badge-primary min-h-6 pb-0.5 md:badge-md badge-xs text-gray-700"
              >
                {tag}
              </span>
            ))}
          </p>
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
              href={`/${post.lang === 'en-us' ? 'en' : post.lang}/blog/${post.uid}`}
              passHref
              className="bg-log-col lg:w-[70px] lg:h-[70px] w-[50px] h-[50px] rounded-full flexCenter"
            >
              <FaAnglesRight className="text-white text-lg -rotate-45" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
