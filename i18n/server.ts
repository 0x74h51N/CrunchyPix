import { createInstance } from 'i18next';
import resourcesToBackend from './resourcesToBackend';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { FALLBACK_LOCALE, getOptions, Locales } from './settings';
import { cookies, headers } from 'next/headers';

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

export function getLocale() {
  const preferredLanguageHeader = headers().get('x-preferred-language');
  if (preferredLanguageHeader) {
    return preferredLanguageHeader as Locales;
  }
  const cookieLang = cookies().get('preferred_language')?.value;
  return (cookieLang ?? FALLBACK_LOCALE) as Locales;
}
