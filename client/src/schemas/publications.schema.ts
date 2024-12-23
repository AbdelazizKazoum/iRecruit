import { z } from "zod";

export const publicationsSchema = z.object({
  // Publications Section
  titre: z.string(),
  anneePublication: z.string(),
  type: z.string(),
  url: z
    .string()
    .optional()
    .refine(
      (value) =>
        !value ||
        value.trim() === "" ||
        value.match(/^https?:\/\/[^\s$.?#].[^\s]*$/),
      {
        message: "L'URL doit être valide.",
      }
    ),

  files: z.object({
    publicationPdf: z
      .instanceof(File)
      .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
        message: "Le fichier PDF de la publication doit être inférieur à 5 Mo.",
      }),
  }),
});
//   .superRefine((data, ctx) => {
//   });
