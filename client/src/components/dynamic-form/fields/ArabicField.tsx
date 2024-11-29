/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/form/fields/TextInput.tsx

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/libs/utils";
import React, { memo } from "react";
import { useFormContext } from "react-hook-form";

import { ArabicKeyboard as ArabicKeyboardWC } from "@/components/arabic-keyboard/arabic-keyboard";
import { createComponent } from "@lit/react";

const ArabicKeyboard = createComponent({
  tagName: "arabic-keyboard",
  elementClass: ArabicKeyboardWC,
  react: React,
});

interface TextInputProps {
  fieldConfig: any;
  // onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: any;
  field: any;
}

const ArabicField: React.FC<TextInputProps> = ({ fieldConfig, field }) => {
  const { watch } = useFormContext();
  const { error } = useFormField();

  const dependsOn = watch(fieldConfig.dependsOn);

  return (
    <>
      {dependsOn && (
        <FormItem>
          <FormLabel>{fieldConfig.label}</FormLabel>
          <FormControl>
            {/* <Input
              placeholder={fieldConfig.placeholder}
              type={fieldConfig.type}
              {...field}
              className={cn(error && "border-destructive ")}
              // defaultValue={value}
            /> */}
            <ArabicKeyboard fieldConfig={fieldConfig} error={error} />
          </FormControl>
          <FormDescription>{fieldConfig.description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    </>
  );
};

export default memo(ArabicField);
