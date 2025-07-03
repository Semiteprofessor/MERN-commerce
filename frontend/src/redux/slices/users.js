import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  count: 0,
  isInitialized: false,
  followingShops: [],
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setLogout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setCount: (state) => {
      state.count = state.count + 1;
    },
    setInitialize: (state) => {
      state.isInitialized = true;
    },
    updateStatus: (state) => {
      state.user.status = action.payload;
    },
  },
});

export default slice.reducer;

export const { setLogin, setLogout, setCount, setInitialize, updateStatus } =
  slice.actions;
