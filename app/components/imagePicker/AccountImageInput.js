import React from "react";
import {
  Platform,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import Badge from "../Badge";
import Icon from "../Icon";

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
    }
  };

  return (
    <TouchableWithoutFeedback onPress={pickImage}>
      <Badge size={80} color="light" style={styles.container}>
        {!image && <Icon color="gray" name="camera" size={40} />}
        {image && <Image source={{ uri: image }} style={styles.image} />}
      </Badge>
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
