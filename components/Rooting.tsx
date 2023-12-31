"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { RootState } from "@/store";
import { clickableChange } from "@/store/redux/isClickable";
import { setIsTranslationsLoaded } from "@/store/redux/language";
import i18n from "@/utils/i18n";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

const Rooting = () => {
  const [mainPage, setMainPage] = useState("");
  const [childPage, setChildPage] = useState("");
  const pathname = usePathname();
  const isClickable = useSelector(
    (state: RootState) => state.isClickable.clickable
  );
  const dispatch = useDispatch();
  const { t } = useTranslation(["index"]);
  const isTranslationsLoadedRedux = useSelector(
    (state: RootState) => state.language.isTranslationsLoaded
  );
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
  useEffect(() => {
    const updatePageInfo = () => {
      const urlParts = pathname.split("/");
      const currentPage = urlParts[1];
      const currentChildPage = urlParts[2];

      setMainPage(currentPage);
      setChildPage(currentChildPage);
    };

    updatePageInfo();

    window.addEventListener("popstate", updatePageInfo);

    return () => {
      window.removeEventListener("popstate", updatePageInfo);
    };
  }, [pathname]);
  const handleMouseEnter = () => {
    if (isClickable == false) {
      dispatch(clickableChange(true));
    }
  };
  const handleMouseLeave = () => {
    if (isClickable == true) {
      dispatch(clickableChange(false));
    }
  };
  const getPageTranslation = (mainPage: string) => {
    switch (mainPage) {
      case "portfolio":
        return t("links.Portfolio");
      case "about":
        return t("links.About");
      case "services":
        return t("links.Services");
      case "contact":
        return t("links.Contact");
      default:
        return mainPage;
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center w-full h-[220px] p-10 bg-cool-gray-900 mb-20">
        <span className="text-log-col text-[35px]">{"•"}</span>
        <Link
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="text-3xl text-cool-gray-50 font-bold ml-2 hover:scale-105 transition-all duration-500 ease-in-out cursor-none"
          href={`/${mainPage}`}
          style={{ textTransform: "capitalize" }}
        >
          {getPageTranslation(mainPage)}
        </Link>
        {childPage && (
          <>
            <span className="text-log-col text-[35px] ml-5">{"•"}</span>
            <Link
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="text-3xl text-cool-gray-50 font-bold ml-2 hover:scale-105 transition-all duration-500 ease-in-out cursor-none"
              href={`/${childPage}`}
              style={{ textTransform: "capitalize" }}
            >
              {childPage}
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Rooting;
