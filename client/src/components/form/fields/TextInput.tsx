/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/form/fields/TextInput.tsx

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/libs/utils";
import React from "react";

interface TextInputProps {
  fieldConfig: any;
  // onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: any;
  field: any;
  error?: any;
}

const TextInput: React.FC<TextInputProps> = ({ fieldConfig, field, error }) => {
  return (
    <FormItem>
      <FormLabel>{fieldConfig.label}</FormLabel>
      <FormControl>
        <Input
          placeholder={fieldConfig.placeholder}
          {...field}
          className={cn(error[fieldConfig.name] && "border-destructive ")}
          // defaultValue={value}
        />
      </FormControl>
      <FormDescription>{fieldConfig.description}</FormDescription>
      <FormMessage />
    </FormItem>
  );
};

export default TextInput;
