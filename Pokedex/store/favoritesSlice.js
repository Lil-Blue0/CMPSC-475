import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriteIds: [],
  loading: false,
  error: null,
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addFavorite: (state, action) => {
      const id = action.payload;
      if (!state.favoriteIds.includes(id)) {
        state.favoriteIds.push(id);
      }
    },
    removeFavorite: (state, action) => {
      const id = action.payload;
      state.favoriteIds = state.favoriteIds.filter((favId) => favId !== id);
    },
    clearFavorites: (state) => {
      state.favoriteIds = [];
    },
  },
});

export const {
  setLoading,
  setError,
  addFavorite,
  removeFavorite,
  clearFavorites,
} = favoritesSlice.actions;

// Selectors
export const selectFavoriteIds = (state) => state.favorites.favoriteIds;
export const selectIsFavorite = (pokemonId) => (state) => {
  if (!pokemonId) return false;
  return state.favorites.favoriteIds.includes(pokemonId);
};
export const selectFavoritesLoading = (state) => state.favorites.loading;
export const selectFavoritesError = (state) => state.favorites.error;

export default favoritesSlice.reducer;
