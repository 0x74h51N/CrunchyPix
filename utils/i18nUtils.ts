import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const useTranslationWithLoader = () => {
  const { t, i18n } = useTranslation(["translation"]);
  const [isTranslationsLoaded, setIsTranslationsLoaded] = useState(false);

  useEffect(() => {
    const handleInitialized = () => {
      setIsTranslationsLoaded(true);
    };

    if (i18n.isInitialized) {
      setIsTranslationsLoaded(true);
    } else {
      i18n.on("initialized", handleInitialized);
    }

    return () => {
      i18n.off("initialized", handleInitialized);
    };
  }, [i18n]);

  return { t, isTranslationsLoaded };
};
