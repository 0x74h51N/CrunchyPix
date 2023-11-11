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
          isScrolled ? "mt-10 scrolled" : "mt-24"
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
                    className={`w-20 block py-2 rtl text-lg font-semibold text-right mr-14 text-neutral-200 antialiased ml-auto hover:text-log-col transition duration-1000 ease-in-out hover:border-b hover:border-log-col whitespace-nowrap`}
                  >
                    {t(link.text)}
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
