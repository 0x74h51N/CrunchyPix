import { RootState } from "@/store";
import { langChange } from "@/store/redux/language";
import i18n from "@/utils/i18n";
import Link from "next/link";
import React, { CSSProperties, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const LanguageMenu = () => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language
  );
  const isMobile = useSelector((state: RootState) => state.isMobile.mobile);
  const isScrolled = useSelector(
    (state: RootState) => state.isScrolled.scrolled
  );

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const handleToggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleChange = (selectedLanguage: string) => {
    dispatch(langChange(selectedLanguage));
    i18n.changeLanguage(selectedLanguage);
    setDropdownOpen(false);
  };

  const listStyle: CSSProperties = {
    opacity: 0,
    animation: "1s appear forwards",
    animationDelay: "0.5s",
    color: "white",
  };

  return (
    <div className="flex flex-center items-center">
      <div
        className=" bg-transparent text-base text-neutral-200 cursor-pointer hover:text-log-col transition duration-1000 ease-in-out"
        onClick={handleToggleDropdown}
      >
        {currentLanguage === "en"
          ? "EN"
          : currentLanguage === "de"
          ? "DE"
          : currentLanguage === "tr"
          ? "TR"
          : "EN"}
      </div>
      <div
        className={`relative mobile-menu right-10 ${
          isMobile ? "openM mt-11 mr-2" : ""
        } ${isDropdownOpen ? "open2 border-2 border-nav-col" : "close"} ${
          isScrolled ? "scrolled openM mt-11" : isMobile ? " mt-11" : " mt-24"
        }`}
      >
        {isDropdownOpen && (
          <ul style={listStyle}>
            <Link href={""}>
              <li
                className="hover:text-log-col transition duration-1000 ease-in-out"
                onClick={() => handleChange("en")}
              >
                EN
              </li>
            </Link>
            <Link href={""}>
              <li
                className="hover:text-log-col transition duration-1000 ease-in-out"
                onClick={() => handleChange("de")}
              >
                DE
              </li>{" "}
            </Link>
            <Link href={""}>
              <li
                className="hover:text-log-col transition duration-1000 ease-in-out"
                onClick={() => handleChange("tr")}
              >
                TR
              </li>{" "}
            </Link>
          </ul>
        )}
      </div>
    </div>
  );
};

export default LanguageMenu;
