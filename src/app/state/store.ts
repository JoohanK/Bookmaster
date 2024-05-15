import { configureStore } from "@reduxjs/toolkit";
import favBookReducer from "./favBook/favBookSlice";
import favAuthorReducer from "./favAuthor/favAuthorSlice";
import readBookReducer from "./readBook/readBookSlice";

export const store = configureStore({
  reducer: {
    favBook: favBookReducer,
    favAuthor: favAuthorReducer,
    readBook: readBookReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
