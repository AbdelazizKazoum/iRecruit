// src/components/form/fields/SelectField.tsx

import React from "react";

interface Option {
  label: string;
  value: string | number;
}

interface SelectFieldProps {
  label: string;
  name: string;
  options: Option[];
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  options,
  value,
  onChange,
  error,
}) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className={`form-control ${error ? "is-invalid" : ""}`}
    >
      <option value="">Select...</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && <div className="invalid-feedback">{error}</div>}
  </div>
);

export default SelectField;
