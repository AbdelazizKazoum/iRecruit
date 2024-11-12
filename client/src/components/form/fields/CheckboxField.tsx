// src/components/form/fields/CheckboxField.tsx

import React from "react";

interface CheckboxFieldProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  label,
  name,
  checked,
  onChange,
  error,
}) => (
  <div className="form-group form-check">
    <input
      type="checkbox"
      id={name}
      name={name}
      checked={checked}
      onChange={onChange}
      className={`form-check-input ${error ? "is-invalid" : ""}`}
    />
    <label className="form-check-label" htmlFor={name}>
      {label}
    </label>
    {error && <div className="invalid-feedback">{error}</div>}
  </div>
);

export default CheckboxField;
