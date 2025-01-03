import { z } from "zod";

export const applicationFormSchema = z.object({
  // Communications Section
  applicationDiploma: z.string(),

  attachment: z.object({
    declarationPdf: z
      .instanceof(File)
      .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
        message: "Le fichier PDF doit être inférieur à 5 Mo.",
      }),
    motivationLetterPdf: z
      .instanceof(File)
      .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
        message: "Le fichier PDF doit être inférieur à 5 Mo.",
      }),
  }),
});
//   .superRefine((data, ctx) => {
//   });
