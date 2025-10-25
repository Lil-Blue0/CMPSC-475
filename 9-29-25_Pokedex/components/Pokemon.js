import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import { Colors, SharedStyles } from "../styles/SharedStyles";
import { getTypeColor } from "../utils/typeColors";

const Pokemon = ({ route }) => {
  const { pokemon } = route.params;
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [speciesDetails, setSpeciesDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("Pokemon details:", pokemon);

  useEffect(() => {
    console.log("Fetching details for Pokemon ID:", pokemon.id);
    const fetchPokemonData = async () => {
      // start loading
      setLoading(true);
      setError(null);
      console.log("Starting data fetch...");
      // attempt to fetch pokemon details
      try {
        // fetch pokemon details
        const datailResponse = await fetch(pokemon.api_detail_url);
        if (!datailResponse.ok) {
          throw new Error("Error check your internet connection");
        }

        // fetch species details
        const speciesDetails = await fetch(pokemon.species_url);
        if (!speciesDetails.ok) {
          throw new Error("Error check your internet connection");
        }

        // update the variables with the fetched data
        setPokemonDetails(await datailResponse.json());
        setSpeciesDetails(await speciesDetails.json());
      } catch (err) {
        setError("Failed to load Pokémon data." + err);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemonData();
  }, [pokemon.id]);

  if (error) {
    return (
      <View>
        <Text>{error}</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={SharedStyles.container}>
      <View style={styles.content}>
        <Image
          source={{
            uri: pokemonDetails?.sprites?.other?.["official-artwork"]
              ?.front_default,
          }}
          style={{ width: 200, height: 200 }}
        />
        <Text>ID: {pokemonDetails?.id}</Text>
        <Text>Name: {pokemonDetails?.name}</Text>
        <Text>Weight: {pokemonDetails?.weight}</Text>
        <Text>Height: {pokemonDetails?.height}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 20,
    alignItems: "center",
  },
});

export default Pokemon;
