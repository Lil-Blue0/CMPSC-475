import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Image, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerToggleButton,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-gesture-handler";

// Import our components
import Home from "./components/Home";
import Pokedex from "./components/Pokedex";
import Pokemon from "./components/Pokemon";
import Settings from "./components/Settings";
import { HeaderStyles, DrawerStyles } from "./styles/SharedStyles";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// Create a stack navigator for Pokedex screens
function PokedexStack({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        ...HeaderStyles,
      }}
    >
      <Stack.Screen
        name="PokedexList"
        component={Pokedex}
        options={{
          title: "Pokédex",
          headerLeft: () => (
            <DrawerToggleButton
              tintColor={HeaderStyles.headerTintColor}
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="PokemonDetail"
        component={Pokemon}
        options={({ route }) => ({
          title: route.params?.pokemon?.name
            ? route.params.pokemon.name.charAt(0).toUpperCase() +
              route.params.pokemon.name.slice(1)
            : "Pokémon Details",
        })}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          ...HeaderStyles,
          ...DrawerStyles,
        }}
        drawerContent={(props) => (
          <View style={{ flex: 1 }}>
            <DrawerHeaderImage />
            <DrawerContentScrollView
              {...props}
              contentContainerStyle={{ paddingTop: 20 }}
              style={{ paddingTop: 0 }}
            >
              <DrawerItemList {...props} />
            </DrawerContentScrollView>
          </View>
        )}
      >
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{
            drawerLabel: "Home",
            title: "Home",
          }}
        />
        <Drawer.Screen
          name="Pokedex"
          component={PokedexStack}
          options={{
            drawerLabel: "Pokédex",
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="Settings"
          component={Settings}
          options={{
            drawerLabel: "Settings",
            title: "Settings",
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

function DrawerHeaderImage() {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.drawerHeader,
        {
          marginLeft: -insets.left,
          marginRight: -insets.right,
        },
      ]}
    >
      <Image
        source={require("./assets/Background.png")}
        style={styles.drawerImage}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    width: "100%",
    height: 140,
    overflow: "hidden",
  },
  drawerImage: {
    width: "100%",
    height: "100%",
  },
});
