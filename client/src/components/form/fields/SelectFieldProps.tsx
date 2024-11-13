/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/form/fields/SelectField.tsx

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

interface Option {
  label: string;
  value: string;
}

interface SelectFieldProps {
  fieldConfig: any;
  form: any;
  value?: string | number;
  // onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({
  form,
  fieldConfig,
  // onChange,
}) => (
  <FormField
    control={form.control}
    name="email"
    render={({ field }) => (
      <FormItem>
        <FormLabel>{fieldConfig.label}</FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder={fieldConfig.placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {fieldConfig.options.map((item: Option, index: number) => (
              <SelectItem key={index} value={item?.value || ""}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default SelectField;
