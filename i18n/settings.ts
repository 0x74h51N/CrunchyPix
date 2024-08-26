/**
 * This i18n structure is implemented based on theese articles:
 * https://carlogino.com/blog/nextjs-app-dir-i18n-cookie
 * https://locize.com/blog/next-app-dir-i18n/#step-2
 *
 * Many thanks to the author for the detailed explanation.
 * After implementing the i18n setups and server translation utility,
 * it helped to multi-language metadata w/o sub-language prefixes or different domains.
 */

import type { InitOptions } from 'i18next';

export const FALLBACK_LOCALE = 'en';
export const supportedLocales = ['en', 'tr', 'de'] as const;
export type Locales = (typeof supportedLocales)[number];

export const NEXT_LOCALE = 'preferred_language';

export function getOptions(lang = FALLBACK_LOCALE, ns = 'common'): InitOptions {
  return {
    supportedLngs: supportedLocales,
    fallbackLng: FALLBACK_LOCALE,
    lng: lang,
    ns,
  };
}
