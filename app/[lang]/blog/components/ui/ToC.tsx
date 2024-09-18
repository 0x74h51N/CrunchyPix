'use client';

import { PrismicRichText } from '@prismicio/react';
import { clsx } from 'clsx';

import { asText, SliceZone } from '@prismicio/client';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { slugifyHeading } from '@/lib/slugifyHeading';
import { Heading } from '../Heading';
import { RichTextField } from '@prismicio/types';
import { BlogPostDocumentDataSlicesSlice } from '@/prismicio-types';
import { useTranslation } from 'react-i18next';

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

const TocNavElement = ({ node, level, activeId }: TocNavElementProps) => {
  const id = slugifyHeading(node);
  const handleScroll = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault();
      const targetElement = document.getElementById(id);
      if (targetElement) {
        const navbarHeight = 100;
        const y =
          targetElement.getBoundingClientRect().top +
          window.scrollY -
          navbarHeight;

        window.scrollTo({ top: y, behavior: 'smooth' });
        window.history.pushState(null, '', `#${id}`);
      }
    },
    [id],
  );
  return (
    <li
      className={clsx(
        ' transition-colors hover:underline hover:text-log-col md:text-md text-sm',
        {
          '': level === 1,
          'list-none': level === 2,
          'pl-4 list-none': level === 3,
          '': id !== activeId,
          'text-log-col': id === activeId,
        },
      )}
    >
      <a className="line-clamp-1 mt-0.5" href={`#${id}`} onClick={handleScroll}>
        {level > 1 ? `─ ${node.text}` : node.text}
      </a>
    </li>
  );
};

export function Toc({ slices, title }: TocProps) {
  const headingsList = useRef<HTMLOListElement | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [headings, setHeadings] = useState<
    Array<{ id: string; index: number }>
  >([]);
  const scrollRef = useRef(0);

  useEffect(() => {
    if (headingsList.current) {
      const firstHeadingId = slugifyHeading({
        text: headingsList.current.childNodes[0].textContent || '',
      });

      setActiveId(firstHeadingId);

      headingsList.current.childNodes.forEach(
        (heading: ChildNode, index: number) => {
          const id = slugifyHeading({ text: heading.textContent || '' });

          if (id) {
            setHeadings((headings) => [...headings, { id, index }]);
          }
        },
      );
    }
  }, [headingsList]);

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
        rootMargin: '0px 0px -70% 0px',
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
  const { t } = useTranslation('blog');
  return (
    <div className="xmd:sticky md:top-0 xmd:mt-72 w-full flex flex-col !select-none">
      <aside className="border p-6 xmd:pt-9 w-full max-xmd:pl-10 mt-0 border-base-300 bg-base-300 bg-opacity-25 xmd:shadow-md shadow-base-200 transition-all ease-in-out duration-500">
        <nav aria-labelledby="toc-heading">
          <Heading as="h2" size="xl" id="toc-heading">
            {t('toc')}
          </Heading>
          <ul className="pl-2 mt-4 list-disc" ref={headingsList} role="list">
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
                      heading3: ({ node, children, key }) => (
                        <TocNavElement
                          node={node}
                          key={key}
                          level={3}
                          activeId={activeId}
                        >
                          {children}
                        </TocNavElement>
                      ),
                      heading4: () => <></>,
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
          </ul>
        </nav>
      </aside>
    </div>
  );
}
