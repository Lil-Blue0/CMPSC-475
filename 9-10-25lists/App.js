import React from "react";

import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ScrollView,
} from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.eye}>
          <View style={styles.eyes}>
            <View style={styles.pupils}></View>
          </View>
          <View style={styles.eyes}>
            <View style={styles.pupils}></View>
          </View>
        </View>
        <View style={styles.mouthContainer}>
          <View style={styles.mouth}></View>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b0b0b0",
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    width: 350,
    height: 400,
    backgroundColor: "yellow",
  },
  eye: {
    flex: 1,
    flexDirection: "row", // Lay out children horizontally
    paddingHorizontal: 70, // Add space on left/right
    paddingTop: 30, // or a value you prefer
    justifyContent: "space-between", // Space out children evenly
  },
  pupils: {
    height: 10,
    width: 10,
    backgroundColor: "#000",
    borderRadius: 40, // Make eyes circular
  },
  eyes: {
    height: 75,
    width: 75,
    backgroundColor: "#fff",
    borderRadius: 40, // Make eyes circular
    borderWidth: 2,
    borderColor: "#333",
    alignItems: "center",
    justifyContent: "center",
  },
  mouthContainer: {
    marginBottom: 110,
    alignSelf: "center",
    width: 280,
    height: 80,
  },
  mouth: {
    width: 320,
    height: 20,
    borderBottomWidth: 8,
    borderBottomColor: "#333",
    borderRadius: 30,
    backgroundColor: "transparent",
    alignSelf: "center",
  },
  nose: {
    width: 20,

    s,
  },
});
