/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

export const infoProfessionnellesValidationSchema = z
  .object({
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
      mention: z.string(), // Optional as it depends on "fonctionnaire"
      etablissement: z
        .string()
        .min(1, "L'établissement est obligatoire")
        .max(255, "L'établissement ne doit pas dépasser 255 caractères"),
      diplomePdf: z
        .instanceof(File) // Ensure it's a File object
        .refine((file) => file.size <= 5 * 1024 * 1024, {
          message: "File must be less than 5MB",
        })
        .refine(
          (file) =>
            [/*"image/jpeg", "image/png", */ "application/pdf"].includes(
              file.type
            ),
          { message: "Only PDF files are allowed" }
        ),
    }),

    niveauxLangues: z
      .object({
        langue: z.string().min(1, "La langue est obligatoire").optional(),
        niveau: z.string().optional(),
        certificatLanguePdf: z
          .instanceof(File) // Ensure it's a File object
          .refine((file) => file.size <= 5 * 1024 * 1024, {
            message: "File must be less than 5MB",
          })
          .refine(
            (file) =>
              [/*"image/jpeg", "image/png", */ "application/pdf"].includes(
                file.type
              ),
            { message: "Only PDF files are allowed" }
          ),
      })
      .optional(), // Optional based on the form description
  })
  .superRefine((data, ctx) => {
    if (data.niveauxLangues.langue) {
      if (!data.niveauxLangues.niveau) {
        ctx.addIssue({
          path: ["niveauxLangues.niveau"],
          message:
            "L'organisme/établissement est requis si vous êtes fonctionnaire",
        });
      }
      if (!data.niveauxLangues.certificatLanguePdf) {
        ctx.addIssue({
          path: ["niveauxLangues.certificatLanguePdf"],
          message:
            "L'organisme/établissement est requis si vous êtes fonctionnaire",
        });
      }
    }
  });
