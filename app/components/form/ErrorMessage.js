import React from "react";
import Typography from "../Typography";

export default function ErrorMessage(props) {
  const { error, visible } = props;
  if (!visible || !error) return null;

  return (
    <Typography h3 accent>
      {error}
    </Typography>
  );
}
