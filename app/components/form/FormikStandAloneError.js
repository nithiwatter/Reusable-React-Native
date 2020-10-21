import React from "react";
import { useFormikContext } from "formik";
import ErrorMessage from "./ErrorMessage";

export default function FormikStandAloneError(props) {
  const { errors, touched } = useFormikContext();
  const { name } = props;
  return <ErrorMessage error={errors[name]} visible={touched[name]} />;
}
