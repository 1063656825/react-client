import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import typeReducer from "./typeSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    type: typeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;