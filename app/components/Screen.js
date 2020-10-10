import React from "react";
import Constants from "expo-constants";
import Block from "./Block";

export default function Screen(props) {
  const { modal } = props;
  return (
    <Block
      padding={!modal && [Constants.statusBarHeight, 0, 0, 0]}
      {...props}
    ></Block>
  );
}
