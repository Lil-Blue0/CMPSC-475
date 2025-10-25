import { StatusBar } from "expo-status-bar";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import LogScreen from "./components/LogScreen";
import HistoryScreen from "./components/HistoryScreen";
import StatsScreen from "./components/StatsScreen";

const BottomTab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <BottomTab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Log") {
              iconName = focused ? "create" : "create-outline";
            } else if (route.name === "History") {
              iconName = focused ? "time" : "time-outline";
            } else if (route.name === "Stats") {
              iconName = focused ? "stats-chart" : "stats-chart-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#f39121ff",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <BottomTab.Screen name="Log" component={LogScreen} />
        <BottomTab.Screen name="History" component={HistoryScreen} />
        <BottomTab.Screen name="Stats" component={StatsScreen} />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}
