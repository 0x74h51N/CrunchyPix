"use client";
import { NavLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import TypingText from "./typeText";

export const Navbar = () => {
  const session = {};
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [textHide, setTextHide] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  const toggleMenu = () => {
    console.log("Toggle menu clicked");
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 950) {
        setTextHide(true);
        if (window.innerWidth <= 710) {
          setIsMobile(true);
        } else {
          setIsMobile(false);
        }
      } else {
        setTextHide(false);
        setIsMobile(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav
      className={`bg-back-col fleBetween navbar fixed w-full top-0 z-50 ${
        isScrolled
          ? "bg-opacity-100 smallNavbar shadow-stone-900 shadow-sm"
          : "bg-opacity-0"
      }`}
    >
      <div className="flex flex-row ">
        <div>
          <Image
            src={"/logo_left.svg"}
            width={isMobile || isScrolled ? 35 : 50}
            height={100}
            alt="Flexible"
            loading="lazy"
            className={isScrolled ? "" : "navImage"}
          />
        </div>
        <div className="flex flex-row flex-center items-center mr-2">
          {isScrolled || isMobile ? null : textHide ? null : (
            <TypingText text="CruncyPix" _code={false} textClass="logo_text" />
          )}
        </div>
        <div>
          <Image
            src={"logo_right.svg"}
            width={isMobile || isScrolled ? 35 : 50}
            height={100}
            alt="Flexible"
            loading="lazy"
            className={` ${isScrolled ? "" : "ml-2 navImage"}`}
          />
        </div>

        <div className="flex flex-center items-center  ml-auto">
          {isMobile ? (
            <div className="flex flex-col  ">
              <button className="flex flex-col  p-3 gap-1" onClick={toggleMenu}>
                <div
                  className={`burger-icon ${isMenuOpen ? "open" : ""}`}
                ></div>
                <div
                  className={`burger-icon ${isMenuOpen ? "open" : ""}`}
                ></div>
                <div
                  className={`burger-icon ${isMenuOpen ? "open" : ""}`}
                ></div>
              </button>
              <div>
                {isMobile && (
                  <div className={` mobile-menu ${isMenuOpen ? "open" : ""}`}>
                    <ul>
                      {NavLinks.map((link) => (
                        <li key={link.key}>
                          <Link
                            href={link.href}
                            key={link.key}
                            className={`block py-2 ${
                              isScrolled ? "text" : "text-lg font-semibold"
                            }  text-stone-700 antialiased gap-12 hover:text-log-col`}
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
          ) : (
            <div className="navbarHidden ">
              <ul
                className={`flex  ${
                  isScrolled ? "text-small" : "text-lg font-semibold"
                }  text-stone-700 antialiased gap-12`}
              >
                {NavLinks.map((link) => (
                  <Link
                    href={link.href}
                    key={link.key}
                    className=" hover:text-log-col"
                  >
                    {link.text}
                  </Link>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
