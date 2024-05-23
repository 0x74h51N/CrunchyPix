'use client';
import { useEffect } from 'react';
import i18next, { i18n } from 'i18next';
import { initReactI18next, useTranslation as useTransAlias } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { FALLBACK_LOCALE, Locales, NEXT_LOCALE, getOptions, supportedLocales } from './settings';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { getCookie } from 'cookies-next';

const runsOnServerSide = typeof window === 'undefined';

i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (lang: string, ns: string) => import(`./locales/${lang}/${ns}.json`)
    )
  )
  .init({
    ...getOptions(),
    lng: undefined,
    detection: {
      order: ['cookie'],
      lookupCookie: NEXT_LOCALE,
      caches: ['cookie'],
    },
    preload: runsOnServerSide ? supportedLocales : [],
  });

export default i18next;

function useCustomTranslationImplem(i18n: i18n, lng: Locales) {
  useEffect(() => {
    if (!lng || i18n.resolvedLanguage === lng) return;
    i18n.changeLanguage(lng);
  }, [lng, i18n]);
}

export function useTranslation(ns: string) {
  const lng = useSelector((state: RootState) => state.language.language) as Locales;
  const translator = useTransAlias(ns);
  const { i18n } = translator;
  if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
    i18n.changeLanguage(lng);
  } else {
    useCustomTranslationImplem(i18n, lng);
  }
  return translator;
}

export function getLocale(): Locales {
  const storedLanguage = getCookie(NEXT_LOCALE) as string;
  return (storedLanguage as Locales) || FALLBACK_LOCALE;
}