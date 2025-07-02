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
  },
});
