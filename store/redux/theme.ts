import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Theme {
  theme: 'dark' | 'light' | null;
}

const initialState: Theme = { theme: null };

const themeSlice = createSlice({
  name: 'theme',
  initialState: initialState,
  reducers: {
    setThemeSlice: (state, action: PayloadAction<'dark' | 'light'>) => {
      state.theme = action.payload;
    },
  },
});

export const { setThemeSlice } = themeSlice.actions;
export default themeSlice.reducer;
