import { NavLinks } from "@/constants";
import Link from "next/link";
import React, { CSSProperties, useState } from "react";
import BurgerButton from "./BurgerButton";

const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const mobileMenuStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    display: "flex",
    height: isMenuOpen ? "calc(100vh)" : "0",
    transition: "height 0.5s ease",
    width: "100vw",
    flexDirection: "column",
    padding: 0,
    marginTop: 50,
    zIndex: -10,
  };
  const listStyle: CSSProperties = {
    paddingTop: 40,
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
                    className={` w-20 block py-2 text-lg font-semibold text-neutral-200 antialiased gap-12 ml-6 hover:text-log-col hover:border-b hover:border-log-col`}
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
