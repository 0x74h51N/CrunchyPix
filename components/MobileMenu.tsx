import { Links } from "@/constants";
import Link from "next/link";
import React, { CSSProperties, useContext, useState } from "react";
import BurgerButton from "./BurgerButton";
import { Scrolled } from "./Navbar";
import { useTranslation } from "react-i18next";
import LanguageMenu from "./LanguageMenu";

const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const _Scrolled = useContext(Scrolled);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const { t } = useTranslation(["translation"]);

  const mobileMenuStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    backdropFilter: "blur(15px)",
    height: isMenuOpen ? `${Links.length * 63}px` : "0",
    transition: "height 1s ease, padding 1s ease, background-color 1s ease",
    width: "100vw",
    flexDirection: "column",
    paddingTop: isMenuOpen ? "35px" : "0",
    marginTop: 50,
    zIndex: -10,
    backgroundColor: _Scrolled ? "#3b3b3b" : "transparent",
  };
  const listStyle: CSSProperties = {
    opacity: 0,
    animation: "1s appear forwards",
    animationDelay: "0.5s",
  };

  return (
    <div className="flex flex-col  ">
      <BurgerButton
        color={"#FFFFFF"}
        width={40}
        height={40}
        isToggled={isMenuOpen}
        onClick={toggleMenu}
      />
      <div style={mobileMenuStyle}>
        {isMenuOpen && (
          <div>
            <ul style={listStyle}>
              <div className="flex justify-end mr-14 mb-3">
                <LanguageMenu />
              </div>
              {Links.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    key={link.key}
                    className={`w-20 block py-2 rtl text-lg font-semibold text-right mr-14 text-neutral-200 antialiased ml-auto hover:text-log-col hover:border-b hover:border-log-col whitespace-nowrap`}
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
