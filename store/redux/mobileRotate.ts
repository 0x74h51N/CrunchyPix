import { createSlice } from "@reduxjs/toolkit";
interface mobileRotate {
  rotate: boolean;
  isRotate: boolean;
}

const initialState: mobileRotate = {
  rotate: false,
  isRotate: false,
};
const rotateSlice = createSlice({
  name: "mobileRotate",
  initialState,
  reducers: {
    rotateChange: (state, action) => {
      state.rotate = action.payload;
    },
    setRotate: (state, action) => {
      state.isRotate = action.payload;
    },
  },
});

export const { rotateChange, setRotate } = rotateSlice.actions;
export default rotateSlice.reducer;
