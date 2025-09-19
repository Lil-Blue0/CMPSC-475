import React from "react";
import { View, Text, Button, StyleSheet, ImageBackground } from "react-native";

import AppButton from "./ui/AppButton";

const Home = ({ route, navigation }) => {
  const msg = route.params?.message ?? "No message passed";

  const handlePress = () => {
    console.log("Go to settings");
    navigation.navigate("Settings", { value: "test" });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to the home screen</Text>
      <AppButton
        title="Go to settings"
        style={{ backgroundColor: "tomato" }}
        onPress={handlePress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Home;
