import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Toc from '../components/ui/ToC';
import { RichTextField } from '@prismicio/client';
import { mockSlices, mockTitle } from '../mocks/mockTocData';
import { slugifyHeading } from '@/lib/slugifyHeading';
import { RichTextSlice } from '@/prismicio-types';
import { mockIntersectionObserver } from '@/utils/testing/mockIntersectionObserver';

const originalWarn = console.warn;
beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation((msg) => {
    if (
      typeof msg === 'string' &&
      msg.includes(
        'react-i18next:: useTranslation: You will need to pass in an i18next instance',
      )
    ) {
      return;
    }
    originalWarn(msg);
  });
});

jest.mock('@/lib/slugifyHeading', () => ({
  slugifyHeading: jest.fn((node) => {
    const text =
      typeof node === 'string'
        ? node
        : node && typeof node === 'object' && 'text' in node
          ? (node as { text: string }).text
          : '';
    return `slug-${text
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-')}`;
  }),
}));

describe('Toc Component', () => {
  beforeEach(() => {
    mockIntersectionObserver([true]);
    window.scrollTo = jest.fn();
  });

  it('renders multiple toc link elements', () => {
    render(<Toc slices={mockSlices} title={mockTitle} />);

    // Check only for headings (skip paragraphs and non-heading elements)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (mockSlices[0] as RichTextSlice)!.primary.content.forEach((el: any) => {
      if (el.type.startsWith('heading')) {
        const links = screen.getAllByRole('link', {
          name: new RegExp(`${el.text}`, 'i'),
        });

        const correctLink = links.find((link) =>
          link.textContent!.trim().includes(el.text.trim()),
        );

        expect(correctLink).not.toBeUndefined;
        expect(correctLink).toBeInTheDocument;
      }
    });
  });

  it('scrolls and updates the active ID when clicking on a heading', async () => {
    render(
      <>
        <div>
          {(mockSlices[0] as RichTextSlice)!.primary.content.map(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (node: any, index: number) => {
              const slugifyText = slugifyHeading({ text: node.text });
              if (node.type === 'heading1') {
                return (
                  <h1 key={index} id={slugifyText}>
                    {node.text}
                  </h1>
                );
              }
              if (node.type === 'heading2') {
                return (
                  <h2 key={index} id={slugifyText}>
                    {node.text}
                  </h2>
                );
              }
              if (node.type === 'heading3') {
                return (
                  <h3 key={index} id={slugifyText}>
                    {node.text}
                  </h3>
                );
              }
              return null;
            },
          )}
        </div>
        <Toc slices={mockSlices} title={mockTitle as RichTextField} />
      </>,
    );
    await waitFor(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mockSlices[0] as RichTextSlice)!.primary.content.forEach((el: any) => {
        const links = screen.getAllByRole('link', {
          name: new RegExp(el.text, 'i'),
        });

        const correctLink = links.find((link) =>
          link.textContent!.trim().includes(el.text.trim()),
        );

        if (!correctLink) {
          throw new Error(`Link with text "${el.text}" not found`);
        }

        fireEvent.click(correctLink);
        const slugifiedText = slugifyHeading({ text: el.text });

        expect(window.location.hash).toBe(`#${slugifiedText}`);
      });
    });
  });
});
