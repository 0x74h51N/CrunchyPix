// ./src/components/Toc.js

'use client';

import { PrismicRichText } from '@prismicio/react';
import { clsx } from 'clsx';

import { asText, Content, Slice, SliceZone } from '@prismicio/client';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { slugifyHeading } from '@/lib/slugifyHeading';
import { Heading } from './Heading';
import { RichTextField } from '@prismicio/types';
import { BlogPostDocumentDataSlicesSlice } from '@/prismicio-types';

interface TocNavElementProps {
  node: { text: string };
  children?: ReactNode;
  level: number;
  activeId: string | null;
}

interface TocProps {
  slices: SliceZone<BlogPostDocumentDataSlicesSlice>;
  title: RichTextField;
}

const TocNavElement = ({
  node,
  children,
  level,
  activeId,
}: TocNavElementProps) => {
  const id = slugifyHeading(node);

  return (
    <li
      className={clsx('list-disc transition-colors', {
        'pl-2': level === 1,
        'pl-4': level === 2,
        '': id !== activeId,
        'text-log-col': id === activeId,
      })}
    >
      <a className="line-clamp-1" href={`#${id}`}>
        {children ? children : node.text}
      </a>
    </li>
  );
};

export function Toc({ slices, title }: TocProps) {
  const headingsList = useRef<HTMLOListElement | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [headings, setHeadings] = useState<
    Array<{ id: string; index: number }>
  >([]); // Add state to store our heading ID's and their index
  const scrollRef = useRef(0); // Store the previous scroll position

  useEffect(() => {
    if (headingsList.current) {
      const firstHeadingId = slugifyHeading({
        text: headingsList.current.childNodes[0].textContent || '',
      });

      setActiveId(firstHeadingId);

      // Loop over our headings and create an id for each, store it in the new state
      headingsList.current.childNodes.forEach(
        (heading: ChildNode, index: number) => {
          const id = slugifyHeading({ text: heading.textContent || '' });

          if (id) {
            setHeadings((headings) => [...headings, { id, index }]);
          }
        },
      );
      console.log('headingList', headingsList);
    }
  }, [headingsList]);

  // Add a new useEffect hook with our IntersectionObserver logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('id');

          if (entry.isIntersecting) {
            setActiveId(id);
            scrollRef.current = window.scrollY;
          } else {
            const diff = scrollRef.current - window.scrollY;
            const isScrollingUp = diff > 0;
            const currentIndex = headings.findIndex(
              (heading) => heading.id === id,
            );
            const prevEntry = headings[currentIndex - 1];
            const prevId = prevEntry?.id;

            if (isScrollingUp && prevId) {
              setActiveId(prevId);
            }
          }
        });
      },
      {
        rootMargin: '0px 0px -95% 0px',
      },
    );

    const observeHeadings = () => {
      headings.forEach((heading) => {
        const currentHeading = document.getElementById(heading.id);

        if (currentHeading) {
          observer.observe(currentHeading);
        }
      });
    };

    if (headings.length) {
      observeHeadings();
    }

    return () => {
      headings.forEach((heading) => {
        const currentHeading = document.getElementById(heading.id);

        if (currentHeading) {
          observer.unobserve(currentHeading);
        }
      });
    };
  }, [headings]);
  console.log(activeId);
  return (
    <div className="xl:sticky xl:top-4 px-4 md:px-6 w-full ">
      <div className="xl:absolute xl:top-0 2xl:-left-80 xl:-left-72">
        <aside className="border p-6 mx-auto max-w-3xl mt-6 md:mt-0 2xl:w-72 xl:w-64 card glass bg-secondary bg-opacity-40">
          <nav aria-labelledby="toc-heading">
            <Heading as="h2" size="xl" id="toc-heading">
              Table of Contents
            </Heading>
            <ol className="pl-4 mt-4" ref={headingsList} role="list">
              <TocNavElement
                node={{
                  text: asText(title) || '',
                }}
                level={1}
                activeId={activeId}
              />
              {slices.map(
                (slice) =>
                  slice.slice_type === 'rich_text' && (
                    <PrismicRichText
                      key={slice.id}
                      field={slice.primary.content}
                      components={{
                        heading1: ({ node, children, key }) => (
                          <TocNavElement
                            node={node}
                            key={key}
                            level={1}
                            activeId={activeId}
                          >
                            {children}
                          </TocNavElement>
                        ),
                        heading2: ({ node, children, key }) => (
                          <TocNavElement
                            node={node}
                            key={key}
                            level={2}
                            activeId={activeId}
                          >
                            {children}
                          </TocNavElement>
                        ),
                        heading3: () => <></>,
                        paragraph: () => <></>,
                        preformatted: () => <></>,
                        strong: () => <></>,
                        em: () => <></>,
                        listItem: () => <></>,
                        oListItem: () => <></>,
                        list: () => <></>,
                        oList: () => <></>,
                        image: () => <></>,
                        embed: () => <></>,
                        hyperlink: () => <></>,
                      }}
                    />
                  ),
              )}
            </ol>
          </nav>
        </aside>
      </div>
    </div>
  );
}
