"use client";
import { NavLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const Navbar = () => {
  const session = {};
  const [isScrolled, setIsScrolled] = useState(window.scrollY > 100);

  const handleScroll = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav
      className={`bg-back-col fleBetween navbar fixed w-full top-0 z-0 ${
        isScrolled ? "bg-opacity-100 smallNavbar shadow-lg" : "bg-opacity-0"
      }`}
    >
      <div className="flex flexCenter gap-10 ">
        <Link href="/">
          <Image
            src={isScrolled ? "/logoS.png" : "/logoL.png"}
            width={isScrolled ? 50 : 200}
            height={100}
            alt="Flexible"
            loading="lazy"
          />
        </Link>
        <div className="  ml-auto">
          <ul
            className={`xl:flex hidden  ${
              isScrolled ? "text-small" : "text-lg font-semibold"
            }  text-stone-200 antialiased gap-12`}
          >
            {NavLinks.map((link) => (
              <Link
                href={link.href}
                key={link.key}
                className=" hover:text-slate-500"
              >
                {link.text}
              </Link>
            ))}
          </ul>
        </div>
      </div>
      <div className="flexCenter gap-4">
        {/* {session ? (
          <>
            UserPhoto
            <Link href="/create-project">Share Work</Link>
          </>
        ) : (
          <AuthProviders />
        )} */}
      </div>
    </nav>
  );
};
