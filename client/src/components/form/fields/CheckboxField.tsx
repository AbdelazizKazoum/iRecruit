/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/form/fields/TextInput.tsx

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "@/components/ui/form";
import { cn } from "@/libs/utils";
import React, { memo } from "react";
import { useFormContext } from "react-hook-form";

interface TextInputProps {
  fieldConfig: any;
  // onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: any;
  field: any;
}

const CheckboxField: React.FC<TextInputProps> = ({ fieldConfig, field }) => {
  const {} = useFormContext();
  const { error } = useFormField();

  return (
    <FormItem style={{ marginTop: "15px", marginBottom: "15px" }}>
      <div
        className={cn(
          "flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4  ",
          error && "border-destructive"
        )}
      >
        <FormControl>
          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
        </FormControl>
        <div className="space-y-1 leading-none">
          <FormLabel>{fieldConfig.label}</FormLabel>
          <FormDescription>{fieldConfig.description}</FormDescription>
        </div>
      </div>
      <FormMessage />
    </FormItem>
  );
};

export default memo(CheckboxField);
