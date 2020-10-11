import React from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  FlatList,
} from "react-native";

import { theme } from "../config";
import Block from "./Block";
import Button from "./Button";
import Icon from "./Icon";
import Typography from "./Typography";
import Screen from "./Screen";
import PickerItem from "./PickerItem";

export default function Picker(props) {
  const {
    icon,
    width = "100%",
    placeholder,
    selectedItem,
    items,
    onSelectItem,
    numberOfColumns,
    PickerItemComponent = PickerItem,
    ...otherProps
  } = props;
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <React.Fragment>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <Block
          flex={false}
          elevation={2}
          style={[styles.container, { width }]}
          row
          center
          {...otherProps}
        >
          {icon && (
            <Block flex={false} row middle center>
              <Icon name={icon} iconSize={20} iconColor="gray2" />
            </Block>
          )}
          {selectedItem ? (
            <Typography h3 style={{ flex: 1, marginLeft: 10 }}>
              {selectedItem.label}
            </Typography>
          ) : (
            <Typography h3 style={{ flex: 1, marginLeft: 10 }}>
              {placeholder}
            </Typography>
          )}
          <Block flex={false} row middle center margin={[0, 10]}>
            <Icon name="chevron-down" iconSize={20} iconColor="gray2" />
          </Block>
        </Block>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <Screen modal>
          <Block row middle center flex={false} margin={[10, 0]}>
            <Button gradient onPress={() => setModalVisible(false)} width="60%">
              <Typography h3 color="white">
                Close
              </Typography>
            </Button>
          </Block>

          <FlatList
            data={items}
            keyExtractor={(item) => item.value.toString()}
            numColumns={numberOfColumns}
            renderItem={({ item }) => (
              <PickerItemComponent
                showChecked={item === selectedItem ? true : false}
                item={item}
                label={item.label}
                onPress={() => {
                  setModalVisible(false);
                  onSelectItem(item);
                }}
              />
            )}
          />
        </Screen>
      </Modal>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.sizes.radius,
    padding: theme.sizes.inputPadding,
  },
});
