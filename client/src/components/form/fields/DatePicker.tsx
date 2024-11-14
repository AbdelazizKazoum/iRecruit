/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/form/fields/DatePicker.tsx

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/libs/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import "react-datepicker/dist/react-datepicker.css";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DatePickerProps {
  fieldConfig: any;
  selectedDate: Date | null;
  // onChange: (date: Date | null) => void;
  field: any;
  error: any;
}

const DatePicker: React.FC<DatePickerProps> = ({
  fieldConfig,
  field,
  error,
}) => (
  <div>
    <FormItem className="flex flex-col justify-end  align-bottom ">
      <FormLabel className=" h-[18.4px] ">{fieldConfig.label}</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={"outline"}
              className={cn(
                "pl-3 m-0 text-left font-normal ",
                !field.value && "text-muted-foreground",
                error[fieldConfig.name] && " border-destructive"
              )}
            >
              {field.value ? (
                format(field.value, "PPP")
              ) : (
                <span>{fieldConfig.placeholder}</span>
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
      <FormDescription>{fieldConfig.description}</FormDescription>
      <FormMessage />
    </FormItem>
  </div>
);

export default DatePicker;
