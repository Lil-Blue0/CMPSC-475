import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Sticker from "./Components/Sticker";
import AppButton from "./Components/ui/AppButton";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        <Sticker />
        <Sticker />
        <Sticker />
        <Sticker />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    padding: 5,
  },
});
