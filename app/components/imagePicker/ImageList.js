import React from "react";
import { ScrollView } from "react-native";

import Block from "../Block";
import ImageInput from "./ImageInput";

export default function ImageList(props) {
  const { imageUris = [], onRemoveImage, onAddImage } = props;
  const scrollView = React.useRef();
  return (
    <Block>
      <ScrollView
        ref={scrollView}
        horizontal
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
      >
        <Block row margin={20}>
          {imageUris.map((uri) => {
            return (
              <Block key={uri} margin={[0, 10, 0, 0]}>
                <ImageInput
                  imageUri={uri}
                  onChangeImage={() => onRemoveImage(uri)}
                />
              </Block>
            );
          })}
          <ImageInput onChangeImage={(uri) => onAddImage(uri)} />
        </Block>
      </ScrollView>
    </Block>
  );
}
