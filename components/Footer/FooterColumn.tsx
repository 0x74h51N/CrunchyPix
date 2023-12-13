import React, { useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Links } from "@/app/common.types";
import { RootState } from "@/store";
import { setIsTranslationsLoaded } from "@/store/redux/language";
import { useSelector, useDispatch } from "react-redux";

interface FooterColumnProps {
  Links: Links[];
  selectedLink?: string;
}

const FooterColumn = ({ Links, selectedLink }: FooterColumnProps) => {
  const { t, i18n } = useTranslation(["translation"]);
  const isTranslationsLoadedRedux = useSelector(
    (state: RootState) => state.language.isTranslationsLoaded
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (i18n.isInitialized) {
      dispatch(setIsTranslationsLoaded(true));
    } else {
      i18n.on("initialized", () => {
        dispatch(setIsTranslationsLoaded(true));
      });
    }
  }, [i18n, dispatch]);
  if (!isTranslationsLoadedRedux) {
    return null;
  }

  return (
    <div className="footer_column">
      <ul className="flex flex-col gap-2 font-normal text-white">
        {Links.map((link) => (
          <Link
            href={link.href}
            key={link.key}
            className={`hover:text-log-col hover:scale-110 cursor-none ${
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
                  : "w-0 transition-all duration-300 ease-in-out group-hover:w-full"
              }`}
            ></span>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default FooterColumn;