import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ScreenWidthState {
  width: number;
}

const initialState: ScreenWidthState = {
  width: 0,
};

const screenWidthSlice = createSlice({
  name: "screenWidth",
  initialState,
  reducers: {
    setScreenWidth: (state, action: PayloadAction<number>) => {
      state.width = action.payload;
    },
  },
});
export const { setScreenWidth } = screenWidthSlice.actions;
export default screenWidthSlice.reducer;
