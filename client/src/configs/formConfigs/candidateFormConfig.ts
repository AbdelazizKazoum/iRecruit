// src/formConfigs/candidateFormConfig.ts

export const candidateFormConfig = {
  category: "candidate",
  fields: [
    {
      type: "text",
      name: "prenom",
      label: "Prénom*",
      placeholder: "Entrez votre prénom",
    },
    {
      type: "text",
      name: "prenomAr",
      label: "الإسم الشخصي*",
      placeholder: "أدخل الإسم الشخصي",
    },
    {
      type: "text",
      name: "nom",
      label: "Nom*",
      placeholder: "Entrez votre nom",
    },
    {
      type: "text",
      name: "nomAr",
      label: "الإسم العائلي*",
      placeholder: "أدخل الإسم العائلي",
    },
    {
      type: "text",
      name: "adresse",
      label: "Adresse personnelle*",
      placeholder: "Entrez votre adresse personnelle",
    },
    {
      type: "text",
      name: "adresseAr",
      label: "العنوان الشخصي*",
      placeholder: "أدخل العنوان الشخصي",
    },
    {
      type: "text",
      name: "lieuNaissance",
      label: "Lieu de naissance*",
      placeholder: "Entrez votre lieu de naissance",
    },
    {
      type: "text",
      name: "cin",
      label: "CIN*",
      placeholder: "Entrez votre CIN",
    },
    {
      type: "date",
      name: "dateNaissance",
      label: "Date de naissance*",
      placeholder: "Sélectionnez votre date de naissance",
    },
    {
      type: "select",
      name: "sexe",
      label: "Sexe*",
      options: [
        { value: "feminin", label: "Féminin" },
        { value: "masculin", label: "Masculin" },
      ],
    },
    {
      type: "select",
      name: "situation",
      label: "Situation*",
      options: [
        { value: "celibataire", label: "Célibataire" },
        { value: "divorce", label: "Divorcé(e)" },
        { value: "marie", label: "Marié(e)" },
        { value: "veuf", label: "Veuf(ve)" },
      ],
    },
    {
      type: "text",
      name: "telephone",
      label: "Numéro de téléphone*",
      placeholder: "Entrez votre numéro de téléphone",
    },

    {
      type: "text",
      name: "email",
      label: "Email*",
      placeholder: "Entrez votre adresse email",
    },

    {
      type: "group",
      title: "Do you have work experience?",
      description: "",

      group: [
        {
          type: "checkbox",
          name: "fonctionnaire",
          label: "Fonctionnaire ?",
        },

        {
          type: "text",
          name: "fonction",
          label: "Organisme/établissement*",
          placeholder: "",
          dependsOn: "fonctionnaire",
        },
        {
          type: "text",
          name: "ppr",
          label: "P.P.R / Matricule*",
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
      type: "group",
      title: "Do you have work experience?",
      description: "",

      group: [
        {
          type: "checkbox",
          name: "handicap",
          label: "Situation de handicap ?",
        },

        {
          type: "text",
          name: "typeHandicap",
          label: "TypeHandicap*",
          placeholder: "",
          dependsOn: "handicap",
        },
      ],
    },

    {
      type: "checkbox",
      name: "AncienCombattant",
      label: "Ancien combattant ?",
    },
    {
      type: "checkbox",
      name: "PupillesNation",
      label: "Pupilles de la nation ?",
    },
  ],
};
