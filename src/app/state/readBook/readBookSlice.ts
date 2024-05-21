import { createSlice } from "@reduxjs/toolkit";
import { ReadBookState } from "../../types/types";

const initialState: ReadBookState = {
  value: [],
};

export const readBookSlice = createSlice({
  name: "readBook",
  initialState,
  reducers: {
    addReadBook: (state, action) => {
      state.value.push(action.payload);
    },
    removeReadBook: (state, action) => {
      state.value = state.value.filter((book) => book.key !== action.payload);
    },
    addReview: (state, action) => {
      const book = state.value.find((book) => book.key === action.payload.key);
      if (book) {
        if (action.payload.review !== undefined) {
          book.review = action.payload.review;
        }
        if (action.payload.rating !== null) {
          book.rating = action.payload.rating;
        }
      }
    },
    removeReview: (state, action) => {
      const book = state.value.find((book) => book.key === action.payload);
      if (book) {
        delete book.review;
        delete book.rating;
      }
    },
  },
});

export const { addReadBook, removeReadBook, addReview, removeReview } =
  readBookSlice.actions;
export default readBookSlice.reducer;
