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
import { useFormContext } from "react-hook-form";

interface TextInputProps {
  fieldConfig: any;
  // onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: any;
  field: any;
}

const TextInput: React.FC<TextInputProps> = ({ fieldConfig, field }) => {
  const {
    watch,
    formState: { errors },
  } = useFormContext();

  const dependsOn = watch(fieldConfig.dependsOn);

  return (
    <>
      {dependsOn && (
        <FormItem>
          <FormLabel>{fieldConfig.label}</FormLabel>
          <FormControl>
            <Input
              placeholder={fieldConfig.placeholder}
              {...field}
              className={cn(errors[fieldConfig.name] && "border-destructive ")}
              // defaultValue={value}
            />
          </FormControl>
          <FormDescription>{fieldConfig.description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    </>
  );
};

export default TextInput;
