import { createSlice } from "@reduxjs/toolkit";
interface scrollEnabled {
  enabled: boolean;
}

const initialState: scrollEnabled = {
  enabled: true,
};
const scrollEnabledSlice = createSlice({
  name: "scrollEnabled",
  initialState,
  reducers: {
    scrollState: (state, action) => {
      state.enabled = action.payload;
    },
  },
});

export const { scrollState } = scrollEnabledSlice.actions;
export default scrollEnabledSlice.reducer;
