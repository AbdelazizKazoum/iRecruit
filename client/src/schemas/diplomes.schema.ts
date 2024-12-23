import { z } from "zod";

export const diplomesSchema = z.object({
  origine: z.string(),
  intituleDiplome: z
    .string()
    .min(1, "Veuillez fournir l'intitulé du diplôme.")
    .max(255, "L'intitulé du diplôme ne doit pas dépasser 255 caractères."),
  diplomeType: z.string().min(1, "Veuillez sélectionner le type de diplôme."),
  anneeObtention: z
    .string()
    .regex(/^\d{4}$/, "Veuillez fournir une année valide (ex : 2020).")
    .refine(
      (year) => parseInt(year) <= new Date().getFullYear(),
      "L'année d'obtention ne peut pas être dans le futur."
    ),
  specialite: z
    .string()
    .min(1, "Veuillez indiquer la spécialité.")
    .max(255, "La spécialité ne doit pas dépasser 255 caractères."),
  mention: z.string(),
  etablissement: z
    .string()
    .min(1, "Veuillez indiquer l'établissement.")
    .max(255, "Le nom de l'établissement ne doit pas dépasser 255 caractères."),

  // Expérience Pédagogique Section
  files: z.object({
    diplomePdf: z
      .instanceof(File)
      .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
        message: "Le fichier du diplôme doit être inférieur à 5 Mo.",
      })
      .refine((file) => !file || ["application/pdf"].includes(file.type), {
        message: "Seuls les fichiers PDF sont autorisés pour le diplôme.",
      }),
  }),
});
//   .superRefine((data, ctx) => {
//   });
