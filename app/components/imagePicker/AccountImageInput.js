import React from "react";
import rgba from "hex-to-rgba";
import { Platform, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { Avatar } from "react-native-paper";
import { useActionSheet } from "@expo/react-native-action-sheet";
import * as ImagePicker from "expo-image-picker";

import ErrorCode from "../../config/errorCode";
import { theme } from "../../config";
import Block from "../Block";
import Badge from "../Badge";
import Icon from "../Icon";

export default function AccountImageInput({ image, setImage, size = 70 }) {
  const { showActionSheetWithOptions } = useActionSheet();

  const requestPermission = async () => {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

      return new Promise((resolve) => {
        if (status !== "granted") {
          resolve({ error: ErrorCode.requireCameraRollPermissions });
        } else {
          resolve({ error: null });
        }
      });
    }
  };

  const pickImage = async () => {
    // wait for permission first
    const { error } = await requestPermission();

    // no permission => does not allow user to pick image/just alert something
    if (error) return alert(error);

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.5,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    } else {
      setImage(null);
    }
  };

  const openAccountImageActionSheets = () => {
    const options = ["Choose profile photo", "Delete this photo", "Cancel"];
    const destructiveButtonIndex = 1;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            return pickImage();
          case 1:
            if (image) {
              setImage(null);
            }
          case 2:
            return;
          default:
            return;
        }
      }
    );
  };

  return (
    <React.Fragment>
      {!image && (
        <TouchableWithoutFeedback onPress={openAccountImageActionSheets}>
          <Block flex={false} middle center style={styles.container}>
            <Avatar.Icon
              size={size}
              icon="camera"
              style={{ backgroundColor: theme.colors.light }}
            />
          </Block>
        </TouchableWithoutFeedback>
      )}
      {image && (
        <TouchableWithoutFeedback onPress={openAccountImageActionSheets}>
          <Block flex={false} middle center style={styles.container}>
            <Avatar.Image
              size={size}
              source={{
                uri: image,
              }}
              style={{ backgroundColor: theme.colors.light }}
            />
            <Badge
              style={styles.editIcon}
              size={30}
              color={rgba(theme.colors.gray, 0.4)}
            >
              <Icon name="circle-edit-outline" size={25} color="light" />
            </Badge>
          </Block>
        </TouchableWithoutFeedback>
      )}
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    position: "relative",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    zIndex: 1,
  },
});
