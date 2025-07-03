import { createSlice } from "@reduxjs/toolkit";
import { sl } from "date-fns/locale";

const initialState = {
  brands: [],
  isLoading: true,
};

const slice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    setBrands: (state, action) => {
      ((state.brands = action.payload), (state.isLoading = false));
    },
  },
});

export default slice.reducer;

export const { setBrands } = slice.actions;
