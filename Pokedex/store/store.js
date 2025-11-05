import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import favoritesReducer from "./favoritesSlice";
import preferencesReducer from "./preferencesSlice";

// Config for persisting the store
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["favorites", "preferences"], // persist favorites and preferences
};

// Combine reducers if you have more slices
const rootReducer = combineReducers({
  favorites: favoritesReducer,
  preferences: preferencesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
