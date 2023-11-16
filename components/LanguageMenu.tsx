"use client";
import { RootState } from "@/store";
import { langChange } from "@/store/redux/language";
import i18n from "@/utils/i18n";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DE, TR, US } from "country-flag-icons/react/3x2";
import Image from "next/image";
import { DropdownContext } from "@/context/DropdownContext";
import { Links } from "@/constants";
import RootLayout from "@/app/layout";

const LanguageMenu = () => {
  const [isRotated, setIsRotated] = useState(false);
  const dispatch = useDispatch();
  const langMenuRef = useRef<HTMLDivElement | null>(null);
  const { isDropdownOpen, setIsDropdownOpen } = useContext(DropdownContext)!;
  const [currentLanguage, setCurrentLanguage] = useState("");

  const specialPages = Links.filter((link) => link.href !== "/").map(
    (link) => link.href
  );
  const selectedLink = useSelector(
    (state: RootState) => state.page.currentPage
  );

  const isMobile = useSelector((state: RootState) => state.isMobile.mobile);
  const isScrolled = useSelector(
    (state: RootState) => state.isScrolled.scrolled
  );

  const handleToggleDropdown = () => {
    setIsRotated(!isRotated);
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleChange = (selectedLanguage: string) => {
    dispatch(langChange(selectedLanguage));
    i18n.changeLanguage(selectedLanguage);
    setCurrentLanguage(selectedLanguage);
    localStorage.setItem("selectedLanguage", selectedLanguage);
    setIsRotated(!isRotated);
    setIsDropdownOpen(!isDropdownOpen);
  };
  useEffect(() => {
    const storedLanguage = localStorage.getItem("selectedLanguage");
    if (storedLanguage) {
      dispatch(langChange(storedLanguage));
      i18n.changeLanguage(storedLanguage);
      setCurrentLanguage(storedLanguage);
    }
  }, [dispatch]);

  useEffect(() => {
    if (isMobile && isDropdownOpen) {
      setIsDropdownOpen(false);
      setIsRotated(false);
    }
  }, [isMobile]);

  useEffect(() => {
    const handleOutsideClick = (event: { target: any }) => {
      if (
        langMenuRef.current &&
        !langMenuRef.current.contains(event.target) &&
        isDropdownOpen
      ) {
        setIsRotated(false);
        setIsDropdownOpen(!isDropdownOpen);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [langMenuRef, isDropdownOpen]);
  return (
    <div ref={langMenuRef} className="flex flex-center items-center">
      <button
        onClick={handleToggleDropdown}
        className="flex flex-row gap-1 items-center bg-transparent"
      >
        <div className="w-6">
          {currentLanguage === "en" ? (
            <span>
              <US title="United States" />
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
              <US title="United States" />
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
        className={`relative mobile-menu text-neutral-200 w-20 right-10 ${
          isMobile ? "openM mt-12 mr-2" : ""
        } ${
          isDropdownOpen
            ? "open2 border-2 border-nav-col border-opacity-40"
            : "close"
        } ${
          isScrolled || specialPages.includes(selectedLink)
            ? "mt-12 bg-nav-col flex justify-center"
            : "mt-24"
        }`}
      >
        {isDropdownOpen && (
          <ul className="ul">
            <li
              className="hover:text-log-col transition duration-1000 ease-in-out cursor-pointer"
              onClick={() => handleChange("en")}
            >
              <div className="flex items-center gap-1">
                <US title="United States" />
                <span>EN</span>
              </div>
            </li>

            <li
              className="hover:text-log-col transition duration-1000 ease-in-out cursor-pointer"
              onClick={() => handleChange("de")}
            >
              <div className="flex items-center gap-1">
                <DE title="Germany" />
                <span>DE</span>
              </div>
            </li>

            <li
              className="hover:text-log-col transition duration-1000 ease-in-out cursor-pointer"
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
