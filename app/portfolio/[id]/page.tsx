"use client";
import { portfolioPageItems } from "@/constants/portfolioPageItems";
import { RootState } from "@/store";
import { setIsTranslationsLoaded } from "@/store/redux/language";
import i18n from "@/utils/i18n";
import { polygonIn } from "@/utils/motion";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const PortfolioPage = ({ params }: { params: { id: string } }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation(["home"]);
  const isTranslationsLoadedRedux = useSelector(
    (state: RootState) => state.language.isTranslationsLoaded
  );
  useEffect(() => {
    const handleInitialized = () => {
      dispatch(setIsTranslationsLoaded(true));
    };

    if (i18n.isInitialized) {
      handleInitialized();
    } else {
      i18n.on("initialized", handleInitialized);
    }

    return () => {
      i18n.off("initialized", handleInitialized);
    };
  }, [dispatch]);

  if (!isTranslationsLoadedRedux) {
    return null;
  }
  const selectedItem = portfolioPageItems.find(
    (item) => item._id.toLowerCase().replace(/\s+/g, "") == params.id
  );

  if (!selectedItem) {
    return <p>Couldn't find a portfolio item.</p>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: "some" }}
      variants={polygonIn("screen", "easeInOut", 0.5, 1)}
      className="flex flex-col items-center h-auto w-auto min-h-[100svh] p-10 bg-cool-gray-900 lg:mx-28 md:mx-12 mx-0 rounded-xl"
    >
      <h1>{t(selectedItem.title)}</h1>
    </motion.div>
  );
};

export default PortfolioPage;
