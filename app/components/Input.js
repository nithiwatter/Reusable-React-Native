import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { theme } from "../config";

import Block from "./Block";
import Icon from "./Icon";

export default function Input(props) {
  const {
    icon,
    width,
    margin,
    elevation = 0,
    style = {},
    inputStyle = {},
    color = theme.colors.black,
    ...otherProps
  } = props;

  return (
    <Block
      flex={false}
      row
      center
      width={width}
      style={{ ...styles.container, ...style }}
      elevation={elevation}
      margin={margin}
      // style={border && { borderWidth: 2, borderColor: theme.colors.primary }}
    >
      {icon && <Icon name={icon} iconSize={20} iconColor="gray2" />}
      <TextInput
        placeholderTextColor={theme.colors.gray}
        style={{
          flex: 1,
          marginLeft: 10,
          ...theme.fonts.h3,
          color,
          ...inputStyle,
        }}
        {...otherProps}
      ></TextInput>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.sizes.radius,
    padding: theme.sizes.inputPadding,
  },
});
