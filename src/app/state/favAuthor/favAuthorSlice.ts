import { createSlice } from "@reduxjs/toolkit";
import { favAuthorState } from "../../types/types";

const initialState: favAuthorState = {
  value: [],
};

export const favAuthorSlice = createSlice({
  name: "favAuthor",
  initialState,
  reducers: {
    addFavAuthor: (state, action) => {
      state.value.push(action.payload);
    },
    removeFavAuthor: (state, action) => {
      state.value = state.value.filter(
        (author) => author.key !== action.payload
      );
    },
  },
});

export const { addFavAuthor, removeFavAuthor } = favAuthorSlice.actions;
export default favAuthorSlice.reducer;
