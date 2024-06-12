import { createSlice } from '@reduxjs/toolkit';
interface isTouch {
  touch: boolean;
}

const initialState: isTouch = {
  touch: false,
};
const touchSlice = createSlice({
  name: 'isTouch',
  initialState,
  reducers: {
    setTouch: (state, action) => {
      state.touch = action.payload;
    },
  },
});

export const { setTouch } = touchSlice.actions;
export default touchSlice.reducer;
