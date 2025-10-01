import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors, SharedStyles } from "../styles/SharedStyles";

const Home = () => {
  return (
    <View style={SharedStyles.centeredContainer}>
      <Text style={SharedStyles.title}>Welcome to Pokédex!</Text>
      <Text style={SharedStyles.placeholder}>
        This is the Home page placeholder.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Home;
