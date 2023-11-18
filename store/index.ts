import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import languageReducer from "./redux/language";
import isMobileReducer from "./redux/isMobile";
import isScrolledReducer from "./redux/isScrolled";
import pageReducer from "./redux/pageReducer";

const rootReducer = combineReducers({
  language: languageReducer,
  isMobile: isMobileReducer,
  isScrolled: isScrolledReducer,
  page: pageReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof rootReducer>;
