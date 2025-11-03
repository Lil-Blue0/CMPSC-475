// npm install redux-persist
// npm install @react-native-async-storage/async-storage

import React, { useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Image, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";
import { selectDefaultScreen } from "./store/preferencesSlice";
import {
  createDrawerNavigator,
  DrawerToggleButton,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-gesture-handler";
import Home from "./components/Home";
import Pokedex from "./components/Pokedex";
import Pokemon from "./components/Pokemon";
import Favorites from "./components/Favorites";
import Settings from "./components/Settings";
import PokemonLikeButton from "./components/UI/PokemonLikeButton";
import { HeaderStyles, DrawerStyles } from "./styles/SharedStyles";

const Drawer = createDrawerNavigator();
const PokedexStackNav = createNativeStackNavigator();
const FavoritesStackNav = createNativeStackNavigator();

// Create a stack navigator for Pokedex screens
function PokedexStack({ navigation }) {
  return (
    <PokedexStackNav.Navigator
      screenOptions={{
        ...HeaderStyles,
      }}
    >
      <PokedexStackNav.Screen
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
      <PokedexStackNav.Screen
        name="PokemonDetail"
        component={Pokemon}
        options={({ route }) => ({
          title: route.params?.pokemon?.name
            ? route.params.pokemon.name.charAt(0).toUpperCase() +
              route.params.pokemon.name.slice(1)
            : "Pokémon Details",
          headerRight: () => (
            <PokemonLikeButton pokemon={route.params.pokemon} />
          ),
        })}
      />
    </PokedexStackNav.Navigator>
  );
}

// Create a stack navigator for Favorites screens
function FavoritesStack({ navigation }) {
  return (
    <FavoritesStackNav.Navigator
      screenOptions={{
        ...HeaderStyles,
      }}
    >
      <FavoritesStackNav.Screen
        name="FavoritesList"
        component={Favorites}
        options={{
          title: "Favorite Pokemon",
          headerLeft: () => (
            <DrawerToggleButton
              tintColor={HeaderStyles.headerTintColor}
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
      <FavoritesStackNav.Screen
        name="PokemonDetail"
        component={Pokemon}
        options={({ route }) => ({
          title: route.params?.pokemon?.name
            ? route.params.pokemon.name.charAt(0).toUpperCase() +
              route.params.pokemon.name.slice(1)
            : "Pokémon Details",
          headerRight: () => (
            <PokemonLikeButton pokemon={route.params.pokemon} />
          ),
        })}
      />
    </FavoritesStackNav.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
}

function AppNavigator() {
  const navigationRef = useRef(null);
  const defaultScreen = useSelector(selectDefaultScreen);
  const hasNavigated = useRef(false);

  useEffect(() => {
    // Navigate to default screen after hydration, but only once
    if (navigationRef.current && !hasNavigated.current) {
      hasNavigated.current = true;
      // Small delay to ensure navigation is ready
      setTimeout(() => {
        navigationRef.current?.navigate(defaultScreen);
      }, 100);
    }
  }, [defaultScreen]);

  return (
    <NavigationContainer ref={navigationRef}>
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
          name="Favorites"
          component={FavoritesStack}
          options={{
            drawerLabel: "Favorite Pokemon",
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
