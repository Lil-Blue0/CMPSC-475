import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const Support = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to the Support screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Support;
