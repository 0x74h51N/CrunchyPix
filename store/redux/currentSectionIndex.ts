import { createSlice } from "@reduxjs/toolkit";
interface currentSectionIndex {
  index: number;
}

const initialState: currentSectionIndex = {
  index: 0,
};
const currentSectionIndex = createSlice({
  name: "index",
  initialState,
  reducers: {
    setIndex: (state, action) => {
      state.index = action.payload;
    },
  },
});

export const { setIndex } = currentSectionIndex.actions;
export default currentSectionIndex.reducer;
