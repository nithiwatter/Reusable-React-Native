import React from "react";
import { useFormikContext } from "formik";

import Input from "../Input";
import ErrorMessage from "./ErrorMessage";

export default function FormInput(props) {
  const { name, width, enableError, ...otherProps } = props;
  const {
    setFieldTouched,
    handleChange,
    values,
    errors,
    touched,
  } = useFormikContext();

  // save some rerender by handling onChangeText to maybe onFocus?
  return (
    <React.Fragment>
      <Input
        defaultValue={values[name]}
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        width={width}
        {...otherProps}
      />
      {enableError && (
        <ErrorMessage error={errors[name]} visible={touched[name]} />
      )}
    </React.Fragment>
  );
}
