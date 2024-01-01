"use client";
import { Links, pages } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo } from "react";
import TypingText from "../typeText";
import MobileMenu from "./MobileMenu";
import LanguageMenu from "./LanguageMenu";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { mobileChange } from "@/store/redux/isMobile";
import { RootState } from "@/store";
import { scrollChange } from "@/store/redux/isScrolled";
import { tabletChange } from "@/store/redux/isTablet";
import { setScreenHeight } from "@/store/redux/screenHeight";
import { setScreenWidth } from "@/store/redux/screenWidth";
import { navbarChange } from "@/store/redux/navbarChange";
import { mobileMenuChange } from "@/store/redux/isMobileMenu";
import { clickableChange } from "@/store/redux/isClickable";

export const Navbar = () => {
  const isMobile = useSelector((state: RootState) => state.isMobile.mobile);
  const isTablet = useSelector((state: RootState) => state.isTablet.tablet);
  const isMenuOpen = useSelector(
    (state: RootState) => state.isMobileMenu.mobileMenu
  );
  const specialPages = useMemo(() => {
    return pages.filter((page) => page.href !== "/").map((page) => page.href);
  }, []);
  const selectedLink = useSelector(
    (state: RootState) => state.page.currentPage
  );
  const smallNav = useSelector(
    (state: RootState) => state.navbarChange.smallNav
  );
  const screenWidth = useSelector(
    (state: RootState) => state.screenWidth.width
  );
  const screenHeight = useSelector(
    (state: RootState) => state.screenHeight.height
  );
  const isClickable = useSelector(
    (state: RootState) => state.isClickable.clickable
  );
  const dispatch = useDispatch();
  const { t } = useTranslation(["index"]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        dispatch(scrollChange(true));
        setTimeout(() => {
          dispatch(scrollChange(false));
        }, 500);
        if (window.scrollY > 100) {
          dispatch(navbarChange(true));
        } else {
          dispatch(navbarChange(false));
        }
      };
      window.addEventListener("scroll", handleScroll);
      handleScroll();

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  useEffect(() => {
    if (typeof window != "undefined") {
      const handleResize = () => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        dispatch(setScreenHeight(screenHeight));
        dispatch(setScreenWidth(screenWidth));

        if (screenWidth <= 768) {
          dispatch(mobileChange(true));
          dispatch(tabletChange(false));
        } else if (screenWidth <= 1030) {
          dispatch(mobileChange(false));
          dispatch(tabletChange(true));
        } else {
          dispatch(mobileChange(false));
          dispatch(tabletChange(false));
          if (isMenuOpen) {
            dispatch(mobileMenuChange(false));
          }
        }
      };

      window.addEventListener("resize", handleResize);
      handleResize();

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [dispatch, isTablet, isTablet, screenWidth, screenHeight]);
  const handleMouseEnter = () => {
    if (isClickable == false) {
      dispatch(clickableChange(true));
    }
  };
  const handleMouseLeave = () => {
    if (isClickable == true) {
      dispatch(clickableChange(false));
    }
  };
  return (
    <nav
      className={`fixed w-[100svw] top-0 z-50 gap-4 bg-cool-gray-900 transition-all duration-1000 ease-in-out pointer-events-none px-${
        isMobile || isTablet ? 5 : 10
      } ${
        isMenuOpen
          ? `navbar pointer-events-auto h-[360px] py-5 bg-opacity-0 ${
              smallNav && "h-[320px] bg-opacity-100 py-2   "
            }`
          : smallNav || specialPages.includes(selectedLink)
          ? "bg-opacity-100 py-3 h-[80px]"
          : "py-5 bg-opacity-0 h-[150px] "
      }`}
    >
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex flex-row h-auto"
      >
        <Link href="/">
          <div className="flex flex-row items-center justify-center pointer-events-auto cursor-none">
            <Image
              src={"/logo_leftw.svg"}
              width={
                smallNav || specialPages.includes(selectedLink)
                  ? 12.5
                  : isMobile
                  ? 18.5
                  : isTablet
                  ? 27.5
                  : 32.5
              }
              height={100}
              alt="Crunchypix"
              loading="lazy"
              className={`${
                smallNav || specialPages.includes(selectedLink)
                  ? ""
                  : "navImage"
              } transition-all duration-1000 ease-in-out h-full pb-3`}
            />

            {smallNav || screenWidth <= 300 ? null : (
              <div
                className={`logo_text ${
                  smallNav || specialPages.includes(selectedLink)
                    ? "text-[25px]"
                    : isMobile
                    ? "text-[30px]"
                    : isTablet
                    ? "text-[45px]"
                    : "text-[60px]"
                } text-stone-50 transition-all duration-1000 ease-in-out`}
              >
                <TypingText text="Crunchy " _code={false} textClass={``} />

                <TypingText
                  text="Pix"
                  _code={false}
                  delay={460}
                  textClass={`text-log-col`}
                />
              </div>
            )}

            <div>
              <Image
                src={"logo_right.svg"}
                width={
                  smallNav || specialPages.includes(selectedLink)
                    ? 19.3
                    : isMobile
                    ? 28
                    : isTablet
                    ? 40
                    : 50
                }
                height={100}
                alt="Crunchypix"
                loading="lazy"
                className={`${
                  smallNav ? "" : "navImage"
                } transition-all duration-1000 ease-in-out`}
              />
            </div>
          </div>
        </Link>
        <div className="flex flex-center items-center ml-auto pointer-events-auto">
          {isMobile || isTablet ? (
            <MobileMenu />
          ) : (
            <div>
              <ul
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`flex max-lg:text-base max-xl:gap-6 max-lg:gap-5 transition-all  duration-1000 ease-in-out ${
                  smallNav || specialPages.includes(selectedLink)
                    ? "text-md font-medium gap-8"
                    : "text-lg font-semibold"
                }  text-stone-200 antialiased gap-12 `}
              >
                {Links.map((link) => (
                  <Link
                    href={link.href}
                    key={link.key}
                    className={`hover:text-log-col hover:scale-110 cursor-none  ${
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
                <div
                  className="h-auto w-auto flex justify-center"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <LanguageMenu />
                </div>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
