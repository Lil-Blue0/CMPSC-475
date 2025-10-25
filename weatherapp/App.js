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
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";

import Forecast from "./components/screens/Forecast";
import LocationScreen from "./components/screens/Location";
import Settings from "./components/screens/Settings";
import TodaysWeather from "./components/screens/TodaysWeather";

// Don't forget to install: npx expo install expo-location
// URL example: const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;

const ForecastStack = createStackNavigator();

function ForecastStackScreen({ wx, loading, error, refreshing, onRefresh, getLocFromZip, unit, toggleUnit }) {
  return (
    <ForecastStack.Navigator>
      <ForecastStack.Screen name="ForecastList" options={{ headerShown: false }}>
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
      </ForecastStack.Screen>
      <ForecastStack.Screen name="TodaysWeather" options={{ headerShown: false }}>
        {(props) => (
          <TodaysWeather
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
      </ForecastStack.Screen>
    </ForecastStack.Navigator>
  );
}

export default function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [wx, setWx] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [unit, setUnit] = useState("C");
  const [savedZips, setSavedZips] = useState([]);
  const [theme, setTheme] = useState('light');

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem('@theme', newTheme);
    } catch (e) {
      console.error("Failed to save theme", e);
    }
  };


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
        return { latitude: 40.7128, longitude: -794.006 }; 
      }
      const pos = await Location.getCurrentPositionAsync({});
      return pos.coords;
    } catch (error) {
      console.error(error);
      setError(error);
      return { latitude: 40.7128, longitude: -794.006 };
    }
  };

  const getLocationAndWeather = async () => {
    const loc = await getLocation();
    await getWeather(loc);
  };

  const getLocFromZip = async (zip) => {
    setLoading(true);
    setError(null);
    try {
      const geocode = await Location.geocodeAsync(zip);
      if (geocode && geocode.length > 0) {
        await getWeather(geocode[0]);
      } else {
        setError("Could not find location for that zip code.");
      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const savedZipsString = await AsyncStorage.getItem('@savedZips');
        if (savedZipsString) {
          setSavedZips(JSON.parse(savedZipsString));
        }
        const savedUnit = await AsyncStorage.getItem('@unit');
        if (savedUnit) {
          setUnit(savedUnit);
        }
        const savedTheme = await AsyncStorage.getItem('@theme');
        if (savedTheme) {
          setTheme(savedTheme);
        }
      } catch (e) {
        console.error("Failed to load data from storage", e);
      }
      await getLocationAndWeather();
      setLoading(false);
    };
    fetchAll();
  }, []);

  const Tab = createBottomTabNavigator();
  return (

    
    <NavigationContainer theme={theme === 'light' ? DefaultTheme : DarkTheme}>

    <Tab.Navigator
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

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Forecast">
        {(props) => (
          <ForecastStackScreen
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
      </Tab.Screen>
      <Tab.Screen name="Location"> 
        {(props) => (<LocationScreen 
        {...props}
        savedZips={savedZips}
        getLocFromZip={getLocFromZip}
        addZipCode={addZipCode}
        />)}
      </Tab.Screen>
      <Tab.Screen name="Settings" >
        {(props) => (<Settings {...props} unit={unit} toggleUnit={toggleUnit} theme={theme} toggleTheme={toggleTheme} />)}
      </Tab.Screen>
    </Tab.Navigator>
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
