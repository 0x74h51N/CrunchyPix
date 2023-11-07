"use client";

import i18n from "@/utils/i18n";
import { I18nextProvider } from "react-i18next";

type Props = {
  children: React.ReactNode;
};

export const AppI18nProvider: React.FC<Props> = function ({ children }) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
