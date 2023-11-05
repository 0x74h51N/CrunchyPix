"use client";
import { NavLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import TypingText from "./typeText";
import MobileMenu from "./MobileMenu";

export const Navbar = () => {
  const session = {};
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setTablet] = useState(false);

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
      if (window.innerWidth <= 770) {
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

  return (
    <nav
      className={`${
        isMobile ? "bg-opacity-100" : "bg-opacity-0 "
      }( bg-zinc-600 fleBetween navbar fixed w-full top-0 z-50 ${
        isScrolled ? "bg-opacity-100 smallNavbar" : ""
      }`}
    >
      <div className="flex flex-row ">
        <Link href="/">
          <div className="flex flex-row items-center">
            <div>
              <Image
                src={"/logo_left.svg"}
                width={isScrolled ? 20 : isMobile ? 28 : 50}
                height={100}
                alt="Flexible"
                loading="lazy"
                className={isScrolled ? "" : "navImage"}
              />
            </div>
            <div className="flex justify-center items-center mr-2">
              {isScrolled ? null : (
                <TypingText
                  text="CruncyPix"
                  _code={false}
                  textClass="logo_text"
                />
              )}
            </div>
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
            <div className="navbarHidden">
              <ul
                className={`flex max-lg:text-base max-lg:gap-5 ${
                  isScrolled ? "text-small" : "text-lg font-semibold"
                }  text-stone-200 antialiased gap-12`}
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
