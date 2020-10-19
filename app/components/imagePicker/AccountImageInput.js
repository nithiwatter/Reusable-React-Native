import React from "react";
import {
  Platform,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
} from "react-native";
import { Avatar, Accessory } from "react-native-elements";
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
    <TouchableWithoutFeedback onPress={pickImage}>
      <React.Fragment>
        {!image && (
          <Avatar
            icon={{ name: "camera", type: "material-community" }}
            size="large"
            rounded
            overlayContainerStyle={{ backgroundColor: theme.colors.gray2 }}
            onPress={pickImage}
          />
        )}
        {image && (
          <Avatar
            source={{
              uri: image,
            }}
            size="large"
            rounded
            onPress={pickImage}
          >
            <Accessory size={25} name="camera" type="material-community" />
          </Avatar>
        )}
      </React.Fragment>
    </TouchableWithoutFeedback>
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
