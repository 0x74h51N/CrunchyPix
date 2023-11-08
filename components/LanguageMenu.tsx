import { RootState } from "@/store";
import { langChange } from "@/store/redux/language";
import i18n from "@/utils/i18n";
import Link from "next/link";
import React, { CSSProperties, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DE, TR, US } from "country-flag-icons/react/3x2";
import Image from "next/image";

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
      <button
        onClick={handleToggleDropdown}
        className="flex flex-row gap-1 items-center"
      >
        <div className=" w-6 bg-transparent text-base text-neutral-200 cursor-pointer hover:text-log-col transition duration-1000 ease-in-out">
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
            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0yOTMuNzUxLDQ1NS44NjhjLTIwLjE4MSwyMC4xNzktNTMuMTY1LDE5LjkxMy03My42NzMtMC41OTVsMCwwYy0yMC41MDgtMjAuNTA4LTIwLjc3My01My40OTMtMC41OTQtNzMuNjcyICBsMTg5Ljk5OS0xOTBjMjAuMTc4LTIwLjE3OCw1My4xNjQtMTkuOTEzLDczLjY3MiwwLjU5NWwwLDBjMjAuNTA4LDIwLjUwOSwyMC43NzIsNTMuNDkyLDAuNTk1LDczLjY3MUwyOTMuNzUxLDQ1NS44Njh6Ii8+DQo8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNMjIwLjI0OSw0NTUuODY4YzIwLjE4LDIwLjE3OSw1My4xNjQsMTkuOTEzLDczLjY3Mi0wLjU5NWwwLDBjMjAuNTA5LTIwLjUwOCwyMC43NzQtNTMuNDkzLDAuNTk2LTczLjY3MiAgbC0xOTAtMTkwYy0yMC4xNzgtMjAuMTc4LTUzLjE2NC0xOS45MTMtNzMuNjcxLDAuNTk1bDAsMGMtMjAuNTA4LDIwLjUwOS0yMC43NzIsNTMuNDkyLTAuNTk1LDczLjY3MUwyMjAuMjQ5LDQ1NS44Njh6Ii8+DQo8L3N2Zz4="
            alt="Arrow"
            width={8}
            height={8}
            loading="lazy"
          />
        </div>
      </button>
      <div
        className={`relative mobile-menu w-20 right-10 ${
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
                <div className="flex items-center gap-1">
                  <US title="United States" />
                  <span>EN</span>
                </div>
              </li>
            </Link>
            <Link href={""}>
              <li
                className="hover:text-log-col transition duration-1000 ease-in-out"
                onClick={() => handleChange("de")}
              >
                <div className="flex items-center gap-1">
                  <DE title="Germany" />
                  <span>DE</span>
                </div>
              </li>
            </Link>
            <Link href={""}>
              <li
                className="hover:text-log-col transition duration-1000 ease-in-out"
                onClick={() => handleChange("tr")}
              >
                <div className="flex items-center gap-1">
                  <TR title="Turkey" />
                  <span>TR</span>
                </div>
              </li>
            </Link>
          </ul>
        )}
      </div>
    </div>
  );
};

export default LanguageMenu;