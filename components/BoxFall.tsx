import { randomColor } from "@/utils/randomColors";
import React, { useEffect } from "react";

const BoxFall = () => {
  useEffect(() => {
    const lines = document.querySelectorAll(".line");
    const footerElement = document.querySelector("footer");

    if (footerElement) {
      const footerHeight = footerElement.clientHeight;

      lines.forEach((line) => {
        for (let i = 0; i < 50; i++) {
          const box = document.createElement("div");
          box.className = "w-1 h-1 relative z-0 box";
          box.style.top = `-${footerHeight}px`;
          box.style.left = `${Math.random() * 100}vw`;
          box.style.backgroundColor = randomColor(6);
          box.style.animation = `fall ${
            Math.random() * 4 + 1
          }s linear infinite`;
          line.appendChild(box);
        }
      });
    }
  }, []);
  return (
    <div className="grid grid-cols-3">
      <div className="h-1 line"></div>
      <div className="h-1 line"></div>
      <div className="h-1 line"></div>
      <div className="h-1 line"></div>
      <div className="h-1 line"></div>
      <div className="h-1 line"></div>
      <div className="h-1 line"></div>
      <div className="h-1 line"></div>
      <div className="h-1 line"></div>
      <div className="h-1 line"></div>
      <div className="h-1 line"></div>
      <div className="h-1 line"></div>
      <div className="h-1 line"></div>
      <div className="h-1 line"></div>
      <div className="h-1 line"></div>
    </div>
  );
};

export default BoxFall;
