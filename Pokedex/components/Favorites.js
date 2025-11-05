import React, { useCallback } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import PokemonCard from "./UI/PokemonCard";
import { Colors, SharedStyles } from "../styles/SharedStyles";
import { selectFavoriteIds } from "../store/favoritesSlice";
import { useSelector } from "react-redux";
import pokemonData from "../data/pokemon.json";

const Favorites = ({ navigation }) => {
  const favoriteIds = useSelector(selectFavoriteIds);
  const favPokemon = favoriteIds
    .map((id) => pokemonData.find((p) => p.id === id))
    .filter(Boolean);

  const handlePokemonPress = useCallback(
    (pokemon) => {
      const fullPokemonData = pokemonData.find((p) => p.id === pokemon.id);
      // Navigate within the Favorites stack to PokemonDetail
      navigation.navigate("PokemonDetail", {
        pokemon: fullPokemonData || pokemon,
      });
    },
    [navigation]
  );
  return (
    <View style={SharedStyles.container}>
      <FlatList
        data={favPokemon}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PokemonCard pokemon={item} onPress={handlePokemonPress} />
        )}
        contentContainerStyle={SharedStyles.listContainer}
        columnWrapperStyle={SharedStyles.row}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        initialNumToRender={20}
        windowSize={10}
        getItemLayout={(data, index) => ({
          length: 150,
          offset: 150 * Math.floor(index / 2),
          index,
        })}
        ListEmptyComponent={
          <View style={SharedStyles.loadingFooter}>
            <Text style={SharedStyles.loadingText}>No favorites yet.</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Favorites;
