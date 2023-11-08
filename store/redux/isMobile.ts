import { createSlice } from "@reduxjs/toolkit";
interface isMobile {
  mobile: boolean;
}

const initialState: isMobile = {
  mobile: false,
};
const mobileSlice = createSlice({
  name: "isMobile",
  initialState,
  reducers: {
    mobileChange: (state, action) => {
      state.mobile = action.payload;
    },
  },
});

export const { mobileChange } = mobileSlice.actions;
export default mobileSlice.reducer;
