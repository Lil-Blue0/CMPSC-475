import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { useState, useEffect, use } from "react";
import * as Location from "expo-location";
import ForecastCard from "./Components/ForecastCard";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coords, setCoords] = useState(null);
  const [wx, setWx] = useState(null);

  const getWeather = async () => {
    setLoading(true);
    setError(null);
    console.log("Getting weather...");
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      setWx(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  const getLocation = async () => {
    setError(null);
    console.log("Getting location...");
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access location was denied");
        setCoords({ latitude: 40.7128, longitude: -794.006 }); // Default to New York City coordinates
        return;
      }

      const pos = await Location.getCurrentPositionAsync();
      setCoords({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
      console.log(pos);
    } catch (error) {
      console.error(error);
      setError(error);
    }

    setLoading(false);
  };

  const cTof = (c) => (c * 9) / 5 + 32;

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      {!loading && (
        <>
          <ForecastCard wx={wx} />
          <Text>Weather App</Text>
          <Text>Latitude: {coords?.latitude}</Text>
          <Text>Longitude: {coords?.longitude}</Text>
          <Text>Temp: {cTof(wx?.current_weather?.temperature)}F</Text>
          <Button title="Get Location" onPress={getLocation} />
          <Button title="Get Weather" onPress={getWeather} />
          <StatusBar style="auto" />
        </>
      )}

      {loading && (
        <>
          <Text>Loading...</Text>
          <StatusBar style="auto" />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
