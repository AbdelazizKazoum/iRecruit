export const communicationsFormConfig = {
  category: "communications",
  title: {
    en: "Communications",
    fr: "Communications",
    ar: "الاتصالات",
  },
  description: {
    en: "Add details about any communication activities.",
    fr: "Ajoutez les détails de vos activités de communication.",
    ar: "أضف تفاصيل حول أنشطة الاتصال الخاصة بك.",
  },

  fields: [
    // Communications
    {
      type: "text",
      name: "title",
      label: {
        en: "Communication Title",
        fr: "Titre de la communication",
        ar: "عنوان النشاط",
      },
    },
    {
      type: "date",
      name: "date",
      label: {
        en: "Communication Date",
        fr: "Date de la communication",
        ar: "تاريخ النشاط",
      },
    },
    {
      type: "file",
      label: {
        en: "Publication (PDF, Max 10MB) *",
        fr: "Publication (Pdf, Max 10Mo) *",
        ar: "المنشور (PDF، بحد أقصى 10 ميجا بايت) *",
      },
      name: "files.communicationPdf",
      placeholder: {
        en: "",
        fr: "",
        ar: "",
      },
    },
  ],
};
