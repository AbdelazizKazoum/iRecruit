import { z } from "zod";

export const candidateFormSchema = z
  .object({
    prenom: z.string().min(1, "Le prénom est requis"),
    prenomAr: z.string().min(1, "الإسم الشخصي مطلوب"),
    nom: z.string().min(1, "Le nom est requis"),
    nomAr: z.string().min(1, "الإسم العائلي مطلوب"),
    adresse: z.string().min(1, "L'adresse personnelle est requise"),
    adresseAr: z.string().min(1, "العنوان الشخصي مطلوب"),
    lieuNaissance: z.string().min(1, "Le lieu de naissance est requis"),
    cin: z.string().min(1, "Le CIN est requis"),
    dateNaissance: z.date().refine((date) => !isNaN(date.getTime()), {
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

    // Fonctionnaire Fields
    fonctionnaire: z.boolean().optional(),
    fonction: z.string().optional(),
    ppr: z.string().optional(),
    attestation: z.string().optional(),

    // Handicap Fields
    handicap: z.boolean().optional(),
    typeHandicap: z.string().optional(),

    // Other Fields
    ancienCombattant: z.boolean().optional(),
    pupillesNation: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    // Validation for "fonctionnaire"
    if (data.fonctionnaire) {
      if (!data.fonction) {
        ctx.addIssue({
          code: "custom",
          path: ["fonction"],
          message:
            "Organisme/établissement est requis si vous êtes fonctionnaire",
        });
      }
      if (!data.ppr) {
        ctx.addIssue({
          code: "custom",
          path: ["ppr"],
          message: "P.P.R / Matricule est requis si vous êtes fonctionnaire",
        });
      }
      if (!data.attestation) {
        ctx.addIssue({
          code: "custom",
          path: ["attestation"],
          message:
            "Attestation de travail est requise si vous êtes fonctionnaire",
        });
      }
    }

    // Validation for "handicap"
    if (data.handicap && !data.typeHandicap) {
      ctx.addIssue({
        code: "custom",
        path: ["typeHandicap"],
        message:
          "Type de handicap est requis si vous êtes en situation de handicap",
      });
    }
  });
