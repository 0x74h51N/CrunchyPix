import { Links } from "@/constants";
import Link from "next/link";
import React, { useContext, useEffect, useRef, useState } from "react";
import BurgerButton from "./BurgerButton";
import { useTranslation } from "react-i18next";
import LanguageMenu from "./LanguageMenu";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { DropdownContext } from "@/context/DropdownContext";

const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { isDropdownOpen } = useContext(DropdownContext)!;
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const specialPages = Links.filter((link) => link.href !== "/").map(
    (link) => link.href
  );
  const selectedLink = useSelector(
    (state: RootState) => state.page.currentPage
  );
  const isScrolled = useSelector(
    (state: RootState) => state.isScrolled.scrolled
  );
  const { t } = useTranslation(["translation"]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        isDropdownOpen == false
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [menuRef, isDropdownOpen]);

  return (
    <div ref={menuRef} className="flex flex-col">
      <BurgerButton
        color={"#FFFFFF"}
        width={40}
        height={40}
        isToggled={isMenuOpen}
        onClick={toggleMenu}
      />
      <div
        className={`mobile-menu w-full ${isMenuOpen ? "open" : ""} ${
          isScrolled || specialPages.includes(selectedLink)
            ? "mt-14 bg-nav-col"
            : "mt-24"
        }`}
      >
        {isMenuOpen && (
          <div>
            <ul className="ul">
              <div className="flex justify-end mr-14 mb-3">
                <LanguageMenu />
              </div>
              {Links.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    key={link.key}
                    className={`hover:text-log-col ${
                      selectedLink === link.href && link.href !== "/"
                        ? "text-log-col"
                        : "text-neutral-200"
                    } w-20 block relative group py-2 rtl text-lg font-semibold text-right mr-14  antialiased ml-auto transition duration-500 ease-in-out  whitespace-nowrap`}
                  >
                    {t(link.text)}
                    <span
                      className={`absolute -bottom-1 right-0 h-0.5 bg-log-col ${
                        selectedLink === link.href && link.href !== "/"
                          ? "w-full"
                          : "w-0 transition-all group-hover:w-full"
                      }`}
                    ></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
