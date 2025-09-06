import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

export default function App() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [result, setResult] = useState(0);

  const handleAdd = () => {
    setResult(parseInt(a) + parseInt(b));
  };

  return (
    <View style={styles.container}>
      <Text>Addition App!</Text>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <TextInput
          style={styles.input}
          title="a"
          onChangeText={setA}
          value={a}
        />
        <Text> + </Text>
        <TextInput
          style={styles.input}
          title="b"
          onChangeText={setB}
          value={b}
        />
      </View>
      <Button style={styles.button} title="Calculate" onPress={handleAdd} />
      <Text styles={styles.result}>Result: {result}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b0b0b0b0",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    color: "00000000",
    keyboardType: "numeric",
    borderColor: "gray",
    borderWidth: 1,
    width: 30,
    height: 30,
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    marginBottom: 10,
  },
  result: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
});
