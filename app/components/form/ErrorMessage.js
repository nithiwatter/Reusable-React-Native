import React from "react";
import Block from "../Block";
import Typography from "../Typography";

export default function ErrorMessage(props) {
  const { error, visible } = props;
  if (!visible || !error) return null;

  return (
    <Block flex={false} width="100%" middle padding={10}>
      <Typography h3 accent>
        {error}
      </Typography>
    </Block>
  );
}
