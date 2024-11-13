// src/schemas/validationSchemas.ts

import * as z from "zod";

export const candidateFormSchema = z.object({
  //   fullName: z.string().min(2, "Full name must be at least 2 characters long"),
  //   email: z.string().email("Invalid email address"),
  //   phone: z.string().min(10, "Phone number must be at least 10 characters"),
  //   gender: z.enum(["male", "female", "other"], "Gender is required"),
  //   experience: z.boolean(),
  //   availableStartDate: z.string().optional(),
});
