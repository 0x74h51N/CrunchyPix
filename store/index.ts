import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import language from "./redux/language";
import isMobile from "./redux/isMobile";
import isScrolled from "./redux/isScrolled";

const store = configureStore({
  reducer: {
    language: language,
    isMobile: isMobile,
    isScrolled: isScrolled,
  },
});
const rootReducer = combineReducers({
  language: language,
  isMobile: isMobile,
  isScrolled: isScrolled,
});

export default store;
export type RootState = ReturnType<typeof rootReducer>;