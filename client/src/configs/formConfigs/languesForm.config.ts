export const languesFormConfig = {
  category: "langues",
  title: {
    en: "Language Levels",
    fr: "Niveaux Langues",
    ar: "مستويات اللغة",
  },

  fields: [
    // Niveaux Langues
    {
      type: "select",
      name: "langue",
      label: {
        en: "Language *",
        fr: "Langue *",
        ar: "اللغة *",
      },
      options: [
        {
          id: 1,
          label: { fr: "Arabe", en: "Arabic", ar: "العربية" },
          value: "arabe",
        },
        {
          id: 2,
          label: { fr: "Amazigh", en: "Amazigh", ar: "أمازيغية" },
          value: "amazigh",
        },
        {
          id: 3,
          label: { fr: "Anglais", en: "English", ar: "الإنجليزية" },
          value: "anglais",
        },
        {
          id: 4,
          label: { fr: "Français", en: "French", ar: "الفرنسية" },
          value: "français",
        },
        {
          id: 5,
          label: { fr: "Espagnol", en: "Spanish", ar: "الإسبانية" },
          value: "espagnol",
        },
        {
          id: 6,
          label: { fr: "Russe", en: "Russian", ar: "الروسية" },
          value: "russe",
        },
        {
          id: 7,
          label: { fr: "Allemand", en: "German", ar: "ألمانية" },
          value: "allemand",
        },
        {
          id: 8,
          label: { fr: "Italien", en: "Italian", ar: "إيطالي" },
          value: "italien",
        },
        {
          id: 9,
          label: { fr: "Portugais", en: "Portuguese", ar: "البرتغالية" },
          value: "portugais",
        },
        {
          id: 10,
          label: { fr: "Japonais", en: "Japanese", ar: "اليابانية" },
          value: "japonais",
        },
        {
          id: 11,
          label: { fr: "Chinois", en: "Chinese", ar: "صينى" },
          value: "chinois",
        },
        {
          id: 12,
          label: { fr: "Autres", en: "Others", ar: "لغات أخرى" },
          value: "autres",
        },
      ],
    },
    {
      type: "select",
      name: "niveau",
      label: {
        en: "Level *",
        fr: "Niveau *",
        ar: "المستوى *",
      },
      options: [
        {
          value: "avance",
          label: { en: "Advanced", fr: "Avancé", ar: "متقدم" },
        },
        {
          value: "basique",
          label: { en: "Basic", fr: "Basique", ar: "أساسي" },
        },
        {
          value: "intermediare",
          label: { en: "Intermediate", fr: "Intermédiaire", ar: "متوسط" },
        },
      ],
    },
    {
      type: "file",
      label: {
        en: "Certificate (PDF, Max 10MB, Optional)",
        fr: "Certificat (Pdf, Max 10Mo, Optionnel)",
        ar: "الشهادة (PDF، الحد الأقصى 10 ميغابايت، اختياري)",
      },
      name: "files.certificatLanguePdf",
    },
  ],
};
