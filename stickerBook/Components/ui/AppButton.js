import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

/**
 * Examples:
 *  <AppButton title="Save" onPress={handleSave} />
 *  <AppButton title="Continue" color="#7C4DFF" onPress={next} />
 *  <AppButton title="Submit" onPress={submit}
 *             style={{ backgroundColor: '#0D9488', borderRadius: 12 }}
 *             textStyle={{ fontSize: 18 }} />
 *  <AppButton title="Delete" onPress={del} disabled />
 */
export default function AppButton({
  title,
  onPress,
  color,
  disabled = false,
  accessibilityLabel,
  testID,
  onLongPress,
  onPressIn,
  onPressOut,
  hitSlop,
  style,
  textStyle,
}) {
  // Determine background color and disabled state
  const flat = StyleSheet.flatten(style) || {};
  const backgroundColor = flat.backgroundColor ?? color ?? "#2196F3";
  const isDisabled = !!disabled;

  // Compose the Pressable style separately for readability
  const getButtonStyle = ({ pressed }) => [
    styles.button,
    { backgroundColor, opacity: isDisabled ? 0.5 : 1 },
    pressed && !isDisabled ? styles.pressed : null,
    style,
  ];

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      testID={testID}
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      hitSlop={hitSlop}
      disabled={isDisabled}
      style={getButtonStyle}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
  },
  pressed: {
    opacity: 0.85,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
