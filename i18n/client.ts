'use client';
import { useEffect, useState } from 'react';
import i18next, { i18n } from 'i18next';
import { initReactI18next, useTranslation as useTransAlias } from 'react-i18next';
import { FALLBACK_LOCALE, Locales, NEXT_LOCALE, getOptions, supportedLocales } from './settings';
import resourcesToBackend from './resourcesToBackend';
import useSWR from 'swr';

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
  const fetcher = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch locale');
    }
    return await response.json();
  };

  const { data, error } = useSWR('/api/locale', fetcher);
  const [lng, setLng] = useState<Locales>();

  useEffect(() => {
    if (data) {
      setLng(data.locale);
    }
  }, [data]);

  if (error) {
    console.error('Failed to fetch locale:', error);
  }

  const translator = useTransAlias(ns);
  const { i18n } = translator;
  useCustomTranslationImplem(i18n, lng ?? FALLBACK_LOCALE);
  return translator;
}