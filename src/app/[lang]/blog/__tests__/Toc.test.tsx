import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Toc from '../components/ui/ToC';
import { RichTextField } from '@prismicio/client';
import { mockSlices } from './mocks/mockTocData';
import { slugifyHeading } from '@/lib/slugifyHeading';
import { RichTextSlice } from '@/prismicio-types';
import { mockIntersectionObserver } from '@/utils/testing/mockIntersectionObserver';
import { SliceZone } from '@prismicio/react';
import { components } from '../slices';

jest.mock('@/lib/slugifyHeading', () => ({
  slugifyHeading: jest.fn(
    (node) =>
      `slug-${node.text
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-')}`,
  ),
}));

jest.mock('@/app/[lang]/blog/components/RichText', () => ({
  __esModule: true,
  default: jest.fn(({ slice }) => (
    <div>
      {slice.primary.content.map((node: any, index: number) => {
        if (node.type === 'heading1') {
          return (
            <h1 key={index} id={`heading-${node.text}`}>
              {node.text}
            </h1>
          );
        }
        if (node.type === 'heading2') {
          return (
            <h2 key={index} id={`heading-${node.text}`}>
              {node.text}
            </h2>
          );
        }
        if (node.type === 'heading3') {
          return (
            <h3 key={index} id={`heading-${node.text}`}>
              {node.text}
            </h3>
          );
        }
        return null;
      })}
    </div>
  )),
}));

jest.mock('next/dynamic', () => () => (props: any) => <>{props.children}</>);

jest.mock('@prismicio/react', () => ({
  SliceZone: jest.fn(({ slices, components }) => (
    <div>
      {slices.map((slice: any, index: number) => {
        const Component = components[slice.slice_type];
        return Component ? <Component key={index} slice={slice} /> : null;
      })}
    </div>
  )),
}));

jest.mock('@prismicio/react', () => ({
  PrismicRichText: jest.fn(({ field }) => (
    <div>
      {field.map((item: any) => (
        <p key={item.text}>{item.text}</p>
      ))}
    </div>
  )),
}));

const mockTitle = [{ text: 'Mock Blog Title' }];

describe('Toc Component', () => {
  beforeEach(() => {
    mockIntersectionObserver([true]);
  });

  it('renders multiple levels of headings correctly', () => {
    render(<Toc slices={mockSlices} title={mockTitle as RichTextField} />);

    // Check if the main title and headings are rendered
    (mockSlices[0] as RichTextSlice)!.primary.content.forEach((el: any) => {
      const elements = screen.getAllByText((content) =>
        content.includes(el.text),
      );
      expect(elements.length).toBeGreaterThan(0);
    });
  });

  it('scrolls and updates the active ID when clicking on a heading', async () => {
    render(
      <>
        <SliceZone slices={mockSlices} components={components} />
        <Toc slices={mockSlices} title={mockTitle as RichTextField} />
      </>,
    );
    await waitFor(() => {
      (mockSlices[0] as RichTextSlice)!.primary.content.forEach((el: any) => {
        const headingLinks = screen.getAllByText((content) =>
          content.includes(el.text),
        );

        headingLinks.forEach((headingLink) => {
          fireEvent.click(headingLink);
          const slugifiedText = slugifyHeading({ text: el.text });

          expect(window.location.hash).toBe(`#${slugifiedText}`);
        });
      });
    });
  });

  //   it('updates active heading when scrolled into view', () => {
  //     render(
  //       <Toc
  //         slices={mockSlices as SliceZone<BlogPostDocumentDataSlicesSlice>}
  //         title={mockTitle as RichTextField}
  //       />,
  //     );

  //     const observerCallback = jest.fn();
  //     const observerMock = jest
  //       .spyOn(window, 'IntersectionObserver')
  //       .mockImplementation((cb) => {
  //         observerCallback.mockImplementation(cb);
  //         return {
  //           observe: jest.fn(),
  //           unobserve: jest.fn(),
  //           disconnect: jest.fn(),
  //         };
  //       });

  //     // Simulate the first heading entering the view
  //     observerCallback([
  //       {
  //         target: {
  //           getAttribute: jest.fn().mockReturnValue('slug-Overview of the Topic'),
  //         },
  //         isIntersecting: true,
  //       },
  //     ]);

  //     // Check if the active ID has been updated
  //     expect(screen.getByText('Overview of the Topic')).toHaveClass(
  //       'text-log-col',
  //     );

  //     observerMock.mockRestore();
  //   });
});
