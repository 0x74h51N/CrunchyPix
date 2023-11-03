import { NavLinks } from "@/constants";
import Link from "next/link";
import React, { useState } from "react";

const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = () => {
    if (isMenuOpen == true) {
      setIsMenuOpen(false);
      setTimeout(() => {
        setIsMenuVisible(false);
      }, 800);
    } else {
      setIsMenuVisible(true);
      setTimeout(() => {
        setIsMenuOpen(true);
      }, 60);
    }
  };

  const mobileMenuStyle = {
    display: isMenuVisible ? "" : "none",
    maxHeight: isMenuOpen ? "calc(100vh - 70px)" : "0",
    transition: "max-height 1s ease-in-out",
  };

  return (
    <div className="flex flex-col  ">
      <button
        className="flex flex-col burger-button p-3 gap-1"
        onClick={toggleMenu}
      >
        <div className={`burger-icon ${isMenuOpen ? "open" : ""}`}></div>
        <div className={`ml-2 burger-icon ${isMenuOpen ? "open" : ""}`}></div>
        <div className={`burger-icon ${isMenuOpen ? "open" : ""}`}></div>
      </button>
      <div>
        <div style={mobileMenuStyle} className={` mobile-menu `}>
          <ul>
            {NavLinks.map((link) => (
              <li key={link.key}>
                <Link
                  href={link.href}
                  key={link.key}
                  className={`block py-2 text-lg font-semibold text-stone-700 antialiased gap-12 hover:text-log-col`}
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
