import { configureStore } from '@reduxjs/toolkit';
import selectedSlideReducer from './redux/selectedSlide';
import isSliderReducer from './redux/isSlider';
import clickableReducer from './redux/isClickable';
import touchReducer from './redux/isTouch';
import isScrollEnabledReducer from './redux/isScrollEnabled';
import portfolioReducer from './redux/portfolioItems';
import sectionReducer from './redux/sectionItems';
import pathSliceReducer from './redux/pathSlice';
import themeSliceReducer from './redux/theme';

const store = configureStore({
  reducer: {
    selectedSlide: selectedSlideReducer,
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
