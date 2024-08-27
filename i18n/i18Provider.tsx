'use client';
import i18n, { useClientLanguageSetup } from './client';
import { I18nextProvider } from 'react-i18next';
import { Locales } from './settings';

type Props = {
  children: React.ReactNode;
};

export const AppI18nProvider = function ({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: Locales;
}) {
  useClientLanguageSetup(lang);
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
