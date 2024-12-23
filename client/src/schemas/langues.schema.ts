import { z } from "zod";

export const languesSchema = z.object({
  // Niveaux en Langues Section
  langue: z.string().min(1, "Veuillez indiquer la langue."),
  niveau: z.string().min(1, "Veuillez indiquer la langue."),

  files: z.object({
    certificatLanguePdf: z
      .instanceof(File)
      .optional()
      .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
        message: "Le fichier du certificat doit être inférieur à 5 Mo.",
      })
      .refine((file) => !file || ["application/pdf"].includes(file.type), {
        message:
          "Seuls les fichiers PDF sont autorisés pour le certificat de langue.",
      }),
  }),
});
//   .superRefine((data, ctx) => {
//   });
