import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { CSSProperties } from "react";

interface FlipBookConfig {
    width: number;
    height: number;
    startPage: number;
    drawShadow: boolean;
    flippingTime: number;
    usePortrait: boolean;
    startZIndex: number;
    autoSize: boolean;
    clickEventForward: boolean;
    swipeDistance: number;
    showPageCorners: boolean;
    disableFlipByClick: boolean;
    minWidth: number;
    maxWidth: number;
    minHeight: number;
    maxHeight: number;
    maxShadowOpacity: number;
    showCover: boolean;
    mobileScrollSupport: boolean;
    onFlip: () => void;
    onChangeOrientation: () => void;
    onChangeState: () => void;
    style: CSSProperties; 
    size: "fixed" | "stretch";
}

export const getFlipBookConfig = (screenWidth: number): FlipBookConfig => {
    const _size = screenWidth <= 550 ? "fixed" : "stretch";
    const width = screenWidth >= 650 ? 600 : screenWidth >= 450 ? 400 : screenWidth >= 400 ? 350 : 300;
    const height = screenWidth >= 650 ? 600 : screenWidth >= 450 ? 400 : screenWidth >= 400 ? 350 : 300;

    return {
        size: _size,
        width,
        height,
        startPage: 0,
        drawShadow: true,
        flippingTime: 1250,
        usePortrait: true,
        startZIndex: 0,
        autoSize: true,
        clickEventForward: true,
        swipeDistance: 0,
        showPageCorners: true,
        disableFlipByClick: true,
        minWidth: 140,
        maxWidth: 1300,
        minHeight: 140,
        maxHeight: 1300,
        maxShadowOpacity: 0.8,
        showCover: true,
        mobileScrollSupport: true,
        onFlip: () => {},
        onChangeOrientation: () => {},
        onChangeState: () => {},
        style: {}
    };
};