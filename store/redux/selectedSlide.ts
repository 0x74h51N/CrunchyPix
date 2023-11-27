import { slide } from "@/app/common.types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SelectedSlideState {
  selectedSlide: slide | undefined;
}

const initialState: SelectedSlideState = {
  selectedSlide: undefined,
};

const selectedSlideSlice = createSlice({
  name: "selectedSlide",
  initialState,
  reducers: {
    setSlide: (state, action: PayloadAction<slide>) => {
      state.selectedSlide = action.payload;
    },
    clearSlide: (state) => {
      state.selectedSlide = undefined;
    },
  },
});

export const { setSlide, clearSlide } = selectedSlideSlice.actions;
export default selectedSlideSlice.reducer;
