import { createSlice } from "@reduxjs/toolkit";
interface navbarChange {
  smallNav: boolean;
}

const initialState: navbarChange = {
  smallNav: false,
};
const navbarSlice = createSlice({
  name: "navbarChange",
  initialState,
  reducers: {
    navbarChange: (state, action) => {
      state.smallNav = action.payload;
    },
  },
});

export const { navbarChange } = navbarSlice.actions;
export default navbarSlice.reducer;
