import { createSlice } from '@reduxjs/toolkit';

const pathSlice = createSlice({
  name: 'path',
  initialState: {
    pathname: '',
    isBlogPage: false,
  },
  reducers: {
    setPathname: (state, action) => {
      state.pathname = action.payload;
      state.isBlogPage = action.payload.includes('blog');
    },
  },
});

export const { setPathname } = pathSlice.actions;
export default pathSlice.reducer;
