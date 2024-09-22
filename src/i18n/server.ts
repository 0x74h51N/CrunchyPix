import { createInstance } from 'i18next';
import resourcesToBackend from './resourcesToBackend';
import { initReactI18next } from 'react-i18next/initReactI18next';
import {
  FALLBACK_LOCALE,
  getOptions,
  Locales,
  NEXT_LOCALE,
  supportedLocales,
} from './settings';
import { cookies, headers } from 'next/headers';
import { NextRequest } from 'next/server';

async function initI18next(lang: Locales, namespace: string) {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (lang: string, ns: string) => import(`./locales/${lang}/${ns}.json`),
      ),
    )
    .init(getOptions(lang, namespace));

  return i18nInstance;
}

export async function createTranslation(ns: string) {
  const lang = getLocale();
  const i18nextInstance = await initI18next(lang, ns);

  return {
    t: i18nextInstance.getFixedT(lang, ns),
  };
}

export function getLocale(req?: NextRequest) {
  const urlLang = req ? req.nextUrl.pathname.split('/')[1] : null;

  if (urlLang && supportedLocales.includes(urlLang as Locales)) {
    return urlLang as Locales;
  }

  const preferredLanguageHeader = headers().get('x-preferred-language');
  if (
    preferredLanguageHeader &&
    supportedLocales.includes(preferredLanguageHeader as Locales)
  ) {
    return preferredLanguageHeader as Locales;
  }

  const cookieLang = cookies().get(NEXT_LOCALE)?.value;
  if (cookieLang && supportedLocales.includes(cookieLang as Locales)) {
    return cookieLang as Locales;
  }

  return FALLBACK_LOCALE;
}
