import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "../config";

export default function Button(props) {
  const {
    style,
    width,
    opacity = 0.8,
    gradient,
    color = theme.colors.white,
    startColor = theme.colors.primary,
    endColor = theme.colors.secondary,
    start = { x: 0, y: 0 },
    end = { x: 1, y: 1 },
    locations = [0.1, 0.9],
    elevation = 0,
    // shadow,
    children,
    ...otherProps
  } = props;

  const buttonStyles = [
    styles.button,
    // shadow && styles.shadow,
    elevation && { elevation },
    color && styles[color], // predefined styles colors for backgroundColor
    color && !styles[color] && { backgroundColor: color }, // custom backgroundColor
    width && { width },
    style,
  ];

  if (gradient) {
    return (
      <TouchableOpacity
        style={buttonStyles}
        activeOpacity={opacity}
        {...otherProps}
      >
        <LinearGradient
          start={start}
          end={end}
          locations={locations}
          // so it fills up the entire button touchable area
          style={[buttonStyles, { width: "100%" }]}
          colors={[startColor, endColor]}
        >
          {children}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={buttonStyles}
      activeOpacity={opacity}
      {...otherProps}
    >
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.sizes.radius,
    height: theme.sizes.base * 3,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: theme.sizes.padding / 3,
  },
  // for iOS
  // shadow: {
  //   shadowColor: theme.colors.black,
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 10
  // },
  accent: { backgroundColor: theme.colors.accent },
  primary: { backgroundColor: theme.colors.primary },
  secondary: { backgroundColor: theme.colors.secondary },
  tertiary: { backgroundColor: theme.colors.tertiary },
  black: { backgroundColor: theme.colors.black },
  white: { backgroundColor: theme.colors.white },
  gray: { backgroundColor: theme.colors.gray },
  gray2: { backgroundColor: theme.colors.gray2 },
  gray3: { backgroundColor: theme.colors.gray3 },
  gray4: { backgroundColor: theme.colors.gray4 },
});
