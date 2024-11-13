/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/form/fields/DatePicker.tsx

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {
  fieldConfig: any;
  selectedDate: Date | null;
  form: any;
  // onChange: (date: Date | null) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ fieldConfig, form }) => (
  <div>
    <FormField
      control={form.control}
      name={fieldConfig.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{fieldConfig.label}</FormLabel>
          <FormControl>
            <ReactDatePicker
              selected={new Date()}
              // className={`form-control ${error ? "is-invalid" : ""}`}
              dateFormat="yyyy-MM-dd"
              {...field}
            />
          </FormControl>
          <FormDescription>{fieldConfig.description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);

export default DatePicker;
