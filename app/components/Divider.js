import React from "react";
import { StyleSheet } from "react-native";

import Block from "./Block";
import { theme } from "../config";

export default function Divider(props) {
  const { color, thickness, vertical, style, ...otherProps } = props;
  const dividerStyles = [
    styles.divider,
    color && { borderBottomColor: theme.colors[color] || color },
    thickness && { borderBottomWidth: thickness },
    style,
  ];

  const verticalDividerStyles = [
    styles.verticalDivider,
    color && { borderLeftColor: theme.colors[color] || color },
    thickness && { borderLeftWidth: thickness },
    style,
  ];

  return (
    <Block
      style={vertical ? verticalDividerStyles : dividerStyles}
      flex={false}
      elevation={0}
      {...otherProps}
    />
  );
}

export const styles = StyleSheet.create({
  divider: {
    height: 0,
    margin: theme.sizes.base * 2,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  verticalDivider: {
    // need this to prevent the divider taking over all the space
    width: 0,
    margin: theme.sizes.base,
    borderLeftColor: theme.colors.gray2,
    borderLeftWidth: StyleSheet.hairlineWidth,
  },
});
