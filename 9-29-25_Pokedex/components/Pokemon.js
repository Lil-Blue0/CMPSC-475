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

  console.log("Pokemon details:", pokemon);

  return (
    <ScrollView style={SharedStyles.container}>
      <View style={styles.content}>
        <Text>Placeholder</Text>
        <Text>Must load Pokemon details from API</Text>
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
