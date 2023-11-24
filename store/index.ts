import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import languageReducer from "./redux/language";
import isMobileReducer from "./redux/isMobile";
import isScrolledReducer from "./redux/isScrolled";
import pageReducer from "./redux/pageReducer";
import isTabletReducer from "./redux/isTablet";
import screenHeightReducer from "./redux/screenHeight";
import isMobileMenuReducer from "./redux/isMobileMenu";
import isLanguageMenuReducer from "./redux/isLanguageMenu";
import selectedSlideReducer from "./redux/selectedSlide";

const rootReducer = combineReducers({
  language: languageReducer,
  isTablet: isTabletReducer,
  isMobile: isMobileReducer,
  isMobileMenu: isMobileMenuReducer,
  isLanguageMenu: isLanguageMenuReducer,
  isScrolled: isScrolledReducer,
  page: pageReducer,
  screenHeight: screenHeightReducer,
  selectedSlide: selectedSlideReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof rootReducer>;
