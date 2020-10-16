import React from "react";
import rgba from "hex-to-rgba";
import { ActivityIndicator, StyleSheet } from "react-native";

import { theme } from "../config";
import Block from "./Block";

export default function LoadingIndicator() {
  return (
    <Block color={rgba(theme.colors.gray, 0.2)} style={styles.container}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
});
