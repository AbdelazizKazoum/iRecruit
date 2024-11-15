/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/form/fields/TextInput.tsx

import { FileUpload } from "@/components/ui/file-upload";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/libs/utils";
import React from "react";
import { useFormContext } from "react-hook-form";

interface TextInputProps {
  fieldConfig: any;
  // onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: any;
  field: any;
}

const FileInput: React.FC<TextInputProps> = ({ fieldConfig, field }) => {
  const {
    watch,
    formState: { errors },
  } = useFormContext();

  const dependsOn = watch(fieldConfig.dependsOn);

  const watchValue = watch("cinPdf");
  console.log("🚀 ~ watchValue cinpdf:", watchValue?.name);

  return (
    <>
      {dependsOn && (
        <FormItem>
          <FormLabel>{fieldConfig.label}</FormLabel>
          <FormControl>
            <FileUpload
              type="file"
              placeholder={fieldConfig.placeholder}
              {...field}
              onChange={field.onChange}
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

export default FileInput;
