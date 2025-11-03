import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  units: "metric", // 'metric' | 'imperial'
  defaultScreen: "Home", // 'Home' | 'Pokedex' | 'Favorites'
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setUnits: (state, action) => {
      state.units = action.payload === "imperial" ? "imperial" : "metric";
    },
    toggleUnits: (state) => {
      state.units = state.units === "metric" ? "imperial" : "metric";
    },
    setDefaultScreen: (state, action) => {
      const validScreens = ["Home", "Pokedex", "Favorites"];
      if (validScreens.includes(action.payload)) {
        state.defaultScreen = action.payload;
      }
    },
  },
});

export const { setUnits, toggleUnits, setDefaultScreen } =
  preferencesSlice.actions;

export const selectUnits = (state) => state.preferences.units;
export const selectIsMetric = (state) => state.preferences.units === "metric";
export const selectDefaultScreen = (state) =>
  state.preferences.defaultScreen || "Home";

export default preferencesSlice.reducer;
