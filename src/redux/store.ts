import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/user/authSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: authSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;

// Infer the type of the root state and dispatch type from the store
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
