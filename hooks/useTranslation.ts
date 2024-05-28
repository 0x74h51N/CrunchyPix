import { useTranslation as useTransAlias } from 'react-i18next';
import { getLocale, useCustomTranslationImplem } from '@/i18n/client';


export function useTranslation(ns: string) {
  const lng = getLocale();
  const translator = useTransAlias(ns);
  const { i18n } = translator;
  useCustomTranslationImplem(i18n, lng);
  return translator;
}