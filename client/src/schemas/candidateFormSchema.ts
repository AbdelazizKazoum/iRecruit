/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

// TypeScript interface to define the structure
export interface CandidateForm {
  prenom: string;
  prenomAr: string;
  nom: string;
  nomAr: string;
  adresse: string;
  adresseAr: string;
  lieuNaissance: string;
  cin: string;
  dateNaissance: Date | string;
  sexe: "feminin" | "masculin";
  situation: "celibataire" | "divorce" | "marie" | "veuf";
  telephone: string;
  email: string;

  experiences: {
    fonctionnaire?: boolean;
    fonction?: string;
    ppr?: string;
    attestation?: string;
  };

  situationDeHandicap: {
    handicap?: boolean;
    typeHandicap?: string;
  };

  AncienCombattant?: boolean;
  PupillesNation?: boolean;
}

// Zod schema with conditional validation logic
export const candidateFormSchema: z.ZodSchema<CandidateForm> = z
  .object({
    prenom: z.string().min(1, "Le prénom est requis"),
    prenomAr: z.string().min(1, "الإسم الشخصي مطلوب"),
    nom: z.string().min(1, "Le nom est requis"),
    nomAr: z.string().min(1, "الإسم العائلي مطلوب"),
    adresse: z.string().min(1, "L'adresse personnelle est requise"),
    adresseAr: z.string().min(1, "العنوان الشخصي مطلوب"),
    lieuNaissance: z.string().min(1, "Le lieu de naissance est requis"),
    cin: z.string().min(1, "Le CIN est requis"),
    dateNaissance: z
      .union([z.string(), z.date()])
      .transform((date) => (typeof date === "string" ? new Date(date) : date))
      .refine((date) => !isNaN(date.getTime()), {
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

    // Group experiences
    experiences: z.object({
      fonctionnaire: z.boolean().optional(),
      fonction: z.string().optional(),
      ppr: z.string().optional(),
      attestation: z.string().optional(),
    }),

    // Group experiences
    situationDeHandicap: z.object({
      handicap: z.boolean().optional(),
      typeHandicap: z.string().optional(),
    }),

    AncienCombattant: z.boolean().optional(),
    PupillesNation: z.boolean().optional(),

    cinPdf: z
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
    bacPdf: z
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
    cvPdf: z
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
  .superRefine((data, ctx) => {
    // Conditional validation for fields depending on 'fonctionnaire'
    if (data.experiences.fonctionnaire) {
      if (!data.experiences.fonction) {
        ctx.addIssue({
          path: ["experiences", "fonction"],
          message:
            "L'organisme/établissement est requis si vous êtes fonctionnaire",
        });
      }
      if (!data.experiences.ppr) {
        ctx.addIssue({
          path: ["experiences", "ppr"],
          message: "Le P.P.R / Matricule est requis si vous êtes fonctionnaire",
        });
      }
      if (!data.experiences.attestation) {
        ctx.addIssue({
          path: ["experiences", "attestation"],
          message:
            "L'attestation de travail est requise si vous êtes fonctionnaire",
        });
      }
    }

    // Conditional validation for fields depending on 'handicap'
    if (data.situationDeHandicap.handicap) {
      if (!data.situationDeHandicap.typeHandicap) {
        ctx.addIssue({
          path: ["situationDeHandicap", "typeHandicap"],
          message: "Le type de handicap est requis si vous avez un handicap",
        });
      }
    }
  });
