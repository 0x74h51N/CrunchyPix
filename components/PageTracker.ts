"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "@/store/redux/pageReducer";

const PageTracker = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();

  useEffect(() => {
    const urlParts = pathname.split("/");
    const topLevelPage = `/${urlParts[2]}`;

    dispatch(setCurrentPage(topLevelPage));
  }, [pathname]);

  return null;
};

export default PageTracker;
