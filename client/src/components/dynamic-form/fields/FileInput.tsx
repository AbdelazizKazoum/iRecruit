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
import { Skeleton } from "@/components/ui/skeleton";
import { Locale } from "@/configs/i18n";
import { cn } from "@/libs/utils";
import { downloadFile } from "@/utils/downloadFile";
import { CheckCircleIcon, UploadIcon } from "lucide-react";
import React, { memo, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

interface TextInputProps {
  fieldConfig: any;
  // onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: any;
  field: any;
  locale: Locale;
}

const FileInput: React.FC<TextInputProps> = ({
  fieldConfig,
  locale,
  field,
}) => {
  const [fileName, setFileName] = React.useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const { watch, setValue, trigger } = useFormContext();

  const { error } = useFormField();

  const dependsOn = watch(fieldConfig.dependsOn);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setValue(fieldConfig.name, file);
    trigger(fieldConfig.name);

    setFileName(file ? file.name : null);
  };

  useEffect(() => {
    if (typeof field.value === "string") {
      (async () => {
        const file = await downloadFile(field.value);

        setFileName(field.value.split("\\").pop().split("/").pop());
        setValue(field.name, file);
      })();
    }

    setLoading(false);
  }, [field.value, field.name, setValue]);

  if (loading)
    return (
      <>
        {" "}
        <Skeleton className="h-8 w-full" />
      </>
    );

  return (
    <>
      {dependsOn && (
        <FormItem>
          <FormLabel>{fieldConfig.label[locale]}</FormLabel>
          <FormControl>
            <label
              className={cn(
                "flex h-9 cursor-pointer w-full items-center justify-between rounded-md border border-gray-400 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-within:outline-none focus-within:border-2 focus-within:border-primary focus-within:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                error && "border-destructive"
              )}
            >
              <div className="flex items-center gap-2 overflow-hidden ">
                {fileName ? (
                  <>
                    <CheckCircleIcon className="h-4 w-4 text-green-500" />
                    <span className="text-green-500">
                      Fichier sélectionné:{" "}
                    </span>
                    <p className=" text-primary ">{fileName}</p>
                  </>
                ) : (
                  <>
                    <UploadIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Charger</span>
                  </>
                )}
              </div>
              <input
                type="file"
                name={fieldConfig.name}
                placeholder={
                  fieldConfig.placeholder && fieldConfig.placeholder[locale]
                }
                onChange={(e) => handleFileChange(e)}
                className={cn("sr-only z-50", "border-destructive ")}
                // defaultValue={value}
              />
            </label>
          </FormControl>
          <FormDescription>{fieldConfig.description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    </>
  );
};

export default memo(FileInput);
