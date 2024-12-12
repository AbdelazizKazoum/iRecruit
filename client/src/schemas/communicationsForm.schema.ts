import { z } from "zod";

export const communicationsSchema = z.object({
  // Communications Section
  titre: z.string(),
  anneeCommunication: z.string(),
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
  }),
});
//   .superRefine((data, ctx) => {
//   });
