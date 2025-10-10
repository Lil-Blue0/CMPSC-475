import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AppButton from "./ui/AppButton";
import MoodButton from "./ui/MoodButton";

export default function LogScreen() {
  const [note, onChangeNote] = React.useState("");
  const [mood, setMood] = React.useState(null);

  const [selected, setSelected] = React.useState(null);

  const saveMood = async () => {
    if (mood === null) {
      console.log("No mood selected");
      return;
    }
    try {
      const localDate = new Date().toISOString().slice(0, 10);

      const moodEntry = {
        mood,
        note,
        date: localDate,
      };
      const existingEntriesJSON = await AsyncStorage.getItem("moodEntries");
      let entries = existingEntriesJSON ? JSON.parse(existingEntriesJSON) : [];

      console.log("Current Date:", localDate);
      console.log("Entries before save:", JSON.stringify(entries, null, 2));

      const existingIndex = entries.findIndex(
        (entry) => entry.date === localDate
      );

      if (existingIndex !== -1) {
        console.log(`Updating entry for ${localDate}`);
        entries[existingIndex] = moodEntry; // Update existing entry
      } else {
        console.log(`Adding new entry for ${localDate}`);
        entries.push(moodEntry); // Add new entry
      }
      await AsyncStorage.setItem("moodEntries", JSON.stringify(entries));
      console.log("Mood entry saved:", moodEntry);
      console.log("Entries after save:", JSON.stringify(entries, null, 2));
    } catch (error) {
      console.error("Error saving mood entry:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        How are you Feeling
      </Text>
      <View style={styles.MoodButtonContainer}>
        <MoodButton
          img={require("../assets/0.png")}
          selected={selected === 0}
          onPress={() => {
            setSelected(0);
            setMood(0);
          }}
        />
        <MoodButton
          img={require("../assets/1.png")}
          selected={selected === 1}
          onPress={() => {
            setSelected(1);
            setMood(1);
          }}
        />
        <MoodButton
          img={require("../assets/2.png")}
          selected={selected === 2}
          onPress={() => {
            setSelected(2);
            setMood(2);
          }}
        />
        <MoodButton
          img={require("../assets/3.png")}
          selected={selected === 3}
          onPress={() => {
            setSelected(3);
            setMood(3);
          }}
        />
        <MoodButton
          img={require("../assets/4.png")}
          selected={selected === 4}
          onPress={() => {
            setSelected(4);
            setMood(4);
          }}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Note"
        keyboardType="default"
        inputMode="text"
        onChangeText={onChangeNote}
        value={note}
        multiline={true}
      ></TextInput>
      <AppButton title="Submit" onPress={saveMood} />
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
  MoodButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    width: "100%",
    paddingHorizontal: 20,
  },
  input: {
    color: "#000000",
    borderColor: "black",
    borderWidth: 3,
    borderRadius: 20,
    width: 320,
    height: 160,
    textAlign: "left",
    textAlignVertical: "top",
    marginBottom: 10,
    fontSize: 16,
    padding: 10,
  },
});
