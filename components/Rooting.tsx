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
import Image from "next/image";

const Rooting = () => {
  const [mainPage, setMainPage] = useState("");
  const [childPage, setChildPage] = useState("");
  const [pageName, setPageName] = useState("");
  const pathname = usePathname();
  const isClickable = useSelector(
    (state: RootState) => state.isClickable.clickable
  );
  const dispatch = useDispatch();
  const { t } = useTranslation(["index", "portfolio"]);
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
      const currentPage = urlParts[1];
      if (urlParts[2]) {
        const currentChildPage = urlParts[2].replace("_", " ");
        setChildPage(currentChildPage);
      } else setChildPage("");
      setMainPage(currentPage);
      if (urlParts[1] == "portfolio" && urlParts[2]) {
        setPageName(t("portfolio:page.details"));
      }
    };

    updatePageInfo();

    const handlePopState = () => {
      updatePageInfo();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [pathname, setMainPage, setChildPage]);
  if (!isTranslationsLoadedRedux) {
    return null;
  }
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

  return (
    <div
      className="flex flex-col justify-center items-center w-full lg:h-[500px] md:h-[400px] h-[300px] md:p-10 p-2 overflow-hidden relative"
      style={{
        background: "radial-gradient(circle, rgba(0,0,0,0.7), rgba(0,0,0,1))",
        boxShadow: "inset 0 0 10px 5px rgba(0, 0, 0, 0.8)",
      }}
    >
      <Image
        src={`/${mainPage}.jpg`}
        alt={mainPage}
        fill
        quality={100}
        className="object-cover -z-10 h-[750px]"
      />
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="h1 mb-3 hover:scale-105 transition-all duration-500 ease-in-out cursor-none  md:mt-[220px] mt-36"
        style={{ textTransform: "capitalize" }}
      >
        {childPage ? (
          childPage === "crunchypix" ? (
            <span>
              {childPage.slice(0, -3)}
              <span className="text-log-col">
                {childPage.charAt(childPage.length - 3).toUpperCase()}
                {childPage.slice(-2)}
              </span>
            </span>
          ) : (
            childPage
          )
        ) : (
          t(`index:links.${mainPage}`)
        )}
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center ">
        <div className="flex flex-row items-center">
          <Link
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="md:text-2xl text-lg text-cool-gray-50 font-bold hover:scale-105 transition-all duration-500 ease-in-out cursor-none"
            href={`/`}
          >
            <span>Crunchy</span>
            <span className="text-log-col mr-5">Pix</span>
          </Link>
          <span className="text-log-col md:text-[20px] text-md">{"•"}</span>
          <Link
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`md:text-2xl text-lg ${
              childPage ? "text-cool-gray-50" : "text-log-col"
            } font-bold ml-2 hover:scale-105 transition-all duration-500 ease-in-out cursor-none`}
            href={`/${mainPage}`}
          >
            {t(`index:links.${mainPage}`)}
          </Link>
        </div>
        {childPage && (
          <div className="flex flex-row items-center">
            <span className="text-log-col md:text-[20px] text-md md:ml-5 ml-0">
              {"•"}
            </span>
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="md:text-2xl text-lg text-log-col font-bold ml-2 hover:scale-105 transition-all duration-500 ease-in-out cursor-none"
              style={{ textTransform: "capitalize" }}
            >
              {pageName}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rooting;
