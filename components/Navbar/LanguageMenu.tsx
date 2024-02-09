"use client";
import { RootState } from "@/store";
import { langChange, setIsTranslationsLoaded } from "@/store/redux/language";
import i18n from "@/utils/i18n";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DE, TR, GB } from "country-flag-icons/react/3x2";
import Image from "next/image";
import { languageMenuChange } from "@/store/redux/isLanguageMenu";
import { clickableChange } from "@/store/redux/isClickable";
import { getCookie, setCookie } from "cookies-next";

const LanguageMenu = () => {
  const isDropdownOpen = useSelector(
    (state: RootState) => state.isLanguageMenu.languageMenu
  );
  const [isRotated, setIsRotated] = useState(false);
  const dispatch = useDispatch();
  const langMenuRef = useRef<HTMLDivElement | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState("");
  const isClickable = useSelector(
    (state: RootState) => state.isClickable.clickable
  );
  const isMobile = useSelector((state: RootState) => state.isMobile.mobile);
  const isTablet = useSelector((state: RootState) => state.isTablet.tablet);
  const smallNav = useSelector(
    (state: RootState) => state.navbarChange.smallNav
  );
  const isTouch = useSelector((state: RootState) => state.isTouch.touch);
  const handleToggleDropdown = () => {
    setIsRotated(!isRotated);
    dispatch(languageMenuChange(!isDropdownOpen));
  };

  const handleChange = (selectedLanguage: string) => {
    dispatch(langChange(selectedLanguage));
    i18n.changeLanguage(selectedLanguage);
    setCurrentLanguage(selectedLanguage);
    if (getCookie("cookiesConsent") === "true") {
      setCookie("selectedLanguage", selectedLanguage, {});
    }
    setIsRotated(!isRotated);
    dispatch(languageMenuChange(!isDropdownOpen));
    if (isClickable == true) {
      dispatch(clickableChange(false));
    }
  };

  useEffect(() => {
    const storedLanguage = getCookie("selectedLanguage");
    if (storedLanguage) {
      dispatch(langChange(storedLanguage));
      i18n.changeLanguage(storedLanguage).then(() => {
        setCurrentLanguage(storedLanguage);
        setIsTranslationsLoaded(true);
      });
    } else {
      setIsTranslationsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if ((isMobile || isTablet) && isDropdownOpen) {
      dispatch(languageMenuChange(false));
      setIsRotated(false);
    }
  }, [isMobile, isTablet]);

  useEffect(() => {
    const handleOutsideClick = (event: { target: any }) => {
      if (
        langMenuRef.current &&
        !langMenuRef.current.contains(event.target) &&
        isDropdownOpen
      ) {
        setIsRotated(false);
        dispatch(languageMenuChange(!isDropdownOpen));
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [langMenuRef, isDropdownOpen]);
  const handleMouseEnter = () => {
    if (!isTouch) {
      setIsRotated(true);
      dispatch(languageMenuChange(true));
    }
    if (isClickable == false) {
      dispatch(clickableChange(true));
    }
  };
  const handleMouseLeave = () => {
    if (!isTouch) {
      setIsRotated(false);
      dispatch(languageMenuChange(false));
    }
    if (isClickable == true) {
      dispatch(clickableChange(false));
    }
  };
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={langMenuRef}
      className="flex flex-center items-center"
    >
      <button
        onClick={handleToggleDropdown}
        className="flex flex-row gap-1 items-center bg-transparent cursor-none"
      >
        <div className="w-6">
          {currentLanguage === "en" ? (
            <span>
              <GB title="United Kingdom" />
            </span>
          ) : currentLanguage === "de" ? (
            <span>
              <DE title="Germany" />
            </span>
          ) : currentLanguage === "tr" ? (
            <span>
              <TR title="Turkey" />
            </span>
          ) : (
            <span>
              <GB title="United Kingdom" />
            </span>
          )}
        </div>
        <div>
          <Image
            src="/arrow.svg"
            alt="Arrow"
            width={8}
            height={8}
            loading="lazy"
            className={`transition-transform duration-500 ease-in-out ${
              isRotated ? "rotate" : ""
            }`}
          />
        </div>
      </button>
      <div
        className={`relative mobile-menu text-neutral-200 w-20 right-6 bg-cool-gray-800 rounded-lg shadow-sm shadow-black  ${
          isDropdownOpen
            ? "open2 border-2 border-cool-gray-700 border-opacity-40"
            : "close"
        } ${
          smallNav
            ? `${isMobile || isTablet ? "mt-6" : "mt-12"} flex justify-center`
            : isMobile || isTablet
            ? `mt-6 flex justify-center`
            : "mt-[108px]"
        } 
        `}
      >
        {isDropdownOpen && (
          <ul className="ul">
            <li
              className="hover:text-log-col transition duration-300 ease-in-out cursor-none"
              onClick={() => handleChange("en")}
            >
              <div className="flex items-center gap-1">
                <GB title="United Kingdom" />
                <span>EN</span>
              </div>
            </li>

            <li
              className="hover:text-log-col transition duration-300 ease-in-out cursor-none"
              onClick={() => handleChange("de")}
            >
              <div className="flex items-center gap-1">
                <DE title="Germany" />
                <span>DE</span>
              </div>
            </li>

            <li
              className="hover:text-log-col transition duration-300 ease-in-out cursor-none"
              onClick={() => handleChange("tr")}
            >
              <div className="flex items-center gap-1">
                <TR title="Turkey" />
                <span>TR</span>
              </div>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default LanguageMenu;
