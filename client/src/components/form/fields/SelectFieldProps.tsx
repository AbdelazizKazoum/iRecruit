/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/form/fields/SelectField.tsx

import {
  FormControl,
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
import { cn } from "@/libs/utils";
import React from "react";
import { useFormContext } from "react-hook-form";

interface Option {
  label: string;
  value: string;
}

interface SelectFieldProps {
  fieldConfig: any;
  value?: string | number;
  // onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  field: any;
}

const SelectField: React.FC<SelectFieldProps> = ({
  fieldConfig,
  field,
  // onChange,
}) => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <FormItem>
      <FormLabel>{fieldConfig.label}</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger
            className={cn(errors[fieldConfig?.name] && " border-destructive ")}
          >
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
  );
};

export default SelectField;
