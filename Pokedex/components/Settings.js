import React from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity } from "react-native";
import { Colors, SharedStyles } from "../styles/SharedStyles";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUnits,
  toggleUnits,
  selectDefaultScreen,
  setDefaultScreen,
} from "../store/preferencesSlice";

const Settings = () => {
  const dispatch = useDispatch();
  const units = useSelector(selectUnits);
  const isMetric = units === "metric";
  const defaultScreen = useSelector(selectDefaultScreen);

  const screenOptions = [
    { value: "Home", label: "Home" },
    { value: "Pokedex", label: "Pokédex" },
    { value: "Favorites", label: "Favorites" },
  ];

  return (
    <View style={SharedStyles.centeredContainer}>
      {/* Units Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Units</Text>
        <View style={styles.rowBetween}>
          <Text style={styles.label}>Metric</Text>
          <Switch
            value={!isMetric}
            onValueChange={() => dispatch(toggleUnits())}
            trackColor={{ false: Colors.lightRed, true: Colors.primaryRed }}
            thumbColor={Colors.textWhite}
          />
          <Text style={styles.label}>Imperial</Text>
        </View>
        <Text style={styles.currentValue}>
          Current: {isMetric ? "Metric (m, kg)" : "Imperial (ft, lbs)"}
        </Text>
      </View>

      {/* Default Screen Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Default Screen on Launch</Text>
        <View style={styles.optionsContainer}>
          {screenOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.optionButton,
                defaultScreen === option.value && styles.optionButtonSelected,
              ]}
              onPress={() => dispatch(setDefaultScreen(option.value))}
            >
              <Text
                style={[
                  styles.optionText,
                  defaultScreen === option.value && styles.optionTextSelected,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.currentValue}>
          App will open to: {defaultScreen}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    alignSelf: "stretch",
    backgroundColor: Colors.backgroundMedium,
    padding: 16,
    borderRadius: 10,
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 16,
    color: Colors.textPrimary,
  },
  currentValue: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 8,
    fontStyle: "italic",
  },
  optionsContainer: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  optionButton: {
    flex: 1,
    minWidth: 80,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: Colors.backgroundLight,
    borderWidth: 1,
    borderColor: "#6a6a6a",
    alignItems: "center",
  },
  optionButtonSelected: {
    backgroundColor: Colors.primaryRed,
    borderColor: Colors.darkRed,
    borderWidth: 2,
  },
  optionText: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: "600",
  },
  optionTextSelected: {
    color: Colors.textWhite,
    fontWeight: "700",
  },
});

export default Settings;
