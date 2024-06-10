import { configureStore } from '@reduxjs/toolkit';
import isMobileReducer from './redux/isMobile';
import pageReducer from './redux/pageReducer';
import isTabletReducer from './redux/isTablet';
import screenHeightReducer from './redux/screenHeight';
import screenWidthReducer from './redux/screenWidth';
import isMobileMenuReducer from './redux/isMobileMenu';
import selectedSlideReducer from './redux/selectedSlide';
import mobileRotateReducer from './redux/mobileRotate';
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
    isTablet: isTabletReducer,
    isMobile: isMobileReducer,
    isMobileMenu: isMobileMenuReducer,
    page: pageReducer,
    screenHeight: screenHeightReducer,
    screenWidth: screenWidthReducer,
    selectedSlide: selectedSlideReducer,
    rotateChange: mobileRotateReducer,
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
