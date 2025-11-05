import React, { useState, useEffect, useMemo } from "react";
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
import { useSelector } from "react-redux";
import { selectUnits } from "../store/preferencesSlice";

const Pokemon = ({ route }) => {
  const { pokemon } = route.params;
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [speciesDetails, setSpeciesDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const units = useSelector(selectUnits);
  const isMetric = units === "metric";

  const getEnglish = (flavorTextEntries) => {
    const english = flavorTextEntries.find(
      (entry) => entry.language.name === "en"
    );
    return (
      english?.flavor_text?.replace(/[\f\n\r]+/g, " ").trim() ||
      "No description available."
    );
  };

  useEffect(() => {
    const fetchPokemonData = async () => {
      // Start loading and reset error state
      setLoading(true);
      setError(null);

      // Attempt to detch the details and species data
      try {
        // Fetch the detail data
        const detailResponse = await fetch(pokemon.api_detail_url);
        if (!detailResponse.ok) {
          throw new Error("Error, please check your internet connection");
        }

        // Fetch the species data
        const speciesResponse = await fetch(pokemon.species_url);
        if (!speciesResponse.ok) {
          throw new Error("Error, please check your internet connection");
        }

        // Update the variables with the fetched data
        setPokemonDetails(await detailResponse.json());
        setSpeciesDetails(await speciesResponse.json());
      } catch (err) {
        setError("Failed to load Pokémon details. " + err);
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
        {/* Height & Weight with units */}
        {(() => {
          const heightM = pokemonDetails?.height
            ? pokemonDetails.height / 10
            : null; // decimeters -> meters
          const weightKg = pokemonDetails?.weight
            ? pokemonDetails.weight / 10
            : null; // hectograms -> kg
          const heightText =
            heightM != null
              ? isMetric
                ? `${heightM.toFixed(2)} m`
                : `${(heightM * 3.28084).toFixed(2)} ft`
              : "Unknown";
          const weightText =
            weightKg != null
              ? isMetric
                ? `${weightKg.toFixed(1)} kg`
                : `${(weightKg * 2.20462).toFixed(1)} lbs`
              : "Unknown";
          return (
            <>
              <Text>Weight: {weightText}</Text>
              <Text>Height: {heightText}</Text>
            </>
          );
        })()}
        <Text>Must load Pokemon details from API</Text>
        <Text>Desc: {getEnglish(speciesDetails?.flavor_text_entries)}</Text>
        {pokemonDetails.stats.map((stat, index) => {
          return (
            <View key={index}>
              <Text>
                {stat.stat.name}: {stat.base_stat}
              </Text>
            </View>
          );
        })}
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
