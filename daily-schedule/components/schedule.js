import React from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { scheduleData } from "../data/scheduleData";

// Helper function to parse time and check if it's the current block
const isCurrentBlock = (timeString, now) => {
  if (!timeString || !now) return false;

  try {
    const [startTimeStr, endTimeStr] = timeString.split(" - ");

    const parseTime = (timeStr) => {
      const date = new Date(now);
      let [time, modifier] = timeStr.split(/(am|pm)/i);
      let [hours, minutes] = time.split(":").map(Number);

      if (modifier.toLowerCase() === "pm" && hours < 12) {
        hours += 12;
      }
      if (modifier.toLowerCase() === "am" && hours === 12) {
        hours = 0; // Midnight case
      }

      date.setHours(hours, minutes || 0, 0, 0);
      return date;
    };

    const startTime = parseTime(startTimeStr);
    const endTime = parseTime(endTimeStr);

    return now >= startTime && now <= endTime;
  } catch (error) {
    // This can happen for items without a time range, which is fine.
    return false;
  }
};

const ScheduleDisplay = ({ day, currentTime }) => {
  const daySchedule = scheduleData[day];

  if (!daySchedule) {
    return (
      <View style={styles.container}>
        <Text>No schedule found for this day.</Text>
      </View>
    );
  }

  const listData = [
    { type: "header", title: "Your Classes" },
    ...daySchedule.classes.map((item) => ({ ...item, type: "class" })),
    { type: "header", title: "Your 5-Hour Study Plan" },
    ...daySchedule.studyPlan.map((item) => ({ ...item, type: "study" })),
  ];

  const renderItem = ({ item }) => {
    if (item.type === "header") {
      return <Text style={styles.sectionTitle}>{item.title}</Text>;
    }

    if (item.type === "class") {
      const isCurrent = isCurrentBlock(item.time, currentTime);
      return (
        <View style={[styles.card, isCurrent && styles.currentCard]}>
          <Text style={styles.cardTime}>{item.time}</Text>
          <Text style={[styles.cardTitle, isCurrent && styles.currentCardText]}>
            {item.name}
          </Text>
        </View>
      );
    }

    if (item.type === "study") {
      const isCurrent = isCurrentBlock(item.time, currentTime);
      return (
        <View style={[styles.card, isCurrent && styles.currentCard]}>
          <Text style={styles.cardTime}>{item.time}</Text>
          <Text style={[styles.cardTitle, isCurrent && styles.currentCardText]}>
            {item.title}
          </Text>
          <Text
            style={[
              styles.cardDescription,
              isCurrent && styles.currentCardText,
            ]}
          >
            {item.description}
          </Text>
        </View>
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.header}>{daySchedule.day}</Text>
      <FlatList
        data={listData}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.type}-${index}`}
        style={styles.container}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f0f4f8",
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1c3d5a",
    textAlign: "center",
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#345c80",
    marginTop: 20,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#d0d8e0",
    paddingBottom: 5,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  currentCard: {
    backgroundColor: "#1c3d5a",
    borderColor: "#e67e22",
    borderWidth: 1,
  },
  cardTime: {
    fontSize: 14,
    fontWeight: "500",
    color: "#e67e22",
    marginBottom: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: "#596e79",
    lineHeight: 20,
  },
  currentCardText: {
    color: "#ffffff",
  },
});

export default ScheduleDisplay;
