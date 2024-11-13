// src/formConfigs/candidateFormConfig.ts

export const candidateFormConfig = {
  category: "candidate",
  fields: [
    {
      type: "text",
      name: "fullName",
      label: "Full Name",
      placeholder: "Enter your full name",
    },
    {
      type: "text",
      name: "email",
      label: "Email Address",
      placeholder: "Enter your email",
    },
    {
      type: "text",
      name: "phone",
      label: "Phone Number",
      placeholder: "Enter your phone number",
    },
    {
      type: "select",
      name: "gender",
      label: "Gender",
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "other", label: "Other" },
      ],
    },
    {
      type: "checkbox",
      name: "experience",
      label: "Do you have work experience?",
    },
    {
      type: "date",
      name: "availableStartDate",
      label: "Available Start Date",
      placeholder: "Select a date",
    },
  ],
};
