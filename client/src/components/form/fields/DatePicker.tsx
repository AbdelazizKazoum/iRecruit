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

interface DatePickerProps {
  fieldConfig: any;
  selectedDate: Date | null;
  // onChange: (date: Date | null) => void;
  field: any;
}

const DatePicker: React.FC<DatePickerProps> = ({ fieldConfig, field }) => (
  <div>
    <FormItem className="flex flex-col">
      <FormLabel>Date of birth</FormLabel>
      <FormControl>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] pl-3 text-left font-normal",
            !field.value && "text-muted-foreground"
          )}
        >
          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </FormControl>
      <Calendar
        mode="single"
        selected={field.value}
        onSelect={field.onChange}
        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
        initialFocus
      />
      <FormDescription>
        Your date of birth is used to calculate your age.
      </FormDescription>
      <FormMessage />
    </FormItem>
  </div>
);

export default DatePicker;
