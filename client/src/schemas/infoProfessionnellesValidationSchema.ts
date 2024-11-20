import { z } from "zod";

export const infoProfessionnellesValidationSchema = z.object({
  parcoursEtDiplomes: z.object({
    origine: z.string(),
    intituleDiplome: z
      .string()
      .min(1, "L'intitulé du diplôme est obligatoire")
      .max(255, "L'intitulé du diplôme ne doit pas dépasser 255 caractères"),
    diplomeType: z.string().min(1, "Le type de diplôme est obligatoire"),
    anneeObtention: z
      .string()
      .regex(/^\d{4}$/, "Veuillez fournir une année valide (ex: 2020)")
      .refine(
        (year) => parseInt(year) <= new Date().getFullYear(),
        "L'année d'obtention ne peut pas être dans le futur"
      ),
    specialite: z
      .string()
      .min(1, "La spécialité est obligatoire")
      .max(255, "La spécialité ne doit pas dépasser 255 caractères"),
    mention: z.string().optional(), // Optional as it depends on "fonctionnaire"
    etablissement: z
      .string()
      .min(1, "L'établissement est obligatoire")
      .max(255, "L'établissement ne doit pas dépasser 255 caractères"),
    diplomePdf: z.any(),
  }),
  niveauxLangues: z
    .object({
      langue: z.string().min(1, "La langue est obligatoire"),
      niveau: z.string(),
      certificatLangue: z
        .instanceof(File)
        .optional()
        .refine(
          (file) =>
            !file ||
            (file.type === "application/pdf" && file.size <= 10 * 1024 * 1024),
          "Le certificat doit être un fichier PDF de 10 Mo maximum"
        ),
    })
    .optional(), // Optional based on the form description
});
