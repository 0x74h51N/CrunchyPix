import { Locales } from '@/i18n/settings';

export function langMap(lang: Locales): string {
  const langMap: { [key: string]: string } = {
    tr: 'tr',
    en: 'en-us',
    de: 'en-us',
  };

  return langMap[lang] || 'en-us';
}
