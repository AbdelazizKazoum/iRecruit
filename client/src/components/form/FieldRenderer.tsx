/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/form/FieldRenderer.tsx

import React from "react";
import TextInput from "./fields/TextInput";
import DatePicker from "./fields/DatePicker";
import SelectField from "./fields/SelectFieldProps";
// import CheckboxField from "./fields/CheckboxField";

interface FieldRendererProps {
  fieldConfig: any;
  value?: any;
  // onChange: (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | Date | null
  // ) => void;
  form: any;
}

const FieldRenderer: React.FC<FieldRendererProps> = ({
  fieldConfig,
  value,
  // onChange,
  // error,
  form,
}) => {
  switch (fieldConfig.type) {
    case "text":
      return (
        <TextInput
          form={form}
          fieldConfig={fieldConfig}
          value={value}
          // onChange={
          //   onChange as (e: React.ChangeEvent<HTMLInputElement>) => void
          // }
        />
      );
    case "select":
      return (
        <SelectField value={value} form={form} fieldConfig={fieldConfig} />
      );
    // case "checkbox":
    //   return (
    //     <CheckboxField
    //       label={field.label}
    //       name={field.name}
    //       checked={value}
    //       onChange={
    //         onChange as (e: React.ChangeEvent<HTMLInputElement>) => void
    //       }
    //       error={error}
    //     />
    //   );
    case "date":
      return (
        <DatePicker
          selectedDate={value}
          // onChange={onChange as (date: Date | null) => void}
          form={form}
          fieldConfig={fieldConfig}
        />
      );
    default:
      return null;
  }
};

export default FieldRenderer;
