// src/formConfigs/candidateFormConfig.ts

export const candidateFormConfig = {
  category: "candidate",
  fields: [
    {
      type: "text",
      name: "prenom",
      label: "Prénom *",
      placeholder: "Entrez votre prénom",
    },
    {
      type: "text",
      name: "prenomAr",
      label: "الإسم الشخصي *",
      placeholder: "أدخل الإسم الشخصي",
    },
    {
      type: "text",
      name: "nom",
      label: "Nom *",
      placeholder: "Entrez votre nom",
    },
    {
      type: "text",
      name: "nomAr",
      label: "الإسم العائلي *",
      placeholder: "أدخل الإسم العائلي",
    },
    {
      type: "text",
      name: "adresse",
      label: "Adresse personnelle *",
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
      label: "Lieu de naissance *",
      placeholder: "Entrez votre lieu de naissance",
    },
    {
      type: "text",
      name: "cin",
      label: "CIN *",
      placeholder: "Entrez votre CIN",
    },
    {
      type: "date",
      name: "dateNaissance",
      label: "Date de naissance *",
      placeholder: "Sélectionnez votre date de naissance",
    },
    {
      type: "select",
      name: "sexe",
      label: "Sexe *",
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
      label: "Numéro de téléphone *",
      placeholder: "Entrez votre numéro de téléphone",
    },

    {
      type: "text",
      name: "email",
      label: "Email *",
      placeholder: "Entrez votre adresse email",
    },

    {
      type: "group",
      name: "experiences",
      title: "Do you have work experience?",
      description: "",

      group: [
        {
          type: "checkbox",
          name: "experiences.fonctionnaire",
          label: "Fonctionnaire ?",
        },

        {
          type: "text",
          name: "experiences.fonction",
          label: "Organisme/établissement *",
          placeholder: "",
          dependsOn: "experiences.fonctionnaire",
        },
        {
          type: "text",
          name: "experiences.ppr",
          label: "P.P.R / Matricule *",
          placeholder: "",
          dependsOn: "experiences.fonctionnaire",
        },
        {
          type: "text",
          name: "experiences.attestation",
          label: "Attestation de travail (Pdf, Max 10Mo)*",
          placeholder: "",
          dependsOn: "experiences.fonctionnaire",
        },
      ],
    },

    {
      type: "group",
      name: "situationDeHandicap",
      title: "Avez-vous une expérience professionnelle ?",
      description: "",

      group: [
        {
          type: "checkbox",
          name: "situationDeHandicap.handicap",
          label: "Situation de handicap ?",
        },

        {
          type: "text",
          name: "situationDeHandicap.typeHandicap",
          label: "TypeHandicap *",
          placeholder: "",
          dependsOn: "situationDeHandicap.handicap",
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
    {
      type: "file",
      name: "cinPdf",
      label: "CIN (Pdf, Max 10Mo) *",
    },
    {
      type: "file",
      name: "bacPdf",
      label: "Bac (Pdf, Max 10Mo) *",
    },
    {
      type: "file",
      name: "cvPdf",
      label: "CV (Pdf, Max 10Mo) *",
    },
  ],
};
