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
import AsyncStorage from "@react-native-async-storage/async-storage";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Forecast from "./components/screens/Forecast";
import LocationScreen from "./components/screens/Location";
import Settings from "./components/screens/Settings";
import TodaysWeatherStack from "./components/TodaysWeatherStack";

import CurrentWeatherCard from "./components/CurrentWeatherCard";
import ForecastCard from "./components/ForecastCard";
import { NavigationContainer } from "@react-navigation/native";
// Don't forget to install: npx expo install expo-location
// URL example: const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;

export default function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [wx, setWx] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [unit, setUnit] = useState("C");
  const [savedZips, setSavedZips] = useState([]);

  const addZipCode = async (zip) => {
    if (!zip || zip.length < 5) return;

    const newZips = [zip, ...savedZips.filter((z) => z !== zip)].slice(0, 5); // Keep max 5
    setSavedZips(newZips);
    try {
      await AsyncStorage.setItem("@savedZips", JSON.stringify(newZips));
    } catch (e) {
      console.error("Failed to save zip codes", e);
    }
  };


  const toggleUnit = async () => {
    const newUnit = unit === "C" ? "F" : "C";
    setUnit(newUnit);
    try {
      await AsyncStorage.setItem("@unit", newUnit);
  } catch (e) {
      console.error("Failed to save unit", e);
    }
  };

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
    setLoading(true);
    try {
      let geocode = await Location.geocodeAsync(zip);
      if (geocode.length > 0) {
        const { latitude, longitude } = geocode[0];
        console.log(
          "The latitude and longitude for zip code " +
            zip +
            " is " +
            JSON.stringify(geocode[0].latitude) +
            ", " +
            JSON.stringify(geocode[0].longitude) +
            "."
        );
        await getWeather({ latitude, longitude });
        await addZipCode(zip);

      } else {
        setError("No location found for the provided zip code.");
      }

    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const savedUnit = await AsyncStorage.getItem("@unit");
        if (savedUnit !== null) {
          setUnit(savedUnit);
        }

        const savedZipsJSON = await AsyncStorage.getItem("@savedZips");
        if (savedZipsJSON !== null) {
          setSavedZips(JSON.parse(savedZipsJSON));
        }
      } catch (e) {
        console.error("Failed to load settings", e);
      }
      setLoading(true);
      await getLocationAndWeather();
      setLoading(false);
    };
    fetchAll();
  }, []);


  const BottomTab = createBottomTabNavigator();

  return (

    <NavigationContainer>

    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Forecast') {
            iconName = focused ? 'cloud' : 'cloud-outline';
          } else if (route.name === 'Location') {
            iconName = focused ? 'location' : 'location-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <BottomTab.Screen name="Forecast">
        {(props) => (
          <Forecast
            {...props}
            wx={wx}
            loading={loading}
            error={error}
            refreshing={refreshing}
            onRefresh={onRefresh}
            getLocFromZip={getLocFromZip}
            unit={unit}
            toggleUnit={toggleUnit}
          />
        )}
      </BottomTab.Screen>
      <BottomTab.Screen name="Location"> 
        {(props) => (<LocationScreen 
        {...props}
        savedZips={savedZips}
        getLocFromZip={getLocFromZip}
        addZipCode={addZipCode}
        />)}
      </BottomTab.Screen>
      <BottomTab.Screen name="Settings" >
        {(props) => (<Settings {...props} unit={unit} toggleUnit={toggleUnit}/>)}
      </BottomTab.Screen>
    </BottomTab.Navigator>
    </NavigationContainer>


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
