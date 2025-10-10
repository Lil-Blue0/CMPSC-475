import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native";
import AppButton from "./ui/AppButton";
import { useIsFocused } from "@react-navigation/native";

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const storedHistory = await AsyncStorage.getItem("moodEntries");
        if (storedHistory) {
          setHistory(JSON.parse(storedHistory));
        }
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };
    if (isFocused) {
      fetchHistory();
    }
  }, [isFocused]);

  const removeHistory = async () => {
    try {
      await AsyncStorage.removeItem("moodEntries");
      setHistory([]);
      console.log("History cleared.");
    } catch (error) {
      console.error("Error clearing history:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>History Screen</Text>
      <ScrollView>
        {history.map((entry, index) => (
          <View key={index} style={styles.historyItem}>
            <Text>Date: {new Date(entry.date).toLocaleDateString()}</Text>
            <Text>Mood: {entry.mood}</Text>
            <Text>Note: {entry.note}</Text>
          </View>
        ))}
      </ScrollView>
      <AppButton title="Clear History" onPress={removeHistory} />
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
  historyItem: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
});
