import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

export default function App() {
  const [name, setName] = useState("John");
  const [clicks, setClicks] = useState(0);

  const numberUp = () => {
    setClicks(clicks + 1);
  };

  const handleClick = () => {
    setName();
  };

  return (
    <View style={styles.container}>
      <Text>Variables</Text>
      <Text>Clicks: {clicks}</Text>
      <TextInput
        style={styles.TextInput}
        placeholder="Enter your Name"
        onChangeText={setName}
        value={name}
        keyboardType="email-address"
      />
      <Button title="clear form" onPress={handleClick} />
      {name ? <Text>Name: {name}</Text> : null}
      <StatusBar style="auto" />
      <Button title="number go up" onPress={numberUp} />
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
  TextInput: {
    borderWidth: 2,
    borderColor: "#b0b0b0b0",
    padding: 10,
    margin: 20,
    width: 250,
    borderRadius: 29,
  },
});
