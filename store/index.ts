import { configureStore } from "@reduxjs/toolkit";
import isMobileReducer from "./redux/isMobile";
import pageReducer from "./redux/pageReducer";
import isTabletReducer from "./redux/isTablet";
import screenHeightReducer from "./redux/screenHeight";
import screenWidthReducer from "./redux/screenWidth";
import isMobileMenuReducer from "./redux/isMobileMenu";
import isLanguageMenuReducer from "./redux/isLanguageMenu";
import selectedSlideReducer from "./redux/selectedSlide";
import navbarChangeReducer from "./redux/navbarChange";
import mobileRotateReducer from "./redux/mobileRotate";
import isSliderReducer from "./redux/isSlider";
import clickableReducer from "./redux/isClickable";
import touchReducer from "./redux/isTouch";
import cursorDisabledReducer from "./redux/cursorDisabled";
import isScrollEnabledReducer from "./redux/isScrollEnabled";
import cookieConsentReducer from "./redux/cookieConsent";
import scrollSliceReducer from "./redux/scrollSlice";

const store = configureStore({
  reducer: {
    isTablet: isTabletReducer,
    isMobile: isMobileReducer,
    isMobileMenu: isMobileMenuReducer,
    isLanguageMenu: isLanguageMenuReducer,
    page: pageReducer,
    screenHeight: screenHeightReducer,
    screenWidth: screenWidthReducer,
    selectedSlide: selectedSlideReducer,
    navbarChange: navbarChangeReducer,
    rotateChange: mobileRotateReducer,
    isSlider: isSliderReducer,
    isClickable: clickableReducer,
    isTouch: touchReducer,
    cursorDisabled: cursorDisabledReducer,
    isScrollEnabled: isScrollEnabledReducer,
    cookieConsent: cookieConsentReducer,
    scrollSlice: scrollSliceReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
