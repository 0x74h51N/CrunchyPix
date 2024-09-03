import { PrismicNextImage } from '@prismicio/next';
import { PrismicText } from '@prismicio/react';
import { RichText } from './RichText';
import { Content } from '@prismicio/client';
import Link from 'next/link';
import { FaAnglesRight } from 'react-icons/fa6';

export const PostCard = ({
  post,
  recSec = false,
}: {
  post: Content.BlogPostDocument;
  recSec?: boolean;
}): JSX.Element => {
  const { data } = post;

  return (
    <div
      className={`group !select-none relative hover:z-50 card flex flex-col ${recSec ? 'h-[380px] w-[380px]' : 'lg:h-[450px] h-[400px] lg:w-[450px] sm:w-[390px] w-full'} rounded-xl hover:border-log-col border-[1px] border-cool-gray-800 transition-all ease-in-out duration-500 overflow-hidden bg-cool-gray-700 text-stone-300`}
    >
      <div>
        <div className="h-64">
          <PrismicNextImage
            field={data.featured_image}
            fill
            className="w-full max-h-64 object-cover"
          />
        </div>
      </div>
      <div className="absolute w-full h-full group-hover:backdrop-filter group-hover:backdrop-blur-lg bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-500 ease-in-out rounded-xl z-40" />
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-end gap-14 lg:p-8 md:p-6 p-3 max-lg:py-6 items-center rounded-full opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-300 delay-200 z-50">
        <Link
          href={`/blog/${post.uid}`}
          passHref
          className="bg-log-col w-[70px] h-[70px] rounded-full flexCenter"
        >
          <FaAnglesRight className="text-white text-2xl -rotate-45" />
        </Link>
        <div className="text-opacity-90 w-full gap-4 flex flex-col h-36 justify-between">
          <h2 className="font-bold text-xl hover:text-log-col transition-all ease-in-out duration-500">
            <PrismicText field={data.title} />
          </h2>
          <div className="flex max-h-full md:text-sm text-xs line-clamp-5">
            <RichText field={data.description} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 justify-between lgp-8 p-5 h-full card-body">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-xl hover:text-log-col transition-all ease-in-out duration-500">
            <PrismicText field={data.title} />
          </h2>
          <div className="flex justify-between max-w-full max-h-32 pb-5 items-start mt-2 ">
            <p className="gap-1 flex text-sm flex-wrap h-auto max-w-[250px] max-h-16 overflow-hidden">
              {post.tags.map((tag, index) => (
                <span
                  key={post.uid + 'tag' + index}
                  className="flex badge badge-primary badge-sm h-6 items-center text-gray-700 rounded-lg"
                >
                  {tag}
                </span>
              ))}
            </p>
            <span className="text-sm opacity-75 flex w-min">
              {new Date(data?.publication_date || '').toLocaleDateString(
                'en-GB',
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
