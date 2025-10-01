import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { cTof, codeToEmoji } from "../utils/weather";

const CurrentWeatherCard = ({ wx, unit = "C" }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Current Weather</Text>
      {unit === "C" && (
        <Text style={styles.temp}>{wx?.current_weather?.temperature}°C</Text>
      )}
      {unit === "F" && (
        <Text style={styles.temp}>
          {cTof(wx?.current_weather?.temperature)}°F
        </Text>
      )}
      <Text style={styles.desc}>
        {codeToEmoji(wx?.current_weather?.weathercode)}
      </Text>
    </View>
  );
};

export default CurrentWeatherCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 10,
    marginBottom: 20,
    borderColor: "#5f5f5f",
    borderWidth: 1,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  temp: {
    fontSize: 40,
  },
  desc: {
    fontSize: 30,
  },
});
