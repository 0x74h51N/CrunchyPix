import { configureStore } from '@reduxjs/toolkit';
import pageReducer from './redux/pageReducer';
import selectedSlideReducer from './redux/selectedSlide';
import isSliderReducer from './redux/isSlider';
import clickableReducer from './redux/isClickable';
import touchReducer from './redux/isTouch';
import cursorDisabledReducer from './redux/cursorDisabled';
import isScrollEnabledReducer from './redux/isScrollEnabled';
import cookieConsentReducer from './redux/cookieConsent';
import portfolioReducer from './redux/portfolioItems';
import sectionReducer from './redux/sectionItems';

const store = configureStore({
  reducer: {
    page: pageReducer,
    selectedSlide: selectedSlideReducer,
    isSlider: isSliderReducer,
    isClickable: clickableReducer,
    isTouch: touchReducer,
    cursorDisabled: cursorDisabledReducer,
    isScrollEnabled: isScrollEnabledReducer,
    cookieConsent: cookieConsentReducer,
    portfolio: portfolioReducer,
    section: sectionReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
