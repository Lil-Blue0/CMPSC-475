import { View, Text, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);
  const isFocused = useIsFocused();

  const moodLabels = ["Awful", "Bad", "Okay", "Good", "Great"];

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

  const historyItem = ({ item }) => (
    <View style={styles.historyItem}>
      <Text>Date: {new Date(item.date).toLocaleDateString()}</Text>
      <Text>Mood: {moodLabels[item.mood]}</Text>
      <Text>Note: {item.note}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={history}
        renderItem={historyItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text>No history available.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 1)",
    alignItems: "center",
    justifyContent: "center",
  },
  historyItem: {
    width: 300,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
  },
});
