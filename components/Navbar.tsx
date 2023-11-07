"use client";
import { Links } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, createContext } from "react";
import TypingText from "./typeText";
import MobileMenu from "./MobileMenu";
import LanguageMenu from "./LanguageMenu";
import { useTranslation } from "react-i18next";

export const Scrolled = createContext(false);

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
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
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const { t, i18n } = useTranslation(["translation"]);

  const [isTranslationsLoaded, setIsTranslationsLoaded] = useState(false);
  useEffect(() => {
    if (i18n.isInitialized) {
      setIsTranslationsLoaded(true);
    } else {
      i18n.on("initialized", () => {
        setIsTranslationsLoaded(true);
      });
    }
  }, [i18n]);
  if (!isTranslationsLoaded) {
    return null;
  }

  return (
    <Scrolled.Provider value={isScrolled}>
      <nav
        className={`bg-opacity-0 bg-nav-col fleBetween navbar fixed w-full top-0 z-50 ${
          isScrolled ? "bg-opacity-100 smallNavbar" : ""
        }`}
      >
        <div className="flex flex-row ">
          <Link href="/">
            <div className="flex flex-row items-center">
              <div>
                <Image
                  src={"/logo_leftw.svg"}
                  width={isScrolled ? 12.5 : isMobile ? 18.5 : 32.5}
                  height={100}
                  alt="Flexible"
                  loading="lazy"
                  className={isScrolled ? "" : "navImage"}
                />
              </div>

              {isScrolled ? null : (
                <TypingText
                  text="CruncyPix"
                  _code={false}
                  _logo={true}
                  textClass="logo_text"
                />
              )}

              <div>
                <Image
                  src={"logo_right.svg"}
                  width={isScrolled ? 20 : isMobile ? 28 : 50}
                  height={100}
                  alt="Flexible"
                  loading="lazy"
                  className={isScrolled ? "" : "navImage"}
                />
              </div>
            </div>
          </Link>
          <div className="flex flex-center items-center  ml-auto">
            {isMobile ? (
              <MobileMenu />
            ) : (
              <div>
                <ul
                  className={`flex max-lg:text-base max-lg:gap-5 ${
                    isScrolled
                      ? "text-md font-medium gap-8"
                      : "text-lg font-semibold"
                  }  text-stone-200 antialiased gap-12`}
                >
                  {Links.map((link) => (
                    <Link
                      href={link.href}
                      key={link.key}
                      className="hover:text-log-col transition duration-1000 ease-in-out"
                    >
                      {t(link.text)}
                    </Link>
                  ))}
                  <LanguageMenu />
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </Scrolled.Provider>
  );
};
