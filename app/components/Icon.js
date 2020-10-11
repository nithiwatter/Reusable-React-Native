import React from "react";
import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { theme } from "../config";

export default function Icon(props) {
  const { name, size = 20, color = "white" } = props;

  return (
    <MaterialCommunityIcons
      name={name}
      color={styles[color] ? styles[color].color : color}
      size={size}
    />
  );
}

const styles = StyleSheet.create({
  // colors
  accent: { color: theme.colors.accent },
  primary: { color: theme.colors.primary },
  secondary: { color: theme.colors.secondary },
  tertiary: { color: theme.colors.tertiary },
  black: { color: theme.colors.black },
  white: { color: theme.colors.white },
  gray: { color: theme.colors.gray },
  gray2: { color: theme.colors.gray2 },
});
