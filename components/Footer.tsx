import React from "react";
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
  return (
    <footer className="flexStart footer">
      <div className="w-full">
        <Image src="/logoL.png" width={250} height={38} alt="Flexibble" />
      </div>
      <div className="flex flex-row  w-full">
        <div className="flex flex-col gap12 w-1/5">
          <div className="flex items-start flex-col">
            <p className="text-start text-white text-l font-medium mt-5 max-w-xs">
              Unleash the Power of Web Innovation
            </p>
            <p className="text-start text-white text-sm font-normal mt-3 max-w-xs">
              We're your trusted partner in web development. Our mission is to
              bring your digital dreams to life. Let's create something amazing
              together!
            </p>
          </div>
          <div className="flex flex-wrap gap-10 mt-5">
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
        <div className="flex flex-col gap-7 w-3/5 ml-auto">
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
    </footer>
  );
};

export default Footer;
