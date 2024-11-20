import { z } from "zod";

export const infoProfessionnellesValidationSchema = z.object({
  // Parcours et diplômes fields
  origine: z.enum(["etranger", "marocainPrive", "marocainPublic"], {
    required_error: "Origine est obligatoire",
  }),
  intituleDiplome: z
    .string()
    .min(1, "L'intitulé du diplôme est obligatoire")
    .max(255, "L'intitulé du diplôme ne doit pas dépasser 255 caractères"),
  diplomeType: z.enum(["D0002", "D0003"], {
    required_error: "Le type de diplôme est obligatoire",
  }),
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
  diplomePdf: z
    .instanceof(File, { message: "Veuillez fournir un fichier valide" })
    .refine(
      (file) => file.type === "application/pdf",
      "Le fichier doit être au format PDF"
    )
    .refine(
      (file) => file.size <= 10 * 1024 * 1024,
      "La taille du fichier ne doit pas dépasser 10 Mo"
    ),

  // Niveaux Langues fields
  langue: z.enum(["arabe", "amazigh", "anglais", "francais"], {
    required_error: "La langue est obligatoire",
  }),
  niveau: z.enum(["avance", "basique", "intermediaire"], {
    required_error: "Le niveau est obligatoire",
  }),
  certificatLangue: z
    .instanceof(File)
    .optional()
    .refine(
      (file) =>
        !file ||
        (file.type === "application/pdf" && file.size <= 10 * 1024 * 1024),
      "Le certificat doit être un fichier PDF de 10 Mo maximum"
    ),
});
