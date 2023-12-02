import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import languageReducer from "./redux/language";
import isMobileReducer from "./redux/isMobile";
import isScrolledReducer from "./redux/isScrolled";
import pageReducer from "./redux/pageReducer";
import isTabletReducer from "./redux/isTablet";
import screenHeightReducer from "./redux/screenHeight";
import screenWidthReducer from "./redux/screenWidth";
import isMobileMenuReducer from "./redux/isMobileMenu";
import isLanguageMenuReducer from "./redux/isLanguageMenu";
import selectedSlideReducer from "./redux/selectedSlide";
import navbarChangeReducer from "./redux/navbarChange";
import mobileRotateReducer from "./redux/mobileRotate";

const rootReducer = combineReducers({
  language: languageReducer,
  isTablet: isTabletReducer,
  isMobile: isMobileReducer,
  isMobileMenu: isMobileMenuReducer,
  isLanguageMenu: isLanguageMenuReducer,
  isScrolled: isScrolledReducer,
  page: pageReducer,
  screenHeight: screenHeightReducer,
  screenWidth: screenWidthReducer,
  selectedSlide: selectedSlideReducer,
  navbarChange: navbarChangeReducer,
  rotateChange: mobileRotateReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof rootReducer>;
