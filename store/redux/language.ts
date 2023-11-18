import { createSlice } from "@reduxjs/toolkit";

interface LanguageState {
  language: string;
  isTranslationsLoaded: boolean;
}

const initialState: LanguageState = {
  language: "en-US",
  isTranslationsLoaded: false,
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    langChange: (state, action) => {
      return { ...state, language: action.payload.language };
    },
    setIsTranslationsLoaded: (state, action) => {
      state.isTranslationsLoaded = action.payload;
    },
  },
});

export const { langChange, setIsTranslationsLoaded } = languageSlice.actions;
export default languageSlice.reducer;
