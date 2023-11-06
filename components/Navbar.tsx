"use client";
import { NavLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import TypingText from "./typeText";
import MobileMenu from "./MobileMenu";

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
      if (window.innerWidth <= 800) {
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
      }( bg-nav-col fleBetween navbar fixed w-full top-0 z-50 ${
        isScrolled ? "bg-opacity-100 smallNavbar" : ""
      }`}
    >
      <div className="flex flex-row ">
        <Link href="/">
          <div className="flex flex-row items-center">
            <div>
              <Image
                src={"/logo_leftw.svg"}
                width={isScrolled ? 13.4 : isMobile ? 18.5 : 32.5}
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
                {NavLinks.map((link) => (
                  <Link
                    href={link.href}
                    key={link.key}
                    className=" hover:text-log-col transition duration-1000 ease-in-out"
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
