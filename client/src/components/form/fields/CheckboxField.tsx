/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/form/fields/TextInput.tsx

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/libs/utils";
import React from "react";

interface TextInputProps {
  fieldConfig: any;
  // onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: any;
  field: any;
  error: any;
}

const CheckboxField: React.FC<TextInputProps> = ({
  fieldConfig,
  field,
  error,
}) => {
  return (
    <FormItem style={{ marginTop: "15px", marginBottom: "15px" }}>
      <div
        className={cn(
          "flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4  ",
          error[fieldConfig.name] && "border-destructive"
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

export default CheckboxField;
