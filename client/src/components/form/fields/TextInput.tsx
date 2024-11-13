/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/form/fields/TextInput.tsx

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";

interface TextInputProps {
  fieldConfig: any;
  // onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  form: any;
  value: any;
}

const TextInput: React.FC<TextInputProps> = ({ form, fieldConfig, value }) => {
  console.log("🚀 ~ fieldConfig:", fieldConfig);
  return (
    <div>
      <FormField
        control={form.control}
        name={fieldConfig.name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{fieldConfig.label}</FormLabel>
            <FormControl>
              <Input
                placeholder={fieldConfig.placeholder}
                {...field}
                // defaultValue={value}
              />
            </FormControl>
            <FormDescription>{fieldConfig.description}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default TextInput;
