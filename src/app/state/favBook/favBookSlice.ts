import { createSlice } from "@reduxjs/toolkit";
import { favBookState } from "../../types/types";

const initialState: favBookState = {
  value: [],
};

export const favBookSlice = createSlice({
  name: "favBook",
  initialState,
  reducers: {
    addFavBook: (state, action) => {
      state.value.push(action.payload);
    },
    removeFavBook: (state, action) => {
      state.value = state.value.filter((book) => book.key !== action.payload);
    },
  },
});

export const { addFavBook, removeFavBook } = favBookSlice.actions;
export default favBookSlice.reducer;
