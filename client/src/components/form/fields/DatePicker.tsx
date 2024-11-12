// src/components/form/fields/DatePicker.tsx

import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {
  label: string;
  name: string;
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  error?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  name,
  selectedDate,
  onChange,
  error,
}) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <ReactDatePicker
      selected={selectedDate}
      onChange={onChange}
      className={`form-control ${error ? "is-invalid" : ""}`}
      dateFormat="yyyy-MM-dd"
    />
    {error && <div className="invalid-feedback">{error}</div>}
  </div>
);

export default DatePicker;
