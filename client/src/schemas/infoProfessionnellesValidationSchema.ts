import { z } from "zod";

export const infoProfessionnellesValidationSchema = z
  .object({
    // Parcours et Diplômes Section
    parcoursEtDiplomes: z.object({
      origine: z.string(),
      intituleDiplome: z
        .string()
        .min(1, "Veuillez fournir l'intitulé du diplôme.")
        .max(255, "L'intitulé du diplôme ne doit pas dépasser 255 caractères."),
      diplomeType: z
        .string()
        .min(1, "Veuillez sélectionner le type de diplôme."),
      anneeObtention: z
        .string()
        .regex(/^\d{4}$/, "Veuillez fournir une année valide (ex : 2020).")
        .refine(
          (year) => parseInt(year) <= new Date().getFullYear(),
          "L'année d'obtention ne peut pas être dans le futur."
        ),
      specialite: z
        .string()
        .min(1, "Veuillez indiquer la spécialité.")
        .max(255, "La spécialité ne doit pas dépasser 255 caractères."),
      mention: z.string(),
      etablissement: z
        .string()
        .min(1, "Veuillez indiquer l'établissement.")
        .max(
          255,
          "Le nom de l'établissement ne doit pas dépasser 255 caractères."
        ),
      diplomePdf: z
        .instanceof(File)
        .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
          message: "Le fichier du diplôme doit être inférieur à 5 Mo.",
        })
        .refine((file) => !file || ["application/pdf"].includes(file.type), {
          message: "Seuls les fichiers PDF sont autorisés pour le diplôme.",
        }),
    }),

    // Niveaux en Langues Section
    niveauxLangues: z.object({
      langue: z.string().min(1, "Veuillez indiquer la langue."),
      niveau: z.string().optional(),
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

    // Expérience Pédagogique Section
    experiencePedagogique: z.object({
      experiencePedagogiqueEnHeures: z
        .string()
        .min(1, "L'expérience pédagogique en heures est obligatoire."),
    }),

    // Publications Section
    publications: z
      .object({
        titre: z.string().optional(),
        anneePublication: z.string().optional(),
        type: z.string().optional(),
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
        publicationPdf: z
          .instanceof(File)
          .optional()
          .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
            message:
              "Le fichier PDF de la publication doit être inférieur à 5 Mo.",
          }),
      })
      .optional(),

    // Communications Section
    communications: z
      .object({
        titre: z.string().optional(),
        anneeCommunication: z.string().optional(),
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
        communicationPdf: z
          .instanceof(File)
          .optional()
          .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
            message:
              "Le fichier PDF de la communication doit être inférieur à 5 Mo.",
          }),
      })
      .optional(),

    // Autres Documents Section
    autresDocuments: z
      .object({
        intitule: z.string().optional(),
        documentPdf: z
          .instanceof(File)
          .optional()
          .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
            message:
              "Le fichier PDF pour les autres documents doit être inférieur à 5 Mo.",
          }),
      })
      .optional(),
  })
  .superRefine((data, ctx) => {
    // Validation conditionnelle pour les langues
    if (data.niveauxLangues?.langue) {
      if (!data.niveauxLangues.niveau) {
        ctx.addIssue({
          code: "custom",
          path: ["niveauxLangues", "niveau"],
          message:
            "Veuillez indiquer le niveau si une langue est sélectionnée.",
        });
      }
      if (!data.niveauxLangues.certificatLanguePdf) {
        ctx.addIssue({
          code: "custom",
          path: ["niveauxLangues", "certificatLanguePdf"],
          message:
            "Veuillez fournir un certificat si une langue est sélectionnée.",
        });
      }
    }

    // Validation conditionnelle pour les publications
    if (data.publications?.titre) {
      if (!data.publications.anneePublication) {
        ctx.addIssue({
          code: "custom",
          path: ["publications", "anneePublication"],
          message: "Veuillez indiquer l'année de publication.",
        });
      }
      if (!data.publications.type) {
        ctx.addIssue({
          code: "custom",
          path: ["publications", "type"],
          message: "Veuillez sélectionner le type de publication.",
        });
      }
      if (!data.publications.url) {
        ctx.addIssue({
          code: "custom",
          path: ["publications", "url"],
          message: "Veuillez fournir l'URL de la publication.",
        });
      }
      if (!data.publications.publicationPdf) {
        ctx.addIssue({
          code: "custom",
          path: ["publications", "publicationPdf"],
          message: "Veuillez télécharger le fichier PDF de la publication.",
        });
      }
    }

    // Validation conditionnelle pour les communications
    if (data.communications?.titre) {
      if (!data.communications.anneeCommunication) {
        ctx.addIssue({
          code: "custom",
          path: ["communications", "anneeCommunication"],
          message: "Veuillez indiquer l'année de communication.",
        });
      }
      if (!data.communications.url) {
        ctx.addIssue({
          code: "custom",
          path: ["communications", "url"],
          message: "Veuillez fournir l'URL de la communication.",
        });
      }
      if (!data.communications.communicationPdf) {
        ctx.addIssue({
          code: "custom",
          path: ["communications", "communicationPdf"],
          message: "Veuillez télécharger le fichier PDF de la communication.",
        });
      }
    }

    // Validation conditionnelle pour les autres documents
    if (data.autresDocuments?.intitule && !data.autresDocuments.documentPdf) {
      ctx.addIssue({
        code: "custom",
        path: ["autresDocuments", "documentPdf"],
        message: "Veuillez télécharger le fichier PDF correspondant.",
      });
    }
  });
