import React, { useEffect } from "react";
import Image from "next/image";
import { footerLinks } from "@/constants";
import Link from "next/link";
import Contact from "./Contact";

type ColumnProps = {
  title: string;
  links: Array<string>;
};

const FooterColumn = ({ title, links }: ColumnProps) => (
  <div className="footer_column">
    <h4 className="font-semibold">{title}</h4>
    <ul className="flex flex-col gap-2 font-normal">
      {links.map((link) => (
        <Link href="/" key={link}>
          {link}
        </Link>
      ))}
    </ul>
  </div>
);
const Footer = () => {
  useEffect(() => {
    const lines = document.querySelectorAll(".line");
    const footerElement = document.querySelector("footer");

    if (footerElement) {
      const footerHeight = footerElement.clientHeight;

      const randomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      };

      lines.forEach((line) => {
        for (let i = 0; i < 50; i++) {
          const box = document.createElement("div");
          box.className = "w-1 h-1 relative z-0 box";
          box.style.top = `-${footerHeight}px`;
          box.style.left = `${Math.random() * 100}vw`;
          box.style.backgroundColor = randomColor();
          box.style.animation = `fall ${
            Math.random() * 4 + 1
          }s linear infinite`;
          line.appendChild(box);
        }
      });
    }
  }, []);
  return (
    <footer className="flexflex-col justify-center footer ">
      <div className="relative overflow-hidden">
        <div className="grid grid-cols-3">
          <div className="h-1 line"></div>
          <div className="h-1 line"></div>
          <div className="h-1 line"></div>
          <div className="h-1 line"></div>
          <div className="h-1 line"></div>
          <div className="h-1 line"></div>
          <div className="h-1 line"></div>
          <div className="h-1 line"></div>
          <div className="h-1 line"></div>
          <div className="h-1 line"></div>
          <div className="h-1 line"></div>
          <div className="h-1 line"></div>
          <div className="h-1 line"></div>
          <div className="h-1 line"></div>
          <div className="h-1 line"></div>
        </div>
        <div className="lg:px-20 pt-0 pe-6 px-5 ">
          <div className="w-full  relative z-10">
            <Image src="/logo_L.svg" width={250} height={38} alt="Flexibble" />
          </div>
          <div className="flex flex-row  w-full z-10">
            <div className="flex flex-col gap12 w-1/5">
              <div className="flex items-start flex-col">
                <p className="text-start text-white text-l font-medium mt-5 max-w-xs">
                  Unleash the Power of Web Innovation
                </p>
                <p className="text-start text-white text-sm font-normal mt-3 max-w-xs">
                  We're your trusted partner in web development. Our mission is
                  to bring your digital dreams to life. Let's create something
                  amazing together!
                </p>
              </div>
              <div className="flex flex-wrap gap-10 mt-5 z-10">
                <div className="flex-1 flex flex-col gap-4">
                  <FooterColumn
                    title={footerLinks[1].title}
                    links={footerLinks[1].links}
                  />
                  <FooterColumn
                    title={footerLinks[2].title}
                    links={footerLinks[2].links}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-7 w-3/5 ml-auto z-10">
              <p className="text-start text-zinc-200 text-xl font-medium mt-5 max-w-xs">
                Contact with me!
              </p>
              <Contact />
            </div>
          </div>
          <div className="flexBetween footer_copyright">
            <p>@ 2023 CrunchyPix. All right reserved</p>
            <p className="text-gray">
              <span className="text-black font-semibold">10</span> projects
              submitted
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
