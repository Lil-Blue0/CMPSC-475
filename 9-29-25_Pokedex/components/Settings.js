import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors, SharedStyles } from "../styles/SharedStyles";

const Settings = () => {
  return (
    <View style={SharedStyles.centeredContainer}>
      <Text style={SharedStyles.title}>Settings</Text>
      <Text style={SharedStyles.placeholder}>
        This is the Settings page placeholder.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Settings;
