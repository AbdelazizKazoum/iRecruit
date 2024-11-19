// src/formConfigs/jobSeekerFormConfig.ts

export const infoProfessionnellesFormConfig = {
  category: "info-professionnelles",
  fields: [
    {
      type: "group",
      title: "Parcours et diplômes",
      description:
        "Merci d'ajouter tous vos diplômes après le bac. C'est obligatoire",

      group: [
        {
          type: "select",
          name: "origine",
          label: "Origine *",
          options: [
            { value: "etranger", label: "Etranger" },
            { value: "marocainPrive", label: "Marocain privé" },
            { value: "marocainPublic", label: "Marocain public" },
          ],
        },

        {
          type: "text",
          name: "fonction",
          label: "Organisme/établissement *",
          placeholder: "",
          dependsOn: "fonctionnaire",
        },
        {
          type: "text",
          name: "ppr",
          label: "P.P.R / Matricule *",
          placeholder: "",
          dependsOn: "fonctionnaire",
        },
        {
          type: "text",
          name: "attestation",
          label: "Attestation de travail (Pdf, Max 10Mo)*",
          placeholder: "",
          dependsOn: "fonctionnaire",
        },
      ],
    },
    {
      type: "text",
      name: "portfolioLink",
      label: "Portfolio Link",
      placeholder: "Enter a link to your portfolio",
    },
    {
      type: "checkbox",
      name: "lookingForRemote",
      label: "Are you looking for remote opportunities?",
    },
    {
      type: "select",
      name: "preferredLocation",
      label: "Preferred Work Location",
      options: [
        { value: "onsite", label: "On-site" },
        { value: "remote", label: "Remote" },
      ],
    },
  ],
};
