import { createSlice } from "@reduxjs/toolkit";
interface isLanguageMenu {
  languageMenu: boolean;
}

const initialState: isLanguageMenu = {
  languageMenu: false,
};
const languageMenulSlice = createSlice({
  name: "isLanguageMenu",
  initialState,
  reducers: {
    languageMenuChange: (state, action) => {
      state.languageMenu = action.payload;
    },
  },
});

export const { languageMenuChange } = languageMenulSlice.actions;
export default languageMenulSlice.reducer;
