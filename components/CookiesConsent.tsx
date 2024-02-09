"use client";
import { useEffect, useState } from "react";
import breaks from "remark-breaks";
import { useTranslation } from "react-i18next";
import { hasCookie, setCookie } from "cookies-next";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import CustomLink from "./CustomLink";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";
import { RootState } from "@/store";
import { clickableChange } from "@/store/redux/isClickable";
import { useSelector, useDispatch } from "react-redux";
import { setCookieConsent } from "@/store/redux/cookieConsent";

const CookieConsent = () => {
  const { t } = useTranslation(["index"]);
  const oneYearInSeconds = 365 * 24 * 60 * 60;
  const [showConsent, setShowConsent] = useState(true);
  const isClickable = useSelector(
    (state: RootState) => state.isClickable.clickable
  );
  const dispatch = useDispatch();
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
  const handleAccept = () => {
    setCookie("cookiesConsent", "true", {
      path: "/",
      expires: new Date(Date.now() + oneYearInSeconds * 1000),
      sameSite: "lax",
      secure: true,
    });
    dispatch(setCookieConsent(true));
    setShowConsent(true);
    if (isClickable == true) {
      dispatch(clickableChange(false));
    }
  };

  const handleReject = () => {
    setShowConsent(true);
    if (isClickable == true) {
      dispatch(clickableChange(false));
    }
  };

  useEffect(() => {
    setShowConsent(hasCookie("cookiesConsent"));
  }, []);
  if (showConsent) {
    return null;
  } else {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-end py-8 sm:p-20 z-[50] cursor-none pointer-events-none">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: "some" }}
          variants={fadeIn("up", "spring", 3, 1)}
          className="bg-neutral-950 bg-opacity-60 navbar sm:rounded-lg overflow-visible shadow-xl transform transition-all sm:max-w-5xl w-full z-50 "
        >
          <div className="p-2 flex justify-evenly items-center z-50">
            <div className="p half max-w-[70%] pointer-events-auto">
              <ReactMarkdown
                components={{ a: CustomLink }}
                remarkPlugins={[breaks]}
                rehypePlugins={[rehypeRaw]}
              >
                {t("cookies.description")}
              </ReactMarkdown>
            </div>
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="flex max-md:flex-col w-auto gap-3"
            >
              <button
                className=" bg-neutral-600 hover:bg-green-700 hover:bg-opacity-40 text-white sm:text-sm text-[12px] font-bold py-2 px-4 rounded  active:bg-green-800 z-50 cursor-none pointer-events-auto w-full h-auto whitespace-nowrap"
                onClick={handleAccept}
              >
                {t("cookies.accept")}
              </button>
              <button
                className="bg-neutral-400 hover:bg-red-800 hover:bg-opacity-40 text-gray-700 font-bold sm:text-sm text-[12px] py-2 px-4 rounded  active:bg-red-800 hover:text-white z-50 cursor-none pointer-events-auto w-full h-auto"
                onClick={handleReject}
              >
                {t("cookies.decline")}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }
};

export default CookieConsent;
