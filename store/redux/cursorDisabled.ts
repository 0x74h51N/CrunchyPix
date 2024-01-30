import { createSlice } from "@reduxjs/toolkit";
interface cursorDisabled {
  disabled: boolean;
}

const initialState: cursorDisabled = {
  disabled: false,
};
const cursorDisableSlice = createSlice({
  name: "cursorDisabled",
  initialState,
  reducers: {
    disableCursor: (state, action) => {
      state.disabled = action.payload;
    },
  },
});

export const { disableCursor } = cursorDisableSlice.actions;
export default cursorDisableSlice.reducer;
