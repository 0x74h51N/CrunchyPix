"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "@/store/redux/pageReducer";

const PageTracker = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  useEffect(() => {
    const url = `${pathname}`;
    console.log(url);
    dispatch(setCurrentPage(url));
  }, [pathname]);

  return null;
};

export default PageTracker;
