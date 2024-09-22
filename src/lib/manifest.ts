import { createTranslation } from '@/i18n/server';
import { Locales } from '@/i18n/settings';

export const manifest = async ({ params }: { params: { lang: Locales } }) => {
  const { t } = await createTranslation('home');
  return {
    name: t('meta.title'),
    short_name: t('meta.title'),
    description: t('meta.description'),
    start_url: `/${params.lang}`,
    display: 'standalone',
    icons: [
      {
        url: '/favicon-light.ico',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/favicon-dark.ico',
        media: '(prefers-color-scheme: dark)',
      },
    ],
  };
};
