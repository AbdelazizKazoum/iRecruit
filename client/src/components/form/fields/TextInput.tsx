// src/components/form/fields/TextInput.tsx

import React from "react";

interface TextInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
}) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <input
      type="text"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`form-control ${error ? "is-invalid" : ""}`}
    />
    {error && <div className="invalid-feedback">{error}</div>}
  </div>
);

export default TextInput;
