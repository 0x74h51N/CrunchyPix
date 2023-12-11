"use client";
import { RootState } from "@/store";
import { setIsTranslationsLoaded } from "@/store/redux/language";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const CustomCursor = ({ children }: { children: React.ReactNode }) => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const circleRef = useRef<HTMLDivElement | null>(null);
  const { t, i18n } = useTranslation(["translation"]);
  const dispatch = useDispatch();
  const isTranslationsLoadedRedux = useSelector(
    (state: RootState) => state.language.isTranslationsLoaded
  );
  const followerRefs = Array.from({ length: 20 }).map(() =>
    useRef<HTMLDivElement | null>(null)
  );
  const isSlider = useSelector((state: RootState) => state.isSlider.slider);

  useEffect(() => {
    /**Error: Rendered more hooks than during the previous render. */
    if (i18n.isInitialized) {
      dispatch(setIsTranslationsLoaded(true));
    } else {
      i18n.on("initialized", () => {
        dispatch(setIsTranslationsLoaded(true));
      });
    }
    const updateFollowerPosition = (
      followerRef: React.RefObject<HTMLDivElement>,
      e: { clientX: number; clientY: number }
    ) => {
      if (followerRef.current) {
        const { clientX, clientY } = e;
        followerRef.current.style.left = `${clientX}px`;
        followerRef.current.style.top = `${clientY}px`;
      }
    };

    const updateMousePosition = (e: { clientX: number; clientY: number }) => {
      if (cursorRef.current) {
        const { clientX, clientY } = e;
        cursorRef.current.style.left = `${clientX}px`;
        cursorRef.current.style.top = `${clientY}px`;
      }
      if (circleRef.current) {
        const { clientX, clientY } = e;
        circleRef.current.style.left = `${clientX}px`;
        circleRef.current.style.top = `${clientY}px`;
      }

      followerRefs.forEach((followerRef, index) => {
        if (followerRef.current) {
          updateFollowerPosition(followerRef, e);
          followerRef.current.style.zIndex = `${49 - index}`;
          const scaleValue = 1 - index * 0.05;
          followerRef.current.style.transform = `scale(${Math.max(
            scaleValue,
            0.1
          )})`;
          const color = "#FFFFFF";
          followerRef.current.style.backgroundColor = color;
          const opacity = 0.8;
          const reducedOpacity = opacity - 0.025 * index;
          followerRef.current.style.opacity = Math.max(
            reducedOpacity,
            0.5
          ).toString();
        }
      });
    };

    const handleMouseMove = (e: MouseEvent) => updateMousePosition(e);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isTranslationsLoadedRedux, dispatch, isSlider, t, followerRefs]);
  if (!isTranslationsLoadedRedux) {
    return null;
  }

  return (
    <div className="relative">
      {children}
      <div
        ref={circleRef}
        className="flex items-center justify-center fixed z-50 rounded-full border-2 border-cool-gray-600 pointer-events-none cursor-none"
        style={{
          transition:
            "width 300ms ease-in-out, height 300ms ease-in-out, left 50ms ease, top 50ms ease",
          width: isSlider ? "70px" : "50px",
          height: isSlider ? "70px" : "50px",
          margin: isSlider ? "-7px" : "-20px",
        }}
      >
        <div
          ref={cursorRef}
          className={`flex items-center justify-center fixed z-50 rounded-full -m-[2px] bg-white pointer-events-none cursor-none`}
          style={{
            transition:
              "width 300ms ease-in-out, height 300ms ease-in-out, left 75ms ease, top 75ms ease",
            width: isSlider ? "60px" : "15px",
            height: isSlider ? "60px" : "15px",
          }}
        >
          <span className="transition-all duration-200 text-cool-gray-900 text-justify font-bold text-sm antialised">
            {isSlider && t("dragQuinn.drag")}
          </span>
        </div>
      </div>
      {/* {followerRefs.map((followerRef, index) => (
        <div
          key={index}
          ref={followerRef}
          className={`flex items-center justify-center fixed rounded-full cursor-none pointer-events-none`}
          style={{
            transition: `width 300ms ease-in-out, height 300ms ease-in-out, left ${
              78 + index * 3
            }ms ease, top ${78 + index * 3}ms ease`,
            width: isSlider ? "57px" : "13px",
            height: isSlider ? "57px" : "13px",
          }}
        ></div>
      ))} */}
    </div>
  );
};

export default CustomCursor;
