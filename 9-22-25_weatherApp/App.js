import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useState, useEffect } from "react";
import * as Location from "expo-location";

import CurrentWeatherCard from "./components/CurrentWeatherCard";
import ForecastCard from "./components/ForecastCard";
// Don't forget to install: npx expo install expo-location
// URL example: const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;

export default function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [wx, setWx] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    setLoading(true);
    await getLocationAndWeather();
    setLoading(false);
    setRefreshing(false);
  };

  const getWeather = async (coordsObj) => {
    setError(null);
    if (!coordsObj || !coordsObj.latitude || !coordsObj.longitude) {
      setError("Coordinates not available");
      return;
    }
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coordsObj.latitude}&longitude=${coordsObj.longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      setWx(data);
    } catch (error) {
      setError(error);
    }
  };

  const getLocation = async () => {
    setError(null);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access location was denied");
        return { latitude: 40.7128, longitude: -794.006 }; // Default NYC
      }
      const pos = await Location.getCurrentPositionAsync({});
      return pos.coords;
    } catch (error) {
      console.error(error);
      setError(error);
      return { latitude: 40.7128, longitude: -794.006 }; // fallback
    }
  };

  // Helper to get location and then weather, updating state
  const getLocationAndWeather = async () => {
    const loc = await getLocation();
    await getWeather(loc);
  };

  const getLocFromZip = async (zip) => {
    setError(null);
    try {
      let geocode = await Location.geocodeAsync(zip);
      if (geocode.length > 0) {
        console.log(
          "The latitude and longitude for zip code " +
            zip +
            " is " +
            JSON.stringify(geocode[0].latitude) +
            ", " +
            JSON.stringify(geocode[0].longitude) +
            "."
        );
      }
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      await getLocationAndWeather();
      setLoading(false);
    };
    fetchAll();
  }, []);

  return (
    <View style={styles.container}>
      {!loading && (
        <ScrollView
          style={styles.scrollStyle}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <CurrentWeatherCard wx={wx} unit="F" />
          <ForecastCard wx={wx} unit="F" />
          <Button
            title="Get Location From Zip"
            onPress={() => getLocFromZip("18640")}
          />
        </ScrollView>
      )}

      {loading && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              fontSize: 24,
              marginBottom: 20,
              fontWeight: "bold",
              color: "#00bd19",
            }}
          >
            Loading...
          </Text>
          <ActivityIndicator size={"large"} color={"#00bd19"} />
        </View>
      )}

      {error && <Text>Error: {error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ececec",
    alignItems: "center",
    paddingTop: 70,
    paddingHorizontal: 20,
    width: "100%",
  },
  scrollStyle: {
    width: "100%",
  },
});
