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
}) {
  // Determine background color and disabled state
  const flat = StyleSheet.flatten(style) || {};
  const backgroundColor = flat.backgroundColor ?? color ?? "#786e6eff";
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
      <Image style={styles.img} source={img}/>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 5,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
  },
  pressed: {
    opacity: 0.85,
  },
  img: {
    width: 32,
    height: 32,
  },
});
