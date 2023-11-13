"use client";
import Image from "next/image";
import { Links } from "@/constants";
import Link from "next/link";
import Contact from "./Contact";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { slideIn, staggerContainer } from "@/utils/motion";

const Footer = () => {
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
    <footer className="flex justify-center footer ">
      <motion.div
        variants={staggerContainer(0, 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="relative overflow-hidden"
      >
        <div className="lg:px-20 pt-14 pe-6 px-5  ">
          <div className="flexBetween max-md:flex-col w-full z-10">
            <motion.div
              variants={slideIn("left", "tween", 0.3, 1)}
              className="flex flex-col gap12  z-10 w-1/5 max-md:w-full"
            >
              <Image
                src="/LogoL.svg"
                width={250}
                height={100}
                alt="Flexibble"
              />
              <div className="flex items-start flex-col w-full">
                <p className="text-start text-stone-200 text-l font-medium mt-5 ">
                  {t("footer.title")}
                </p>
                <p className="text-start text-stone-200 text-sm font-normal mt-3 max-md:w-3/5">
                  {t("footer.description")}
                </p>
              </div>
              <div className="flex flex-wrap gap-10 mt-5 z-10">
                <div className="text-neutral-200 flex-1 flex flex-col gap-4">
                  <div>
                    <ul>
                      {Links.map((link) => (
                        <li key={link.key}>
                          <Link
                            href={link.href}
                            key={link.key}
                            className={`w-20 block text-sm  text-neutral-200 antialiased mt-2 hover:text-log-col hover:border-b hover:border-log-col`}
                          >
                            {t(link.text)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
            <div className="flex flex-col justify-center gap-7 z-10 w-3/6 max-lg:mx-6 max-xl:w-4/6  max-md:w-full ">
              <Contact />
            </div>
          </div>
          <div className="text-neutral-200 flexBetween mt-10 footer_copyright">
            <p>@ 2023 Tahsin O.. All right reserved</p>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
