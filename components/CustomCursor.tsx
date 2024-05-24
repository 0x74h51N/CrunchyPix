"use client";
import { RootState } from "@/store";
import { setTouch } from "@/store/redux/isTouch";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const CustomCursor = () => {
  const isBrowser = typeof window !== "undefined";
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const circleRef = useRef<HTMLDivElement | null>(null);
  const isTouchDevice = useSelector((state: RootState) => state.isTouch.touch);
  const isSlider = useSelector((state: RootState) => state.isSlider.slider);
  const [isCursorVisible, setIsCursorVisible] = useState(false);
  const [isInitialMove, setIsInitialMove] = useState(true);
  const cursorDisabled = useSelector(
    (state: RootState) => state.cursorDisabled.disabled
  );
  const isClickable = useSelector(
    (state: RootState) => state.isClickable.clickable
  );
  const { t, i18n } = useTranslation(["index"]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isBrowser) {
      const handleTouchStart = () => {
        dispatch(setTouch(true));
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
  }, [isBrowser, dispatch]);

  useEffect(() => {
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
  }, [i18n, dispatch, isInitialMove, t, isSlider, isClickable]);

  if (isTouchDevice) {
    return null;
  }
  if (cursorDisabled === true) {
    return null;
  } else {
    return (
      !isTouchDevice && (
        <div className="relative">
          <div
            ref={circleRef}
            className={`flex items-center justify-center fixed z-[1000] rounded-full border-2
            border-cool-gray-100 pointer-events-none cursor-none`}
            style={{
              transition:
                "width 300ms ease-in-out, height 300ms, left 74ms ease-out, top 74ms ease-out, backgroundColor 300ms ease-in-out",
              width: isSlider ? "70px" : isClickable ? "20px" : "45px",
              height: isSlider ? "70px" : isClickable ? "20px" : "45px",
              margin: isSlider ? "-7px" : "-20px",
              visibility: isCursorVisible ? "visible" : "hidden",
            }}
          />
          <div
            ref={cursorRef}
            className={`flex items-center justify-center fixed z-[999] rounded-full m-[1px] bg-log-col pointer-events-none cursor-none`}
            style={{
              transition:
                "width 300ms ease-in-out, height 300ms ease-in-out, left 60ms ease-out, top 60ms ease-out",
              width: isSlider ? "55px" : "5px",
              height: isSlider ? "55px" : "5px",
              visibility:
                isCursorVisible && !isClickable ? "visible" : "hidden",
            }}
          >
            <span className="transition-all duration-200 text-cool-gray-50 text-justify font-bold text-sm antialised z-[1000]">
              {isSlider && t("dragQuinn.drag")}
            </span>
          </div>
        </div>
      )
    );
  }
};

export default CustomCursor;
