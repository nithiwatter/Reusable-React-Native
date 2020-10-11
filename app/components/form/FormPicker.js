import React from "react";
import { useFormikContext } from "formik";

import Picker from "../Picker";
import ErrorMessage from "./ErrorMessage";

export default function FormPicker(props) {
  const {
    items,
    name,
    numberOfColumns,
    PickerItemComponent,
    placeholder,
    width,
    icon,
    ...otherProps
  } = props;
  const { errors, setFieldValue, touched, values } = useFormikContext();

  return (
    <React.Fragment>
      <Picker
        items={items}
        numberOfColumns={numberOfColumns}
        onSelectItem={(item) => setFieldValue(name, item)}
        PickerItemComponent={PickerItemComponent}
        placeholder={placeholder}
        selectedItem={values[name]}
        width={width}
        icon={icon}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </React.Fragment>
  );
}
