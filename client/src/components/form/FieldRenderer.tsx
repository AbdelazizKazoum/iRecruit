/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/form/FieldRenderer.tsx

import React from "react";
import TextInput from "./fields/TextInput";
import DatePicker from "./fields/DatePicker";
import SelectField from "./fields/SelectFieldProps";
import CheckboxField from "./fields/CheckboxField";

interface FieldRendererProps {
  field: any;
  value: any;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | Date | null
  ) => void;
  error?: string;
}

const FieldRenderer: React.FC<FieldRendererProps> = ({
  field,
  value,
  onChange,
  error,
}) => {
  switch (field.type) {
    case "text":
      return (
        <TextInput
          label={field.label}
          name={field.name}
          value={value}
          onChange={
            onChange as (e: React.ChangeEvent<HTMLInputElement>) => void
          }
          error={error}
          placeholder={field.placeholder}
        />
      );
    case "select":
      return (
        <SelectField
          label={field.label}
          name={field.name}
          options={field.options}
          value={value}
          onChange={
            onChange as (e: React.ChangeEvent<HTMLSelectElement>) => void
          }
          error={error}
        />
      );
    case "checkbox":
      return (
        <CheckboxField
          label={field.label}
          name={field.name}
          checked={value}
          onChange={
            onChange as (e: React.ChangeEvent<HTMLInputElement>) => void
          }
          error={error}
        />
      );
    case "date":
      return (
        <DatePicker
          label={field.label}
          name={field.name}
          selectedDate={value}
          onChange={onChange as (date: Date | null) => void}
          error={error}
        />
      );
    default:
      return null;
  }
};

export default FieldRenderer;
