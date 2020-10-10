import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Block from "./app/components/Block";
import Icon from "./app/components/Icon";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Block
        flex={false}
        row
        middle
        center
        space="around"
        color="black"
        width="70%"
        height="40%"
      >
        <Icon
          name="trophy"
          size={80}
          iconSize={40}
          elevation={0}
          borderWidth={4}
          borderColor="secondary"
          color="primary"
        ></Icon>
        <Icon
          name="trophy"
          size={80}
          iconSize={40}
          elevation={0}
          borderWidth={4}
          borderColor="secondary"
          color="primary"
          square
        ></Icon>
        <Icon
          name="trophy"
          size={80}
          iconSize={40}
          elevation={0}
          borderWidth={4}
          borderColor="secondary"
          color="primary"
          square
        ></Icon>
      </Block>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
