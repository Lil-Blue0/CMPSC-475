import { StyleSheet, View, Text } from "react-native";
import { useState } from "react";
import AppButton from "./ui/AppButton";

export default function Sticker() {
  const [count, setCount] = useState(0);

  const handlepress = () => {
    setCount(count + 1);
    console.log("i got pressed");
  };

  return (
    <View style={styles.sticker}>
      <View>
        <Text style={styles.count}>{count}</Text>
      </View>
      <AppButton style={styles.button} title="counter" onPress={handlepress} />
    </View>
  );
}

const styles = StyleSheet.create({
  sticker: {
    width: 125,
    height: 175,
    backgroundColor: "blue",
    justifyContent: "flex-end",
  },
  count: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
});
