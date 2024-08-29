import { NavigationDocumentDataMenuItemsItem } from '@/prismicio-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PostsState {
  items: NavigationDocumentDataMenuItemsItem[];
}

const initialState: PostsState = {
  items: [],
};

const postsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setPosts: (
      state,
      action: PayloadAction<NavigationDocumentDataMenuItemsItem[]>,
    ) => {
      state.items = action.payload;
    },
  },
});

export const { setPosts } = postsSlice.actions;
export default postsSlice.reducer;
