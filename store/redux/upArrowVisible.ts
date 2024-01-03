import { createSlice } from "@reduxjs/toolkit";
interface isArrowVisible {
  arrowVisible: boolean;
}

const initialState: isArrowVisible = {
  arrowVisible: false,
};
const upArrowSlice = createSlice({
  name: "isArrowVisible",
  initialState,
  reducers: {
    visibleChange: (state, action) => {
      state.arrowVisible = action.payload;
    },
  },
});

export const { visibleChange } = upArrowSlice.actions;
export default upArrowSlice.reducer;
