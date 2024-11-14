import { z } from "zod";

export const candidateFormSchema = z.object({
  prenom: z.string().min(1, "Le prénom est requis"),
  prenomAr: z.string().min(1, "الإسم الشخصي مطلوب"),
  nom: z.string().min(1, "Le nom est requis"),
  nomAr: z.string().min(1, "الإسم العائلي مطلوب"),
  adresse: z.string().min(1, "L'adresse personnelle est requise"),
  adresseAr: z.string().min(1, "العنوان الشخصي مطلوب"),
  lieuNaissance: z.string().min(1, "Le lieu de naissance est requis"),
  cin: z.string().min(1, "Le CIN est requis"),
  dateNaissance: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Date de naissance invalide",
  }),
  sexe: z.enum(["feminin", "masculin"], {
    errorMap: () => ({ message: "Veuillez sélectionner votre sexe" }),
  }),
  situation: z.enum(["celibataire", "divorce", "marie", "veuf"], {
    errorMap: () => ({ message: "Veuillez sélectionner votre situation" }),
  }),
  telephone: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, "Numéro de téléphone invalide"),
  email: z.string().email("Adresse email invalide"),
  experience: z.boolean().optional(),
});
