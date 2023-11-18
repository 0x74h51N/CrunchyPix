"use client";
import { Links } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import TypingText from "./typeText";
import MobileMenu from "./MobileMenu";
import LanguageMenu from "./LanguageMenu";
import { useSelector, useDispatch } from "react-redux";
import { mobileChange } from "@/store/redux/isMobile";
import { RootState } from "@/store";
import { scrollChange } from "@/store/redux/isScrolled";
import { DropdownProvider } from "@/context/DropdownContext";
import { useTranslationWithLoader } from "@/utils/i18nUtils";

export const Navbar = () => {
  const isMobile = useSelector((state: RootState) => state.isMobile.mobile);
  const specialPages = Links.filter((link) => link.href !== "/").map(
    (link) => link.href
  );
  const selectedLink = useSelector(
    (state: RootState) => state.page.currentPage
  );
  const isScrolled = useSelector(
    (state: RootState) => state.isScrolled.scrolled
  );
  const dispatch = useDispatch();
  const { t, isTranslationsLoaded } = useTranslationWithLoader();
  if (!isTranslationsLoaded) {
    return null;
  }

  const handleScroll = () => {
    if (window.scrollY > 100) {
      dispatch(scrollChange(true));
    } else {
      dispatch(scrollChange(false));
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
      if (window.innerWidth <= 1024) {
        dispatch(mobileChange(true));
      } else {
        dispatch(mobileChange(false));
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  return (
    <DropdownProvider>
      <nav
        className={`bg-opacity-0 bg-nav-col fleBetween navbar fixed w-full top-0 z-50 gap-4 transition-all duration-1000 ease-in-out ${
          isScrolled || specialPages.includes(selectedLink)
            ? "bg-opacity-100 py-2 px-10"
            : "py-5 px-10"
        }`}
      >
        <div className="flex flex-row ">
          <Link href="/">
            <div className="flex flex-row items-center">
              <div>
                <Image
                  src={"/logo_leftw.svg"}
                  width={
                    isScrolled || specialPages.includes(selectedLink)
                      ? 12.5
                      : isMobile
                      ? 18.5
                      : 32.5
                  }
                  height={100}
                  alt="Flexible"
                  loading="lazy"
                  className={`${
                    isScrolled || specialPages.includes(selectedLink)
                      ? ""
                      : "navImage"
                  } transition-all duration-700 ease-in-out`}
                />
              </div>

              {isScrolled ? null : (
                <>
                  <TypingText
                    text="Crunchy"
                    _code={false}
                    textClass={`logo_text ${
                      specialPages.includes(selectedLink) || isMobile
                        ? "small"
                        : ""
                    }`}
                  />
                  <TypingText
                    text="Pix"
                    _code={false}
                    delay={800}
                    textClass={`logo_text color ${
                      specialPages.includes(selectedLink) || isMobile
                        ? "small"
                        : ""
                    }`}
                  />
                </>
              )}

              <div>
                <Image
                  src={"logo_right.svg"}
                  width={
                    isScrolled || specialPages.includes(selectedLink)
                      ? 20
                      : isMobile
                      ? 28
                      : 50
                  }
                  height={100}
                  alt="Flexible"
                  loading="lazy"
                  className={`${
                    isScrolled ? "" : "navImage"
                  } transition-all duration-700 ease-in-out`}
                />
              </div>
            </div>
          </Link>
          <div className="flex flex-center items-center ml-auto">
            {isMobile ? (
              <MobileMenu />
            ) : (
              <div>
                <ul
                  className={`flex max-lg:text-base max-xl:gap-6 max-lg:gap-5 transition-all duration-1000 ease-in-out ${
                    isScrolled || specialPages.includes(selectedLink)
                      ? "text-md font-medium gap-8"
                      : "text-lg font-semibold"
                  }  text-stone-200 antialiased gap-12 `}
                >
                  {Links.map((link) => (
                    <Link
                      href={link.href}
                      key={link.key}
                      className={`hover:text-log-col hover:scale-110 ${
                        selectedLink === link.href && link.href !== "/"
                          ? "text-log-col"
                          : ""
                      } relative group transition-all duration-300 ease-in-out transform origin-bottom whitespace-nowrap`}
                    >
                      {t(link.text)}
                      <span
                        className={`absolute -bottom-1 left-0 h-0.5 bg-log-col ${
                          selectedLink === link.href && link.href !== "/"
                            ? "w-full"
                            : "w-0 transition-all group-hover:w-full"
                        }`}
                      ></span>
                    </Link>
                  ))}
                  <LanguageMenu />
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </DropdownProvider>
  );
};
