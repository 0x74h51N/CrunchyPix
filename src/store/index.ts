import { configureStore } from '@reduxjs/toolkit';
import clickableReducer from './redux/isClickable';
import isScrollEnabledReducer from './redux/isScrollEnabled';
import isSliderReducer from './redux/isSlider';
import touchReducer from './redux/isTouch';
import pathSliceReducer from './redux/pathSlice';
import portfolioReducer from './redux/portfolioItems';
import sectionReducer from './redux/sectionItems';
import themeSliceReducer from './redux/theme';

const store = configureStore({
  reducer: {
    isSlider: isSliderReducer,
    isClickable: clickableReducer,
    isTouch: touchReducer,
    isScrollEnabled: isScrollEnabledReducer,
    portfolio: portfolioReducer,
    section: sectionReducer,
    pathSlice: pathSliceReducer,
    themeSlice: themeSliceReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
