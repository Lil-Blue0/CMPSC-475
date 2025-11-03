import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import TodayScreen from "./screens/TodayScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = "";

            if (route.name === "Today") {
              iconName = focused ? "today" : "today-outline";
            } else if (route.name === "MWF") {
              iconName = focused ? "calendar" : "calendar-outline";
            } else if (route.name === "T/Th") {
              iconName = focused ? "time" : "time-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "settings" : "settings-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#1c3d5a",
          tabBarInactiveTintColor: "gray",
          headerShown: false, // Hide header for all screens
        })}
      >
        <Tab.Screen name="Today" component={TodayScreen} />
        <Tab.Screen name="MWF">
          {() => <ScheduleDisplay day="mwf" />}
        </Tab.Screen>
        <Tab.Screen name="T/Th">
          {() => <ScheduleDisplay day="tth" />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
