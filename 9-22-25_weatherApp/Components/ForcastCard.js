import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ForcastCard = ({ wx }) => {
  const rows = [];
  if (wx?.daily && wx?.daily.time) {
    for (let i = 1; i <= 5; i++) {
      rows.push(<Text key={i}>{i}</Text>);
    }
  }

  return (
    <View style={styles.card}>
      <Text style={styles.title}>5 Day Forecast</Text>
      {rows}
    </View>
  );
};

export default ForcastCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#e0f7fa",
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    borderColor: "#00796b",
    borderWidth: 1,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
