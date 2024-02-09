import { createSlice } from "@reduxjs/toolkit";
interface cookieConsent {
  cookieConsent: boolean;
}

const initialState: cookieConsent = {
  cookieConsent: false,
};
const cookieConsentSlice = createSlice({
  name: "cookieConsent",
  initialState,
  reducers: {
    setCookieConsent: (state, action) => {
      state.cookieConsent = action.payload;
    },
  },
});

export const { setCookieConsent } = cookieConsentSlice.actions;
export default cookieConsentSlice.reducer;
