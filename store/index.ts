import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import language from "./redux/language";

const store = configureStore({
  reducer: {
    language: language,
  },
});
const rootReducer = combineReducers({
  language: language,
});

export default store;
export type RootState = ReturnType<typeof rootReducer>;
