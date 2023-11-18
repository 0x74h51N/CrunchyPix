"use client";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const changeLanguage = (lng: string) => {
  i18n.changeLanguage(lng);
};
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: require("@/locales/en.json"),
    },
    tr: {
      translation: require("@/locales/tr.json"),
    },
    de: {
      translation: require("@/locales/de.json"),
    },
  },
  lng: "en-US",
  fallbackLng: "tr-TR",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
export { changeLanguage };
