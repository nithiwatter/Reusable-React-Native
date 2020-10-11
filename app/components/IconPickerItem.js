import React from "react";
import { TouchableOpacity } from "react-native";
import rgba from "hex-to-rgba";

import { theme } from "../config";
import Block from "./Block";
import Icon from "./Icon";
import Badge from "./Badge";
import Typography from "./Typography";

export default function IconPickerItem(props) {
  const { item, onPress, showChecked } = props;
  return (
    // use { flex: 1 } to distribute space evenly for multicol FlatList
    <Block center middle padding={10}>
      <TouchableOpacity onPress={onPress}>
        <Badge
          size={70}
          color={rgba(theme.colors.primary, 0.1)}
          style={
            showChecked
              ? { borderWidth: 3, borderColor: theme.colors.secondary }
              : null
          }
        >
          <Badge size={55} color={rgba(theme.colors.primary, 0.1)}>
            <Icon
              iconColor={item.backgroundColor}
              iconSize={40}
              name={item.icon}
            />
          </Badge>
        </Badge>
      </TouchableOpacity>
      <Block row middle center margin={[4, 0]}>
        <Typography body>{item.label}</Typography>
      </Block>
    </Block>
  );
}
