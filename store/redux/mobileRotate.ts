import { createSlice } from "@reduxjs/toolkit";
interface mobileRotate {
  rotateEnd: boolean;
  rotateStart: boolean;
}

const initialState: mobileRotate = {
  rotateEnd: false,
  rotateStart: false,
};
const rotateSlice = createSlice({
  name: "mobileRotate",
  initialState,
  reducers: {
    rotateChange: (state, action) => {
      state.rotateEnd = action.payload;
    },
    setRotate: (state, action) => {
      state.rotateStart = action.payload;
    },
  },
});

export const { rotateChange, setRotate } = rotateSlice.actions;
export default rotateSlice.reducer;
