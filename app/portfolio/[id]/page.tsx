"use client";
import { portfolioPageItems } from "@/constants/portfolioPageItems";
import { RootState } from "@/store";
import { setIsTranslationsLoaded } from "@/store/redux/language";
import i18n from "@/utils/i18n";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const PortfolioPage = () => {
  const pathname = usePathname();
  const [id, setId] = useState("");
  const dispatch = useDispatch();
  const { t } = useTranslation(["home"]);
  const isTranslationsLoadedRedux = useSelector(
    (state: RootState) => state.language.isTranslationsLoaded
  );
  useEffect(() => {
    const handleInitialized = () => {
      dispatch(setIsTranslationsLoaded(true));
    };

    if (i18n.isInitialized) {
      handleInitialized();
    } else {
      i18n.on("initialized", handleInitialized);
    }

    return () => {
      i18n.off("initialized", handleInitialized);
    };
  }, [dispatch]);

  useEffect(() => {
    const updatePageInfo = () => {
      const urlParts = pathname.split("/");
      const _id = urlParts[2];

      setId(_id);
    };

    updatePageInfo();

    const handlePopState = () => {
      updatePageInfo();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [pathname, setId]);
  if (!isTranslationsLoadedRedux) {
    return null;
  }
  const selectedItem = portfolioPageItems.find(
    (item) => item._id.toLowerCase() === id
  );

  if (!selectedItem) {
    return <p>Portföy öğesi bulunamadı.</p>;
  }

  return (
    <div>
      <h1>{t(selectedItem.title)}</h1>
    </div>
  );
};

export default PortfolioPage;
