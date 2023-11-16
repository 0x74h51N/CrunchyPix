import { createSlice } from "@reduxjs/toolkit";
interface LanguageState {
  language: string;
}

const initialState: LanguageState = {
  language: "en-US",
};
const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    langChange: (state, action) => {
      state.language = action.payload.language;
    },
  },
});

export const { langChange } = languageSlice.actions;
export default languageSlice.reducer;
