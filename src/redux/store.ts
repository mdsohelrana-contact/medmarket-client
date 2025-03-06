import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./features/user/authSlice";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

// Persist config
const persistConfig = {
  key: "root", // Key to store data in localStorage
  storage,
};

// Combine reducers
const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducers),
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // Required to avoid issues with non-serializable values
      }),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const persistor = persistStore(makeStore());
