import * as prismic from '@prismicio/client';
import * as prismicNext from '@prismicio/next';
import config from './slicemachine.config.json';

export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || config.repositoryName;

const accessToken = process.env.PRISMIC_ACCESS_TOKEN;

const routes: prismic.ClientConfig['routes'] = [
  {
    type: 'page',
    path: '/:lang/blog',
  },
  {
    type: 'blog_post',
    path: '/:lang/blog/:uid',
  },
];

export const createClient = (config: prismicNext.CreateClientConfig = {}) => {
  if (!accessToken) {
    console.log('Access Token Error');
  }
  const client = prismic.createClient(repositoryName, {
    accessToken: accessToken,
    routes,
    fetchOptions:
      process.env.NODE_ENV === 'production'
        ? { next: { tags: ['prismic'] }, cache: 'force-cache' }
        : { next: { revalidate: 5 } },
    ...config,
  });

  prismicNext.enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  });

  return client;
};

export const graphQuery = `
    {
      blog_post {
        uid
        title
        description
        featured_image
        publication_date
      }
    }`;
