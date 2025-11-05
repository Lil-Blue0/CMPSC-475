import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors, SharedStyles } from "../styles/SharedStyles";
import { useSelector } from "react-redux";
import { selectFavoriteIds } from "../store/favoritesSlice";
import pokemonData from "../data/pokemon.json";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Home = ({ navigation }) => {
  const favoriteIds = useSelector(selectFavoriteIds);
  const totalFav = favoriteIds.length;
  const totalPokemon = pokemonData.length;

  return (
    <View style={SharedStyles.centeredContainer}>
      <Text style={SharedStyles.title}>Welcome to Pokédex!</Text>
      <Text style={SharedStyles.placeholder}>Quick stats</Text>

      <View style={styles.cardsRow}>
        <TouchableOpacity
          style={[SharedStyles.card, styles.card]}
          onPress={() => navigation.navigate("Pokedex")}
          activeOpacity={0.85}
        >
          <View style={styles.cardIconWrap}>
            <MaterialCommunityIcons
              name="pokeball"
              size={28}
              color={Colors.darkRed}
            />
          </View>
          <View style={styles.cardTextWrap}>
            <Text style={styles.cardLabel}>Total Pokémon</Text>
            <Text style={styles.cardValue}>{totalPokemon}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[SharedStyles.card, styles.card]}
          onPress={() => navigation.navigate("Favorites")}
          activeOpacity={0.85}
        >
          <View style={styles.cardIconWrap}>
            <MaterialCommunityIcons
              name="heart"
              size={28}
              color={Colors.primaryRed}
            />
          </View>
          <View style={styles.cardTextWrap}>
            <Text style={styles.cardLabel}>Favorites</Text>
            <Text style={styles.cardValue}>{totalFav}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardsRow: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: 12,
    alignSelf: "stretch",
    paddingHorizontal: 10,
    marginTop: 8,
  },
  card: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  cardIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.backgroundLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    borderWidth: 1,
    borderColor: Colors.backgroundMedium,
  },
  cardTextWrap: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  cardValue: {
    fontSize: 22,
    fontWeight: "800",
    color: Colors.textPrimary,
  },
});

export default Home;
