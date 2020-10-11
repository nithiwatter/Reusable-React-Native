import React from "react";
import { useFormikContext } from "formik";

import Input from "../Input";
import ErrorMessage from "./ErrorMessage";

export default function FormInput(props) {
  const { name, width, ...otherProps } = props;
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();
  return (
    <React.Fragment>
      <Input
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        width={width}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </React.Fragment>
  );
}
