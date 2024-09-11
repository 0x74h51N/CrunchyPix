'use client';

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import {
  FALLBACK_LOCALE,
  Locales,
  getOptions,
  supportedLocales,
} from './settings';
import resourcesToBackend from './resourcesToBackend';
import { getLocaleCookie } from '@/app/actions/switch-locale';
import { useEffect } from 'react';

const runsOnServerSide = typeof window === 'undefined';

i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (lang: string, ns: string) => import(`./locales/${lang}/${ns}.json`),
    ),
  )
  .init({
    ...getOptions(),
    lng: undefined,
    preload: runsOnServerSide ? supportedLocales : [],
  });

export default i18next;

export async function getLocale(): Promise<Locales> {
  const storedLanguage = await getLocaleCookie();

  if (storedLanguage) {
    return storedLanguage;
  }

  return FALLBACK_LOCALE;
}

export function useClientLanguageSetup(lang: string) {
  useEffect(() => {
    if (!runsOnServerSide && lang) {
      i18next.changeLanguage(lang);
    }
  }, [lang]);
}
