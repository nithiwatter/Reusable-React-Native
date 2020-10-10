import React from "react";
import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { theme } from "../config";
import Block from "./Block";

export default function Icon(props) {
  const {
    name,
    size = 40,
    iconSize = 20,
    iconColor = "white",
    borderWidth = 0,
    borderRadius = 0,
    borderColor = "primary",
    square,
    style,
    ...otherProps
  } = props;

  const iconContainerStyle = {
    width: size,
    height: size,
    borderWidth,
    borderRadius: square ? borderRadius : size / 2,
    borderColor: styles[borderColor] ? styles[borderColor].color : borderColor, // if borderColor is one of the presets, use that
    ...style,
  };

  return (
    <Block
      flex={false}
      row
      middle
      center
      style={iconContainerStyle}
      {...otherProps}
    >
      <MaterialCommunityIcons
        name={name}
        color={styles[iconColor] ? styles[iconColor].color : iconColor}
        size={iconSize}
      />
    </Block>
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
