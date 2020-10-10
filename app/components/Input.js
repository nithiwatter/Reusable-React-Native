import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { theme } from "../config";

import Block from "./Block";
import Icon from "./Icon";

export default function Input(props) {
  const { icon, width = "100%", margin, ...otherProps } = props;
  return (
    <Block
      flex={false}
      row
      center
      width={width}
      style={styles.container}
      elevation={2}
      margin={margin}
    >
      {icon && <Icon name={icon} iconSize={20} iconColor="gray2" />}
      <TextInput
        placeholderTextColor={theme.colors.gray}
        style={{ flex: 1, marginLeft: 10, ...theme.fonts.h3 }}
        {...otherProps}
      ></TextInput>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: 25,
    padding: 15,
  },
});
