import React from "react";
import { Formik } from "formik";

export default function Form(props) {
  const { initialValues, onSubmit, validationSchema, children } = props;
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => <>{children}</>}
    </Formik>
  );
}
