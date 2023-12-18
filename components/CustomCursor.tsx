"use client";
import { RootState } from "@/store";
import { setIsTranslationsLoaded } from "@/store/redux/language";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const CustomCursor = () => {
  const isBrowser = typeof window !== "undefined";
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const circleRef = useRef<HTMLDivElement | null>(null);
  const { t, i18n } = useTranslation(["index"]);
  const dispatch = useDispatch();
  const isTranslationsLoadedRedux = useSelector(
    (state: RootState) => state.language.isTranslationsLoaded
  );
  const followerRefs = Array.from({ length: 10 }).map(() =>
    useRef<HTMLDivElement | null>(null)
  );
  const isClickable = useSelector(
    (state: RootState) => state.isClickable.clickable
  );
  const isSlider = useSelector((state: RootState) => state.isSlider.slider);
  const [isCursorVisible, setIsCursorVisible] = useState(false);
  const [isInitialMove, setIsInitialMove] = useState(true);
  useEffect(() => {
    if (isBrowser) {
      const handleTouchStart = () => {
        setIsTouchDevice(true);
      };

      if ("ontouchstart" in window) {
        window.addEventListener("touchstart", handleTouchStart);
      }

      return () => {
        if ("ontouchstart" in window) {
          window.removeEventListener("touchstart", handleTouchStart);
        }
      };
    }
  }, [isBrowser]);

  useEffect(() => {
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
          followerRef.current.style.zIndex = `${998 - index}`;
          const scaleValue = 1 - index * 0.05;
          followerRef.current.style.transform = `scale(${Math.max(
            scaleValue,
            0.1
          )})`;
          followerRef.current.style.backgroundColor = "#FFFFFF";
          const opacity = 0.8;
          const reducedOpacity = opacity - 0.025 * index;
          followerRef.current.style.opacity = Math.max(
            reducedOpacity,
            0.3
          ).toString();
        }
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isInitialMove) {
        setIsCursorVisible(true);
        setIsInitialMove(false);
      }

      updateMousePosition(e);
    };
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isTranslationsLoadedRedux, dispatch, isSlider, t, followerRefs]);

  if (isTouchDevice || !isTranslationsLoadedRedux) {
    return null;
  }

  return (
    !isTouchDevice && (
      <div className="relative">
        <div
          ref={circleRef}
          className={`flex items-center justify-center fixed z-[1000] rounded-full border-2 ${
            isClickable ? "border-cool-gray-100" : "border-cool-gray-400"
          } pointer-events-none cursor-none`}
          style={{
            transition:
              "width 300ms ease-in-out, height 300ms ease-in-out, left 75ms ease-out, top 75ms ease-out, backgroundColor 300ms ease-in-out",
            width: isSlider ? "70px" : isClickable ? "20px" : "50px",
            height: isSlider ? "70px" : isClickable ? "20px" : "50px",
            margin: isSlider ? "-7px" : "-20px",
            visibility: isCursorVisible ? "visible" : "hidden",
          }}
        />
        <div
          ref={cursorRef}
          className={`flex items-center justify-center fixed z-[999] rounded-full -m-[2px] bg-white pointer-events-none cursor-none`}
          style={{
            transition:
              "width 300ms ease-in-out, height 300ms ease-in-out, left 60ms ease-out, top 60ms ease-out",
            width: isSlider ? "60px" : "15px",
            height: isSlider ? "60px" : "15px",
            visibility: isCursorVisible && !isClickable ? "visible" : "hidden",
          }}
        >
          <span className="transition-all duration-200 text-cool-gray-900 text-justify font-bold text-sm antialised z-[1000]">
            {isSlider && t("dragQuinn.drag")}
          </span>
        </div>

        {followerRefs.map((followerRef, index) => (
          <div
            key={index}
            ref={followerRef}
            className={`flex items-center justify-center fixed rounded-full cursor-none pointer-events-none`}
            style={{
              transition: `width 300ms ease-in-out, height 300ms ease-in-out, left ${
                60 + index * 3
              }ms ease-out, top ${60 + index * 3}ms ease-out`,
              width: isSlider ? "57px" : "13px",
              height: isSlider ? "57px" : "13px",
              visibility:
                isCursorVisible && !isClickable ? "visible" : "hidden",
            }}
          ></div>
        ))}
      </div>
    )
  );
};

export default CustomCursor;
