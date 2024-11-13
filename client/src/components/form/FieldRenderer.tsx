/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/form/FieldRenderer.tsx

import React from "react";
import TextInput from "./fields/TextInput";
import SelectField from "./fields/SelectFieldProps";
import CheckboxField from "./fields/CheckboxField";
import DatePicker from "./fields/DatePicker";
// import CheckboxField from "./fields/CheckboxField";

interface FieldRendererProps {
  fieldConfig: any;
  value?: any;
  // onChange: (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | Date | null
  // ) => void;
  field: any;
  error?: any;
}

const FieldRenderer: React.FC<FieldRendererProps> = ({
  fieldConfig,
  value,
  error,
  // onChange,
  // error,
  field,
}) => {
  switch (fieldConfig.type) {
    case "text":
      return (
        <TextInput
          fieldConfig={fieldConfig}
          field={field}
          value={value}
          error={error}
          // onChange={
          //   onChange as (e: React.ChangeEvent<HTMLInputElement>) => void
          // }
        />
      );
    case "select":
      return (
        <SelectField
          value={value}
          fieldConfig={fieldConfig}
          field={field}
          error={error}
        />
      );
    case "checkbox":
      return (
        <CheckboxField
          value={value}
          fieldConfig={fieldConfig}
          field={field}
          error={error}
        />
      );

    case "date":
      return (
        <DatePicker
          selectedDate={value}
          // onChange={onChange as (date: Date | null) => void}
          fieldConfig={fieldConfig}
          field={field}
          error={error}
        />
      );
    default:
      return null;
  }
};

export default FieldRenderer;
