import { z } from "zod";

// Zod schema for candidate form fields
export const candidateFormSchema = z.object({
  fullName: z.string().min(1, { message: "Full Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z
    .string()
    .min(10, { message: "Phone number should have at least 10 digits" })
    .max(15, { message: "Phone number should not exceed 15 digits" }),
  gender: z.enum(["male", "female", "other"]),
  experience: z.boolean(),
  // availableStartDate: z.string().refine(
  //   (date) => {
  //     const parsedDate = new Date(date);
  //     return !isNaN(parsedDate.getTime());
  //   },
  //   { message: "Invalid date" }
  // ),
});

// TypeScript type inference from the schema
export type CandidateFormValues = z.infer<typeof candidateFormSchema>;
