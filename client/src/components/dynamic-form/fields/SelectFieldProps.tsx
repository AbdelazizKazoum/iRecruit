/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/form/fields/SelectField.tsx

import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Locale } from "@/configs/i18n";
import { cn } from "@/libs/utils";
import React, { memo } from "react";
import { useFormContext } from "react-hook-form";

interface Option {
  label: {
    ar: string;
    fr: string;
    en: string;
  };
  value: string;
}

interface SelectFieldProps {
  fieldConfig: any;
  value?: string | number;
  // onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  field: any;
  locale: Locale;
}

const SelectField: React.FC<SelectFieldProps> = ({
  fieldConfig,
  field,
  // onChange,
  locale,
}) => {
  const { watch } = useFormContext();
  const { error } = useFormField();

  const dependsOn = watch(fieldConfig.dependsOn);

  return (
    <>
      {dependsOn && (
        <FormItem>
          <FormLabel>{fieldConfig.label[locale]}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className={cn(error && " border-destructive ")}>
                <SelectValue
                  placeholder={
                    fieldConfig.placeholder && fieldConfig.placeholder[locale]
                  }
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {fieldConfig.options.map((item: Option, index: number) => (
                <SelectItem key={index} value={item?.value || ""}>
                  {item.label[locale]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    </>
  );
};

export default memo(SelectField);
