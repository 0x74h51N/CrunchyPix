import { createSlice } from "@reduxjs/toolkit";
interface isMobileMenu {
  mobileMenu: boolean;
}

const initialState: isMobileMenu = {
  mobileMenu: false,
};
const mobileMenulSlice = createSlice({
  name: "isMobileMenu",
  initialState,
  reducers: {
    mobileMenuChange: (state, action) => {
      state.mobileMenu = action.payload;
    },
  },
});

export const { mobileMenuChange } = mobileMenulSlice.actions;
export default mobileMenulSlice.reducer;
