export const jobApplicationFormConfig = {
  category: "jobApplication",
  title: {
    en: "Job Application",
    fr: "Demande d'emploi",
    ar: "طلب التوظيف",
  },
  description: {
    en: "Attach the required documents for your job application.",
    fr: "Joignez les documents requis pour votre candidature.",
    ar: "قم بإرفاق المستندات المطلوبة لطلب الوظيفة الخاص بك.",
  },

  fields: [
    {
      type: "file",
      label: {
        en: "Diploma (PDF, Max 10MB) *",
        fr: "Diplôme (Pdf, Max 10Mo) *",
        ar: "ديبلوم الترشيح (PDF، بحد أقصى 10 ميجا بايت) *",
      },
      name: "files.diplomaPdf",
      placeholder: {
        en: "",
        fr: "",
        ar: "",
      },
    },
    {
      type: "file",
      label: {
        en: "Declaration of Honor (PDF, Max 10MB) *",
        fr: "Déclaration sur l'honneur (Pdf, Max 10Mo) *",
        ar: "تصريح بالشرف (PDF، بحد أقصى 10 ميجا بايت) *",
      },
      name: "files.declarationPdf",
      placeholder: {
        en: "",
        fr: "",
        ar: "",
      },
    },
    {
      type: "file",
      label: {
        en: "Motivational Letter (PDF, Max 10MB) *",
        fr: "Lettre de motivation (Pdf, Max 10Mo) *",
        ar: "طلب خطي (PDF، بحد أقصى 10 ميجا بايت) *",
      },
      name: "files.motivationLetterPdf",
      placeholder: {
        en: "",
        fr: "",
        ar: "",
      },
    },
  ],
};
