import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favoritePokemons: []
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const pokemon = action.payload;
      const existingIndex = state.favoritePokemons.findIndex(
        (fav) => fav.id === pokemon.id
      );
      
      if (existingIndex >= 0) {
        // Remove from favorites
        state.favoritePokemons.splice(existingIndex, 1);
      } else {
        // Add to favorites
        state.favoritePokemons.push(pokemon);
      }
    },
    removeFavorite: (state, action) => {
      const pokemonId = action.payload;
      state.favoritePokemons = state.favoritePokemons.filter(
        (fav) => fav.id !== pokemonId
      );
    },
    clearFavorites: (state) => {
      state.favoritePokemons = [];
    }
  }
});

export const { toggleFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;

// Selectors
export const selectFavoritePokemons = (state) => state.favorites.favoritePokemons;
export const selectIsFavorite = (state, pokemonId) => 
  state.favorites.favoritePokemons.some((fav) => fav.id === pokemonId);

export default favoritesSlice.reducer;
