import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

//import icons
import { Ionicons } from "@expo/vector-icons";
import { FaHome } from "react-icons/fa";

import { NavigationContainer } from "@react-navigation/native"; //always needed for any type of navigator
//import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; // type of navigator
import { createNativeStackNavigator } from "@react-navigation/native-stack"; // another type of navigator
import { createDrawerNavigator } from "@react-navigation/drawer"; // another type of navigator

import Home from "./components/Home";
import Account from "./components/Account";
import Settings from "./components/Settings";
import Support from "./components/Support";

import AppButton from "./components/ui/AppButton";

//const Tab = createBottomTabNavigator(); // this is the bottom buttons
//const Stack = createNativeStackNavigator(); // this is the top header
const Drawer = createDrawerNavigator(); // this is the side drawer

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          name="Home"
          component={Home}
          initialParams={{ value: "Welcome to home" }}
        />
        <Drawer.Screen name="Account" component={Account} />
        <Drawer.Screen name="Settings" component={Settings} />
        <Drawer.Screen name="Support" component={Support} />
      </Drawer.Navigator>
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
