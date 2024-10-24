import { z } from "zod";

// Define the Zod schema for login validation
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

// Define the Zod schema for register validation
export const registerSchema = z.object({
  email: z.string().email("L'adresse email n'est pas valide"),
  username: z
    .string()
    .min(8, "Le nom d'utilisateur doit contenir au moins 8 caractères")
    .max(18, "Le nom d'utilisateur ne doit pas dépasser 18 caractères")
    .regex(/^\S*$/, "Le nom d'utilisateur ne doit pas contenir d'espaces"), // No spaces allowed
});
