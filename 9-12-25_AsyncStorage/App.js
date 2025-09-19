import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

// Used for AsyncStorage
// You must install it first: npm install @react-native-async-storage/async-storage
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  // State variables
  const [name, setName] = useState(""); // Starts as an empty string
  const [names, setNames] = useState([]); // Starts as an empty array

  // Load names from AsyncStorage when the app starts
  useEffect(() => {
    // Immediately Invoked Function Expression (IIFE) to use async/await
    // This runs once when the component mounts
    // We can't make useEffect itself async, so we define and call an async function inside it
    // This is a common pattern for using async code in useEffect
    (async () => {
      try {
        // Get the stored names
        const stored = await AsyncStorage.getItem("names");

        // If there are stored names, parse and set them
        if (stored) setNames(JSON.parse(stored));
      } catch (e) {
        // Error reading value
        console.error("Failed to load names", e);
      }
    })();
  }, []);

  // Save names to AsyncStorage
  const saveNames = async (list) => {
    try {
      await AsyncStorage.setItem("names", JSON.stringify(list));
    } catch (e) {
      // Saving error
      console.error("Failed to save names", e);
    }
    console.log("save names");
  };

  // Add a name to the list
  const addName = async () => {
    const trimmed = name.trim();

    if (trimmed === "") return; // Don't add empty names
    const updated = [...names, trimmed];
    setNames(updated);
    setName("");
    saveNames(updated);
    console.log("add name", trimmed);
  };

  // Delete a specific name by index
  const deleteAtIndex = (index) => {
    const updated = names.filter((_, i) => i !== index);
    setNames(updated);
    saveNames(updated);
    console.log("delete at index", index);
  };

  // Clear all of the names from the list
  const clearNames = () => {
    setNames([]);
    saveNames([]);
    console.log("clear names");
  };

  const renderItem = ({ item, index }) => (
    <NameItem item={item} index={index} />
  );

  // Row component for each name item
  const NameItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.itemRow}
      onPress={() => deleteAtIndex(index)}
    >
      <Text style={styles.itemText}>{item}</Text>
      <Button
        title="Delete"
        onPress={() => deleteAtIndex(index)}
        color="#ff0000ff"
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saving Data!</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter a name"
        value={name}
        onChangeText={setName}
        onSubmitEditing={addName}
      />

      <View style={styles.buttonRow}>
        <Button title="Add Name" onPress={addName} />
        <Button title="Erase List" onPress={clearNames} color="#8aa3d3ff" />
      </View>

      <Text style={styles.title}>List</Text>

      <FlatList
        data={names}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#e8e8e8",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: 5,
  },
  itemText: {
    fontSize: 18,
    flexShrink: 1,
    paddingRight: 12,
  },
});
