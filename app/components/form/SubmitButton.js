import React from "react";
import { useFormikContext } from "formik";

import Button from "../Button";
import Typography from "../Typography";

export default function SubmitButton(props) {
  const { title } = props;
  const { handleSubmit } = useFormikContext();
  return (
    <Button gradient onPress={handleSubmit}>
      <Typography h3 white>
        {title}
      </Typography>
    </Button>
  );
}
