import { z } from "zod";

export const communicationsSchema = z.object({
  // Communications Section
  titre: z.string(),
  anneeCommunication: z
    .union([z.string(), z.date()])
    .transform((date) => (typeof date === "string" ? new Date(date) : date))
    .refine((date) => !isNaN(date.getTime()), {
      message: "Date invalide",
    }),
  url: z
    .string()
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
    communicationPdf: z
      .instanceof(File)
      .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
        message:
          "Le fichier PDF de la communication doit être inférieur à 5 Mo.",
      }),
    testPdf: z
      .instanceof(File)
      .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
        message:
          "Le fichier PDF de la communication doit être inférieur à 5 Mo.",
      }),
  }),
});
//   .superRefine((data, ctx) => {
//   });
