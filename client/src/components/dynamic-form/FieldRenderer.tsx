/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/form/FieldRenderer.tsx

import React, { memo } from "react";
import TextInput from "./fields/TextInput";
import SelectField from "./fields/SelectFieldProps";
import CheckboxField from "./fields/CheckboxField";
import DatePicker from "./fields/DatePicker";
import FileInput from "./fields/FileInput";
import ArabicField from "./fields/ArabicField";
import { Locale } from "@/configs/i18n";
// import CheckboxField from "./fields/CheckboxField";

interface FieldRendererProps {
  fieldConfig: any;
  value?: any;
  // onChange: (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | Date | null
  // ) => void;
  field: any;
  locale: Locale;
}

const FieldRenderer: React.FC<FieldRendererProps> = ({
  fieldConfig,
  value,
  // onChange,
  // error,
  field,
  locale,
}) => {
  switch (fieldConfig.type) {
    case "text":
    case "number":
      return (
        <TextInput
          fieldConfig={fieldConfig}
          field={field}
          locale={locale}
          // onChange={
          //   onChange as (e: React.ChangeEvent<HTMLInputElement>) => void
          // }
        />
      );
    case "file":
      return (
        <FileInput
          fieldConfig={fieldConfig}
          field={field}
          locale={locale}
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
          locale={locale}
        />
      );
    case "checkbox":
      return (
        <CheckboxField
          value={value}
          fieldConfig={fieldConfig}
          field={field}
          locale={locale}
        />
      );

    case "date":
      return (
        <DatePicker
          selectedDate={value}
          // onChange={onChange as (date: Date | null) => void}
          fieldConfig={fieldConfig}
          field={field}
          locale={locale}
        />
      );
    case "arabic":
      return (
        <ArabicField fieldConfig={fieldConfig} field={field} locale={locale} />
      );

    default:
      return null;
  }
};

export default memo(FieldRenderer);
