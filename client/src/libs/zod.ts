import { z } from "zod";

// Define the Zod schema for validation
export const loginSchema = z.object({
  email: z.string().email("L'adresse email n'est pas valide"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .regex(/[a-z]/, "Le mot de passe doit contenir une lettre minuscule")
    .regex(/[A-Z]/, "Le mot de passe doit contenir une lettre majuscule")
    .regex(/\d/, "Le mot de passe doit contenir un chiffre")
    .regex(/[@$!%*?&]/, "Le mot de passe doit contenir un caractère spécial"),
});
