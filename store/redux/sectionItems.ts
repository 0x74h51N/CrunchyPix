import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SectionsTypes } from '@/schemas';

interface SectionState {
  items: SectionsTypes[];
}

const initialState: SectionState = {
  items: [],
};

const sectionsSlice = createSlice({
  name: 'sections',
  initialState,
  reducers: {
    setSectionItems(state, action: PayloadAction<SectionsTypes[]>) {
      state.items = action.payload;
    },
  },
});

export const { setSectionItems } = sectionsSlice.actions;

export default sectionsSlice.reducer;
