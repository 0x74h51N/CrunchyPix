"use client";
import Construction from "@/components/Construction";
import { RootState } from "@/store";
import { setIsTranslationsLoaded } from "@/store/redux/language";
import React, { useEffect } from "react";
import { useTranslation } from "@/i18n/client";
import { useSelector, useDispatch } from "react-redux";

const Page = () => {
  const { i18n } = useTranslation("translation");
  const isTranslationsLoadedRedux = useSelector(
    (state: RootState) => state.language.isTranslationsLoaded
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (i18n.isInitialized) {
      dispatch(setIsTranslationsLoaded(true));
    } else {
      i18n.on("initialized", () => {
        dispatch(setIsTranslationsLoaded(true));
      });
    }
  }, [i18n, dispatch]);
  if (!isTranslationsLoadedRedux) {
    return null;
  }
  return <Construction />;
};

export default Page;
