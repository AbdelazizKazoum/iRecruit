import { z } from "zod";

// Define the Zod schema for contact form validation
export const contactSchema = z.object({
  nom: z
    .string()
    .min(2, {
      message: "Veuillez entrer un nom valide.",
    })
    .max(50, {
      message: "Veuillez entrer un nom valide.",
    }),
  email: z
    .string({
      required_error: "Veuillez fournir une adresse e-mail.",
    })
    .email({
      message: "Veuillez entrer une adresse e-mail valide.",
    }),
  mssg: z
    .string()
    .min(10, {
      message: "Le message doit comporter au moins 10 caractères.",
    })
    .max(500, {
      message: "Le message ne doit pas dépasser 500 caractères.",
    }),
});
