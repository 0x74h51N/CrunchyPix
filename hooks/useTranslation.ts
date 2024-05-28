import { useTranslation as useTransAlias } from 'react-i18next';
import { getLocale, useCustomTranslationImplem } from '@/i18n/client';


export function useTranslation(ns: string | string[]) {
    const lng = getLocale();
  
  
    const translators = Array.isArray(ns)
      ? ns.map(namespace => useTransAlias(namespace))
      : [useTransAlias(ns)];
    
    const { i18n } = translators[0];
    useCustomTranslationImplem(i18n, lng);
  
    const t = (key: string) => {
      if (!Array.isArray(ns)) {
        return translators[0].t(key); 
      }
  
      const [namespace, ...rest] = key.split(':');
      const namespaceKey = rest.join(':');
      const translator = translators.find(t => t.t(`${namespace}:${namespaceKey}`) !== `${namespace}:${namespaceKey}`);
      return translator ? translator.t(`${namespace}:${namespaceKey}`) : key;
    };
  
    return { t };
  }