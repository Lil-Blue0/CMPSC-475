import React from "react";
import { Pressable, Text, StyleSheet, Image } from "react-native";

export default function MoodButton({
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
  img,
  selected,
}) {
  // Determine background color and disabled state
  const flat = StyleSheet.flatten(style) || {};
  const backgroundColor = flat.backgroundColor ?? color ?? "#786e6eff";
  const isDisabled = !!disabled;

  // Compose the Pressable style separately for readability
  const getButtonStyle = ({ pressed }) => [
    styles.button,
    selected ? styles.selected : null,
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
      <Image style={styles.img} source={img} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.85,
  },
  img: {
    width: 58,
    height: 58,
  },
  selected: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.85,
    borderWidth: 4, // Add this
    borderColor: "#FFD700", // Gold border for highlight
    backgroundColor: "#ffe066",
  },
});
