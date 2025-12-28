export const experiencesFormConfig = {
  title: {
    en: "Professional Experience",
    fr: "Expériences Professionnelles",
    ar: "الخبرات المهنية",
  },
  fields: [
    {
      name: "position",
      label: { en: "Position", fr: "Poste", ar: "المنصب" },
      type: "text",
      placeholder: {
        en: "Software Engineer",
        fr: "Ingénieur logiciel",
        ar: "مهندس برمجيات",
      },
    },
    {
      name: "company",
      label: { en: "Company", fr: "Entreprise", ar: "الشركة" },
      type: "text",
      placeholder: {
        en: "Company name",
        fr: "Nom de l'entreprise",
        ar: "اسم الشركة",
      },
    },
    {
      name: "startDate",
      label: { en: "Start Date", fr: "Date de début", ar: "تاريخ البدء" },
      type: "text",
      placeholder: { en: "2021-01", fr: "2021-01", ar: "2021-01" },
    },
    {
      name: "endDate",
      label: { en: "End Date", fr: "Date de fin", ar: "تاريخ الانتهاء" },
      type: "text",
      placeholder: { en: "2023-06", fr: "2023-06", ar: "2023-06" },
    },
    {
      name: "currentlyWorking",
      label: {
        en: "Currently Working",
        fr: "Actuellement en poste",
        ar: "لا يزال يعمل",
      },
      type: "checkbox",
    },
    {
      name: "description",
      label: { en: "Description", fr: "Description", ar: "الوصف" },
      type: "textarea",
      placeholder: {
        en: "Key responsibilities and achievements",
        fr: "Responsabilités et réalisations clés",
        ar: "المسؤوليات والإنجازات الرئيسية",
      },
    },
    {
      name: "highlights",
      label: {
        en: "Tasks / Added Value (bullets)",
        fr: "Tâches / Valeur ajoutée (puces)",
        ar: "المهام / القيمة المضافة (نقاط)",
      },
      type: "textarea",
      placeholder: {
        en: "One bullet per line: Increased conversions by 15%\nOptimized API latency by 30%",
        fr: "Une puce par ligne : Augmentation des conversions de 15%\nOptimisation de la latence API de 30%",
        ar: "عنصر في كل سطر",
      },
    },
  ],
};
