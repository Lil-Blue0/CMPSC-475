import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

import AppButton from "./ui/AppButton";

const Settings = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to the Settings screen</Text>
      <AppButton
        onPress={() => navigation.navigate("Support")}
        title="Go to Support"
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

export default Settings;
