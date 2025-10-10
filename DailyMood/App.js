import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LogScreen from "./components/LogScreen";
import HistoryScreen from "./components/HistoryScreen";
import StatsScreen from "./components/StatsScreen";

const BottomTab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <BottomTab.Navigator>
        <BottomTab.Screen name="Log" component={LogScreen} />
        <BottomTab.Screen name="History" component={HistoryScreen} />
        <BottomTab.Screen name="Stats" component={StatsScreen} />
      </BottomTab.Navigator>
    </NavigationContainer>
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
