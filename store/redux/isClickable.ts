import { createSlice } from "@reduxjs/toolkit";
interface isClickable {
  clickable: boolean;
}

const initialState: isClickable = {
  clickable: false,
};
const clickableSlice = createSlice({
  name: "isClickable",
  initialState,
  reducers: {
    clickableChange: (state, action) => {
      state.clickable = action.payload;
    },
  },
});

export const { clickableChange } = clickableSlice.actions;
export default clickableSlice.reducer;
