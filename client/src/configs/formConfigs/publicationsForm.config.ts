export const publicationsFormConfig = {
  category: "publications",
  title: {
    en: "Publications",
    fr: "Publications",
    ar: "المنشورات",
  },

  fields: [
    // Publications
    {
      type: "text",
      label: {
        en: "Title",
        fr: "Titre",
        ar: "العنوان",
      },
      name: "titre",
      placeholder: {
        en: "Title",
        fr: "Titre",
        ar: "العنوان",
      },
    },
    {
      type: "number",
      label: {
        en: "Year of Publication *",
        fr: "Année de publication de l'article *",
        ar: "سنة نشر المقال *",
      },
      name: "anneePublication",
      placeholder: {
        en: "Year of Publication",
        fr: "Année de publication de l'article",
        ar: "سنة نشر المقال",
      },
      dependsOn: "titre",
    },
    {
      type: "select",
      label: {
        en: "Type *",
        fr: "Type *",
        ar: "النوع *",
      },
      name: "type",
      placeholder: {
        en: "",
        fr: "",
        ar: "",
      },
      dependsOn: "titre",
      options: [
        {
          id: 1,
          label: {
            en: "Articles in indexed journals (Scopus and/or WoS), according to Q1, Q2, Q3, and Q4, and whether first author or not",
            fr: "Articles dans des revues indexées (Scopus et/ou WoS), selon Q1, Q2, Q3 et Q4 et selon premier auteur ou non",
            ar: "مقالات في مجلات مفهرسة (Scopus و/أو WoS)، حسب Q1، Q2، Q3 وQ4، وبحسب إذا كان المؤلف الأول أم لا",
          },
          value:
            "Articles dans des revues indexées (Scopus et/ou WoS), selon Q1, Q2, Q3 et Q4 et selon premier auteur ou non",
        },
        {
          id: 2,
          label: {
            en: "Publications in indexed proceedings (Scopus and/or WoS), whether first author or not",
            fr: "Publications dans les proceedings indexés (Scopus et/ou Wos), selon premier auteur au non",
            ar: "منشورات في وقائع مفهرسة (Scopus و/أو WoS)، سواء كان المؤلف الأول أم لا",
          },
          value:
            "Publications dans les proceedings indexés (Scopus et/ou Wos), selon premier auteur au non",
        },
        {
          id: 3,
          label: {
            en: "Articles in journals indexed in the Moroccan Scientific Journals Portal (PRSM), whether first author or not",
            fr: "Articles dans des revues indexées dans le Portail des Revues Scientifiques Marocaines (PRSM), selon premier auteur ou non",
            ar: "مقالات في مجلات مفهرسة في بوابة المجلات العلمية المغربية (PRSM)، سواء كان المؤلف الأول أم لا",
          },
          value:
            "Articles dans des revues indexées dans le Portail des Revues Scientifiques Marocaines (PRSM), selon premier auteur ou non",
        },
        {
          id: 4,
          label: {
            en: "Registered patents (Moroccan, PCT)",
            fr: "Brevets enregistrés (marocain, PCT)",
            ar: "براءات اختراع مسجلة (مغربية، PCT)",
          },
          value: "Brevets enregistrés (marocain, PCT)",
        },
        {
          id: 5,
          label: {
            en: "Books with ISBN and indexed",
            fr: "Ouvrages avec ISBN et indexés",
            ar: "كتب برقم ISBN ومفهرسة",
          },
          value: "Ouvrages avec ISBN et indexés",
        },
        {
          id: 6,
          label: {
            en: "Book chapter with ISBN and indexed",
            fr: "Chapitre d'ouvrage avec ISBN et indexé",
            ar: "فصل من كتاب برقم ISBN ومفهرس",
          },
          value: "Chapitre d'ouvrage avec ISBN et indexé",
        },
        {
          id: 7,
          label: {
            en: "Other",
            fr: "Autre",
            ar: "أخرى",
          },
          value: "Autre",
        },
      ],
    },
    {
      type: "text",
      label: {
        en: "URL",
        fr: "URL",
        ar: "رابط",
      },
      name: "url",
      placeholder: {
        en: "URL",
        fr: "URL",
        ar: "رابط",
      },
      dependsOn: "titre",
    },
    {
      type: "file",
      label: {
        en: "Publication (PDF, Max 10MB) *",
        fr: "Publication (Pdf, Max 10Mo) *",
        ar: "المنشور (PDF، بحد أقصى 10 ميجا بايت) *",
      },
      name: "files.publicationPdf",
      placeholder: {
        en: "",
        fr: "",
        ar: "",
      },
      dependsOn: "titre",
    },
  ],
};
