import React from "react";
import { TouchableOpacity } from "react-native";
import Block from "./Block";
import Typography from "./Typography";
import Icon from "./Icon";

export default function PickerItem(props) {
  const { item, onPress, showChecked } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <Block row center padding={20}>
        {showChecked && (
          <Block flex={false} row middle center margin={[0, 10, 0, 0]}>
            <Icon name="check-bold" iconSize={20} iconColor="gray2" />
          </Block>
        )}
        <Typography h3 style={{ flex: 1 }}>
          {item.label}
        </Typography>
      </Block>
    </TouchableOpacity>
  );
}
