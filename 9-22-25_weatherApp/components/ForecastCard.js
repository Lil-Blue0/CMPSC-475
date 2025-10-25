import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { cTof, codeToEmoji } from "../utils/weather";


const Days = ({ wx, unit, navigation }) => {
  const row = [];
  if (wx?.daily && wx?.daily.time) {
    for (let i = 0; i < 5; i++) {
      const parts = wx.daily.time[i].split("-");
      const date = parts[1] + "/" + parts[2];
      const tempUnit = unit === "F" ? "°F" : "°C";
      const min =
        unit === "F"
          ? Math.round(cTof(wx.daily.temperature_2m_min[i]))
          : Math.round(wx.daily.temperature_2m_min[i]);
      const max =
        unit === "F"
          ? Math.round(cTof(wx.daily.temperature_2m_max[i]))
          : Math.round(wx.daily.temperature_2m_max[i]);
      
      const weathercode = wx.daily.weathercode[i];

      const handlePress = () => {
        navigation.navigate('TodaysWeather', {
          dayData: { date, min, max, tempUnit, weathercode },
        });
      };

      row.push(
        <Pressable 
        key={i}
        onPress={handlePress}
        style={({ pressed }) => [
          styles.row,
          { backgroundColor: pressed ? '#e0e0e0' : 'transparent' },
        ]}
      >

          <Text style={styles.rowText}>{date}</Text>
          <Text style={styles.rowText}>
            {codeToEmoji(weathercode)}
          </Text>
          <Text style={styles.rowText}>
            {max}/{min}
            {tempUnit}
          </Text>
        </Pressable>
      );
    }
  }
  return row;
};

const ForecastCard = ({ wx, unit, navigation }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>5 Day Forecast</Text>
      <Days wx={wx} unit={unit} navigation={navigation} />
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
