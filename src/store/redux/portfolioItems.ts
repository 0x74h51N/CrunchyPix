import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PortfolioItemProps } from '@/lib/schemas';

interface PortfolioState {
  items: PortfolioItemProps[];
  loading: boolean;
  error: string | null;
}

const initialState: PortfolioState = {
  items: [],
  loading: false,
  error: null,
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    setPortfolioItems(state, action: PayloadAction<PortfolioItemProps[]>) {
      state.items = action.payload;
    },
    setPortfolioLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setPortfolioError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setPortfolioItems, setPortfolioLoading, setPortfolioError } =
  portfolioSlice.actions;

export default portfolioSlice.reducer;
