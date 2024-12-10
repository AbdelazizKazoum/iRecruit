// src/formConfigs/jobSeekerFormConfig.ts

export const infoProfessionnellesFormConfig = {
  category: "info-professionnelles",
  fields: [
    {
      type: "group",
      title: "Parcours et diplômes",
      name: "parcoursEtDiplomes",
      description:
        "Merci d'ajouter tous vos diplômes après le bac. C'est obligatoire",

      group: [
        {
          type: "select",
          name: "parcoursEtDiplomes.origine",
          label: "Origine *",
          placeholder: "",
          options: [
            { value: "etranger", label: "Etranger" },
            { value: "marocainPrive", label: "Marocain privé" },
            { value: "marocainPublic", label: "Marocain public" },
          ],
        },

        {
          type: "text",
          name: "parcoursEtDiplomes.intituleDiplome",
          placeholder: "",
          label: "Intitulé de votre diplôme avec précision *",
        },

        {
          type: "select",
          name: "parcoursEtDiplomes.diplomeType",
          label: "Diplôme ou diplôme équivalent * ",
          placeholder: "",
          options: [],
        },

        {
          type: "text",
          name: "parcoursEtDiplomes.anneeObtention",
          label: "Année d'obtention du diplôme *",
          placeholder: "",
          dependsOn: null,
        },
        {
          type: "text",
          name: "parcoursEtDiplomes.specialite",
          label: "Spécialité *",
          placeholder: "",
          dependsOn: null,
        },
        {
          type: "text",
          name: "parcoursEtDiplomes.mention",
          label: "Mention *",
          placeholder: "",
          dependsOn: null,
        },
        {
          type: "text",
          name: "parcoursEtDiplomes.etablissement",
          label: "Etablissement *",
          placeholder: "Enter a link to your portfolio",
        },
        {
          type: "file",
          name: "parcoursEtDiplomes.diplomePdf",
          label: "Diplôme scané (Pdf, Max 10Mo) *",
        },
      ],
    },
    {
      type: "group",
      title: "Niveaux Langues",
      name: "niveauxLangues",
      description:
        "Langues : rubrique requise pour les postes d'enseignants, facultative pour les cadres administratifs et techniques",
      group: [
        {
          type: "select",
          name: "niveauxLangues.langue",
          label: "Langue *",
          placeholder: "",
          options: [],
        },
        {
          type: "select",
          name: "niveauxLangues.niveau",
          label: "Nuveau *",
          placeholder: "",
          dependsOn: "niveauxLangues.langue",

          options: [
            {
              label: " Avancé",
              value: "avance",
            },
            {
              label: " Basique",
              value: "basique",
            },
            {
              label: "Intermediare",
              value: "intermediare",
            },
          ],
        },
        {
          type: "file",
          label: "Cértificat (Pdf, Max 10Mo, Optionnel)",
          name: "niveauxLangues.certificatLanguePdf",
          placeholder: "",
          dependsOn: "niveauxLangues.langue",
        },
      ],
    },
    {
      type: "group",
      title: "Expérience pédagogique",
      name: "experiencePedagogique",
      description: "",
      group: [
        {
          type: "number",
          label: "Expérience pédagogique en heures *",
          name: "experiencePedagogique.experiencePedagogiqueEnHeures",
          placeholder: "",
        },
      ],
    },
    {
      type: "group",
      title: "Publications",
      name: "publications",
      description: "",
      group: [
        {
          type: "text",
          label: "Titre",
          name: "publications.titre",
          placeholder: "titre",
        },
        {
          type: "number",
          label: "Année de publication de l'article *",
          name: "publications.anneePublication",
          placeholder: "Année de publication de l'article",
          dependsOn: "publications.titre",
        },
        {
          type: "select",
          label: "Type *",
          name: "publications.type",
          placeholder: "",
          dependsOn: "publications.titre",

          options: [],
        },
        {
          type: "text",
          label: "URL",
          name: "publications.url",
          placeholder: "URL",
          dependsOn: "publications.titre",
        },
        {
          type: "file",
          label: "Publication (Pdf, Max 10Mo) *",
          name: "publications.publicationPdf",
          placeholder: "",
          dependsOn: "publications.titre",
        },
      ],
    },
    {
      type: "group",
      title: "Communications",
      name: "communications",
      description: "",
      group: [
        {
          type: "text",
          label: "Titre",
          name: "communications.titre",
          placeholder: "titre",
        },
        {
          type: "number",
          label: "Année de publication de la communication *",
          name: "communications.anneeCommunication",
          placeholder: "Année de la communication",
          dependsOn: "communications.titre",
        },
        {
          type: "text",
          label: "URL",
          name: "communications.url",
          placeholder: "URL",
          dependsOn: "communications.titre",
        },
        {
          type: "file",
          label: "Communication (Pdf, Max 10Mo) *",
          name: "communications.communicationPdf",
          placeholder: "",
          dependsOn: "communications.titre",
        },
      ],
    },
    {
      type: "group",
      title: "Résidanat",
      name: "residanat",
      description: "",
      group: [
        {
          type: "file",
          label: "Résidanat",
          name: "residanat.residanatPdf",
          placeholder: "",
        },
      ],
    },
    {
      type: "group",
      title: "Autres documents",
      name: "autresDocuments",
      description: "",
      group: [
        {
          type: "text",
          label: "Intitulé",
          name: "autresDocuments.intitule",
          placeholder: "",
        },
        {
          type: "file",
          label: "Document (Pdf, Max 10Mo) *",
          name: "autresDocuments.documentPdf",
          placeholder: "",
          dependsOn: "autresDocuments.intitule",
        },
      ],
    },
  ],
};
