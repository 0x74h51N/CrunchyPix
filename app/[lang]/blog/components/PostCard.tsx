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
      href={`/blog/${post.uid}`}
      passHref
      className="card hover:z-50 shadow-xl shadow-bg-base-300 flex flex-col h-auto rounded-xl hover:scale-105 transition-all duration-500 overflow-hidden w-auto max-w-[380px] glass bg-base-300"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="min-h-64">
        <PrismicNextImage
          field={data.feutured_image}
          fill
          className="w-full max-h-64 object-cover"
        />
      </div>
      <div className="flex flex-col gap-3 justify-between p-8 h-full">
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
              {/* {new Date(data?.publication_date || '').toLocaleDateString()} */}
            </p>
          </div>
        </div>

        <div className="line-clamp-6 text-opacity-90 mt-12">
          <RichText field={data.description} />
        </div>
      </div>
    </Link>
  );
};
