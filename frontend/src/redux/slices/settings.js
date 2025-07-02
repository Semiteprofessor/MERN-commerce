import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  themeMode: "light",
  openSidebar: false,
  currency: process.env.BASE_CURRENCY || "USD",
  rate: 1,
};

const slice = createSlice({
  name: "settings",
  initialState,
  reducer: {
    setThemeMode(state, action) {
      state.themeMode = action.payload;
    },
    toggleSidebar(state, action) {
      state.openSidebar = action.payload;
    },
  },
});
