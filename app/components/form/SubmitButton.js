import React from "react";
import { useFormikContext } from "formik";

import Button from "../Button";
import Typography from "../Typography";

export default function SubmitButton(props) {
  const { title, ...otherProps } = props;
  const { handleSubmit } = useFormikContext();
  return (
    <Button gradient onPress={handleSubmit} {...otherProps}>
      <Typography h3 white>
        {title}
      </Typography>
    </Button>
  );
}
