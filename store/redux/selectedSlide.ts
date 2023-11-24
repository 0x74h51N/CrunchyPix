import { createSlice } from "@reduxjs/toolkit";

const selectedSlideSlice = createSlice({
  name: "selectedSlide",
  initialState: null,
  reducers: {
    setSlide: (state, action) => {
      return action.payload;
    },
    clearSlide: (state) => {
      return null;
    },
  },
});

export const { setSlide, clearSlide } = selectedSlideSlice.actions;
export default selectedSlideSlice.reducer;
