/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/form/fields/DatePicker.tsx

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "@/components/ui/form";
import { cn } from "@/libs/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { memo } from "react";
import { Calendar } from "@/components/ui/calendar";
import "react-datepicker/dist/react-datepicker.css";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useFormContext } from "react-hook-form";
import { Locale } from "@/configs/i18n";

interface DatePickerProps {
  fieldConfig: any;
  // onChange: (date: Date | null) => void;
  field: any;
  locale: Locale;
}

const DatePicker: React.FC<DatePickerProps> = ({
  fieldConfig,
  field,
  locale,
}) => {
  const { watch } = useFormContext();
  const { error } = useFormField();

  const dependsOn = watch(fieldConfig.dependsOn);

  return (
    <>
      {dependsOn && (
        <FormItem className="flex flex-col justify-end ">
          <FormLabel className=" h-[18.4px] ">
            {fieldConfig.label[locale]}
          </FormLabel>
          <Popover>
            <PopoverTrigger asChild className="flex">
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "pl-3 m-0 text-left font-normal ",
                    !field.value && "text-muted-foreground",
                    error && " border-destructive"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>{fieldConfig.placeholder[locale]}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {/* <FormDescription>{fieldConfig.description}</FormDescription> */}
          <FormMessage />
        </FormItem>
      )}
    </>
  );
};

export default memo(DatePicker);
