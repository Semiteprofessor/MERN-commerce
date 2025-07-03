import { createSlice } from "@reduxjs/toolkit";

// ----------------------------------------------------------------------

const initialState = {
  wishlist: [],
};

const slice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, action) => {
      state.wishlist = action.payload;
    },
    resetWishlist: (state) => {
      state.wishlist = [];
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { setWishlist, resetWishlist } = slice.actions;

// ----------------------------------------------------------------------
