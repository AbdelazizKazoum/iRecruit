/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/form/fields/TextInput.tsx

import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { memo } from "react";
import { useFormContext } from "react-hook-form";
import ArabicKeyboard from "@/components/arabic-keyboard/ArabicKeyboard";
import { Locale } from "@/configs/i18n";

interface TextInputProps {
  fieldConfig: any;
  // onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: any;
  field: any;
  locale: Locale;
}

const ArabicField: React.FC<TextInputProps> = ({ fieldConfig, locale }) => {
  const { watch } = useFormContext();

  const dependsOn = watch(fieldConfig.dependsOn);

  return (
    <>
      {dependsOn && (
        <FormItem>
          <FormLabel>{fieldConfig.label[locale]}</FormLabel>
          <FormControl>
            {/* <Input
              placeholder={fieldConfig.placeholder}
              type={fieldConfig.type}
              {...field}
              className={cn(error && "border-destructive ")}
              // defaultValue={value}
            /> */}
            <ArabicKeyboard fieldConfig={fieldConfig} />
          </FormControl>
          {/* <FormDescription>{fieldConfig.description}</FormDescription> */}
          <FormMessage />
        </FormItem>
      )}
    </>
  );
};

export default memo(ArabicField);
