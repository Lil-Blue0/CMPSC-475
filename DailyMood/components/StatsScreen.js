import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppButton from "./ui/AppButton";
import { useIsFocused } from "@react-navigation/native";

const calculateStats = (entries) => {
  if (!entries) {
    return null;
  }

  const totalEntries = entries.length;

  const moodCounts = entries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {});

  let mostFrequentMood = null;
  let maxCount = 0;
  Object.keys(moodCounts).forEach((mood) => {
    if (moodCounts[mood] > maxCount) {
      maxCount = moodCounts[mood];
      mostFrequentMood = mood;
    }
  });

  return {
    totalEntries,
    moodCounts,
    mostFrequentMood,
  };
};

export default function StatsScreen() {
  const [stats, setStats] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchAndCalculateStats = async () => {
      try {
        const storedHistory = await AsyncStorage.getItem("moodEntries");
        const entries = storedHistory ? JSON.parse(storedHistory) : [];
        const calculatedStats = calculateStats(entries);
        setStats(calculatedStats);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };
    if (isFocused) {
      fetchAndCalculateStats();
    }
  }, [isFocused]);

  const moodLabels = ["Awful", "Bad", "Okay", "Good", "Great"];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Mood Stats</Text>
      {stats ? (
        <View style={styles.statsContainer}>
          <Text style={styles.statText}>
            Total Entries: {stats.totalEntries}
          </Text>
          <Text style={styles.statText}>
            Most Frequent Mood:{" "}
            {stats.mostFrequentMood !== null
              ? moodLabels[stats.mostFrequentMood]
              : "N/A"}
          </Text>
          <View style={styles.moodCountsContainer}>
            <Text style={styles.subTitle}>Mood Breakdown:</Text>
            {Object.keys(stats.moodCounts)
              .sort()
              .map((mood) => (
                <Text key={mood} style={styles.statText}>
                  {moodLabels[mood]}: {stats.moodCounts[mood]}
                </Text>
              ))}
          </View>
        </View>
      ) : (
        <Text style={styles.statText}>No mood entries yet.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  statsContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  statText: {
    fontSize: 18,
    marginVertical: 5,
  },
  moodCountsContainer: {
    marginTop: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
    width: "90%",
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
});
