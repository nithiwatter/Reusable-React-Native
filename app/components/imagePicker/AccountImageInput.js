import React from "react";
import {
  Platform,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
} from "react-native";
import { Avatar } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

import { theme } from "../../config";
import Block from "../Block";

export default function AccountImageInput({ image, setImage }) {
  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.5,
    });

    // console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    } else {
      setImage(null);
    }
  };

  return (
    <React.Fragment>
      {!image && (
        <TouchableWithoutFeedback onPress={pickImage}>
          <Avatar.Icon
            size={70}
            icon="camera"
            style={{ backgroundColor: theme.colors.light }}
          />
        </TouchableWithoutFeedback>
      )}
      {image && (
        <TouchableWithoutFeedback onPress={pickImage}>
          <Avatar.Image
            size={70}
            source={{
              uri: image,
            }}
          />
        </TouchableWithoutFeedback>
      )}
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
  },
});
