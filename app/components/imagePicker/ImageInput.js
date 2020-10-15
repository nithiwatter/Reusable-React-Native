import React, { Component } from "react";
import {
  TouchableWithoutFeedback,
  Alert,
  Image,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import Block from "../Block";
import Icon from "../Icon";

export default class ImageInput extends Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }

  async componentDidMount() {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
  }

  handlePress() {
    const { imageUri, onChangeImage } = this.props;
    if (!imageUri) {
      this.pickImage();
    } else {
      // for deleting image, onChangeImage does not accept argument
      Alert.alert("Delete", "Are you sure you want to delete this image?", [
        { text: "Yes", onPress: () => onChangeImage() },
        { text: "No" },
      ]);
    }
  }

  async pickImage() {
    try {
      const { onChangeImage } = this.props;
      // allow only images to be selected (with quality = 0.5)
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.cancelled) onChangeImage(result.uri);
    } catch (err) {}
  }

  render() {
    const { imageUri } = this.props;
    return (
      <TouchableWithoutFeedback onPress={this.handlePress}>
        <Block
          flex={false}
          middle
          center
          row
          color="gray2"
          width={120}
          height={120}
          card
          style={styles.container}
        >
          {!imageUri && <Icon color="gray" name="camera" size={40} />}
          {imageUri && (
            <Image source={{ uri: imageUri }} style={styles.image} />
          )}
        </Block>
      </TouchableWithoutFeedback>
    );
  }
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
