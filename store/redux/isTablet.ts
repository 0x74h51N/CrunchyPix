import { createSlice } from "@reduxjs/toolkit";
interface isTablet {
  tablet: boolean;
}

const initialState: isTablet = {
  tablet: false,
};
const tabletSlice = createSlice({
  name: "isTablet",
  initialState,
  reducers: {
    tabletChange: (state, action) => {
      state.tablet = action.payload;
    },
  },
});

export const { tabletChange } = tabletSlice.actions;
export default tabletSlice.reducer;
