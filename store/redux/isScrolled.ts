import { createSlice } from "@reduxjs/toolkit";
interface isScrolled {
  scrolled: boolean;
}

const initialState: isScrolled = {
  scrolled: false,
};
const scrollSlice = createSlice({
  name: "isScrolled",
  initialState,
  reducers: {
    scrollChange: (state, action) => {
      state.scrolled = action.payload;
    },
  },
});

export const { scrollChange } = scrollSlice.actions;
export default scrollSlice.reducer;
