import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { cTof, codeToEmoji } from "../utils/weather";
import { useNavigation } from '@react-navigation/native';


const Days = ({ wx, unit }) => {
  const navigation = useNavigation();
  const row = [];
  if (wx?.daily && wx?.daily.time) {
    for (let i = 0; i < 5; i++) {
      const parts = wx.daily.time[i].split("-");
      const date = parts[1] + "/" + parts[2];
      const tempUnit = unit === "F" ? "°F" : "°C";
      const min = wx.daily.temperature_2m_min[i];
      const max = wx.daily.temperature_2m_max[i];

      const weathercode = wx.daily.weathercode[i];

      const dayData = {
        date: wx.daily.time[i],
        min: min,
        max: max,
        weathercode: weathercode,
      };      row.push(
        <Pressable 
          key={i} 
          style={styles.row} 
          onPress={() => navigation.navigate('TodaysWeather', { dayData, unit, wx, index: i })}
        >
          <Text style={styles.rowText}>{date}</Text>
          <Text style={styles.rowText}>{codeToEmoji(weathercode)}</Text>
          <Text style={styles.rowText}>{unit === "F" ? Math.round(cTof(max)) : Math.round(max)}/
            {unit === "F" ? Math.round(cTof(min)) : Math.round(min)}
            {tempUnit}
          </Text>
        </Pressable>
      );
    }
  }
  return row;
};

const ForecastCard = ({ wx, unit }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>5 Day Forecast</Text>
      <Days wx={wx} unit={unit} />
    </View>
  );
};

export default ForecastCard;

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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  rowText: {
    fontSize: 18,
    margin: 15,
  },
});
