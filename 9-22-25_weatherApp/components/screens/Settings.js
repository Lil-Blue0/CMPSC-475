import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { useAsyncStorage } from "@react-native-async-storage/async-storage";

import AppButton from "../AppButton";

export default function Settings({
  unit,
  toggleUnit,
  backgroundColor,
  setBackgroundColor,
}){
  return (
    <View style={styles.container}>
        <Text style={styles.text}>Settings Screen</Text>
        <AppButton
          title={`Switch to ${unit === "C" ? "Fahrenheit" : "Celsius"}`}
          onPress={toggleUnit}
        />
        
    </View>
    );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    },
    text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    },
});