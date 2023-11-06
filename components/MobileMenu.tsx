import { NavLinks } from "@/constants";
import Link from "next/link";
import React, { CSSProperties, useContext, useState } from "react";
import BurgerButton from "./BurgerButton";
import { Scrolled } from "./Navbar";

const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const _Scrolled = useContext(Scrolled);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const menuHeight = isMenuOpen
    ? ` ${
        _Scrolled ? `${NavLinks.length * 50}px` : `${NavLinks.length * 60}px`
      }`
    : "0";
  const paddingTop = isMenuOpen ? (_Scrolled ? "20px" : "60px") : "0";
  const mobileMenuStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    display: "flex",
    height: menuHeight,
    transition: "height 1s ease, padding 1s ease",
    width: "100vw",
    flexDirection: "column",
    padding: 0,
    paddingTop: paddingTop,
    marginTop: 50,
    zIndex: -10,
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
      <div style={mobileMenuStyle} className="bg-nav-col">
        {isMenuOpen && (
          <div>
            <ul style={listStyle}>
              {NavLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    key={link.key}
                    className={`w-20 block py-2 text-lg font-semibold text-neutral-200 antialiased gap-12 ml-6 hover:text-log-col hover:border-b hover:border-log-col`}
                  >
                    {link.text}
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
