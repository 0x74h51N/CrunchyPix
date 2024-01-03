"use client";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const changeLanguage = (lng: string) => {
  i18n.changeLanguage(lng);
};
i18n.use(initReactI18next).init({
  resources: {
    en: {
      home: require("@/locales/en/home.json"),
      index: require("@/locales/en/index.json"),
      policies: require("@/locales/en/policies.json"),
      portfolio: require("@/locales/en/portfolio.json"),
    },
    tr: {
      home: require("@/locales/tr/home.json"),
      index: require("@/locales/tr/index.json"),
      policies: require("@/locales/tr/policies.json"),
      portfolio: require("@/locales/tr/portfolio.json"),
    },
    de: {
      home: require("@/locales/de/home.json"),
      index: require("@/locales/de/index.json"),
      policies: require("@/locales/de/policies.json"),
      portfolio: require("@/locales/de/portfolio.json"),
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
