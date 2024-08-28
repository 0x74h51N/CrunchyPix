'use client';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicText } from '@prismicio/react';
import { RichText } from './RichText';
import { Content } from '@prismicio/client';
import Link from 'next/link';
import useClickableHandlers from '@/hooks/useClickableHandlers';

export const PostCard = ({
  post,
}: {
  post: Content.BlogPostDocument;
}): JSX.Element => {
  const { data } = post;
  const { handleMouseEnter, handleMouseLeave } = useClickableHandlers();
  return (
    <Link
      href={post.url!}
      className="card glass min-h-72 grid xsm:grid-cols-2 grid-cols-1 xsm:rounded-xl rounded-lg hover:scale-105 transition-all duration-500 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <PrismicNextImage
        field={data.feutured_image}
        className="w-full h-full object-cover col-span-1"
      />
      <div className="flex flex-col gap-3 justify-between col-span-1 p-8 box-border max-h-full">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-xl hover:text-log-col transition-all ease-in-out duration-500">
            <PrismicText field={data.title} />
          </h2>
          <div className="flex justify-between">
            <p className="gap-2 flex text-log-col text-sm">
              {post.tags.map((tag, index) => (
                <span
                  key={post.uid + ' ' + index}
                  className="flex badge badge-primary badge-md h-6 items-center text-gray-700 rounded-lg"
                >
                  {tag}
                </span>
              ))}
            </p>
            <p className="text-sm opacity-75 self-center w-min">
              {new Date(data?.publication_date || '').toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="line-clamp-6">
          <RichText field={data.description} />
        </div>
      </div>
    </Link>
  );
};
