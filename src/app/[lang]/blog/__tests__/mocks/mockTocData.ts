import {
  BlogPostDocumentDataSlicesSlice,
  RichTextSlice,
} from '@/prismicio-types';
import { RichTextField } from '@prismicio/types';
import * as prismic from '@prismicio/client';

export const mockTitle: RichTextField = [
  {
    type: 'heading1',
    text: 'Mock Blog Title',
    spans: [],
  },
];

export const mockSlices: prismic.SliceZone<BlogPostDocumentDataSlicesSlice> = [
  {
    variation: 'default',
    version: 'sktwi1xtmkfgx8626',
    items: [],
    primary: {
      content: [
        {
          type: 'heading1',
          text: 'Introduction',
          spans: [],
          direction: 'ltr',
        },
        {
          type: 'heading2',
          text: 'Overview of the Topic',
          spans: [],
          direction: 'ltr',
        },
        {
          type: 'heading3',
          text: 'Details about the Overview',
          spans: [],
          direction: 'ltr',
        },
        {
          type: 'heading3',
          text: 'Additional Info on Overview',
          spans: [],
          direction: 'ltr',
        },
        {
          type: 'heading2',
          text: 'Key Challenges',
          spans: [],
          direction: 'ltr',
        },
        {
          type: 'heading3',
          text: 'Challenge 1',
          spans: [],
          direction: 'ltr',
        },
        {
          type: 'heading3',
          text: 'Challenge 2',
          spans: [],
          direction: 'ltr',
        },
        {
          type: 'heading1',
          text: 'Main Section',
          spans: [],
          direction: 'ltr',
        },
        {
          type: 'heading2',
          text: 'Subsection 1',
          spans: [],
          direction: 'ltr',
        },
        {
          type: 'heading3',
          text: 'Details of Subsection 1',
          spans: [],
          direction: 'ltr',
        },
        {
          type: 'heading3',
          text: 'Further Insights on Subsection 1',
          spans: [],
          direction: 'ltr',
        },
        {
          type: 'heading2',
          text: 'Subsection 2',
          spans: [],
          direction: 'ltr',
        },
        {
          type: 'heading3',
          text: 'Details of Subsection 2',
          spans: [],
          direction: 'ltr',
        },
        { type: 'heading1', text: 'Conclusion', spans: [], direction: 'ltr' },
        {
          type: 'heading2',
          text: 'Final Thoughts',
          spans: [],
          direction: 'ltr',
        },
      ],
    },

    id: 'rich_text$37e47de7-a36b-48b8-80f6-2ba948b295e8',
    slice_type: 'rich_text',
    slice_label: null,
  } as RichTextSlice,
];
