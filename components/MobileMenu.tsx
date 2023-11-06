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
        _Scrolled ? `${NavLinks.length * 53}px` : `${NavLinks.length * 53}px`
      }`
    : "0";

  const mobileMenuStyle: CSSProperties = {
    position: "absolute",
    left: 0,
    display: "flex",
    height: menuHeight,
    transition:
      "height 0.5s ease, padding 1s ease, margin 0.7s ease, background-color 1s ease",
    width: "100vw",
    flexDirection: "column",
    paddingTop: isMenuOpen ? "18px" : "0",
    marginTop: Scrolled ? 50 : 80,
    zIndex: -10,
    backdropFilter: "blur(10px)",
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
              {NavLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    key={link.key}
                    className={`w-20 block py-2 text-lg font-semibold text-right mr-14 text-neutral-200 antialiased gap-12 ml-auto hover:text-log-col hover:border-b hover:border-log-col`}
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
