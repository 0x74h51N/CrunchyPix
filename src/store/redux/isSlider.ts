import { createSlice } from "@reduxjs/toolkit";
interface isSlider {
  slider: boolean;
}

const initialState: isSlider = {
  slider: false,
};
const sliderSlice = createSlice({
  name: "isSlider",
  initialState,
  reducers: {
    sliderChange: (state, action) => {
      state.slider = action.payload;
    },
  },
});

export const { sliderChange } = sliderSlice.actions;
export default sliderSlice.reducer;
