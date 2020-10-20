import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

import Block from "../../Block";
import Typography from "../../Typography";
import Icon from "../../Icon";

export default function AccountListItemView({
  title,
  icon,
  size = 30,
  color,
  onPress,
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Block row middle center flex={false} width="100%" padding={[10, 20]}>
        <Icon name={icon} size={size} color={color} />
        <Typography title style={{ marginLeft: 20 }}>
          {title}
        </Typography>
        <Block flex={false} middle center style={{ marginLeft: "auto" }}>
          <Icon name="chevron-right" size={20} color="gray" />
        </Block>
      </Block>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
