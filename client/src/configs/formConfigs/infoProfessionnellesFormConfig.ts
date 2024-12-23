export const infoProfessionnellesFormConfig = {
  category: "info-professionnelles",
  title: {
    en: "Application",
    fr: "Candidature",
    ar: "طلب التوظيف",
  },
  description: {
    en: "This is how others will see you on the site.",
    fr: "C'est ainsi que les autres vous verront sur le site.",
    ar: "هكذا سيراك الآخرون على الموقع.",
  },
  fields: [
    // Parcours et diplômes
    {
      type: "group",
      title: {
        en: "Education and Degrees",
        fr: "Parcours et diplômes",
        ar: "التعليم والشهادات",
      },
      name: "parcoursEtDiplomes",
      description: {
        en: "Please add all your post-secondary degrees. This is mandatory.",
        fr: "Merci d'ajouter tous vos diplômes après le bac. C'est obligatoire.",
        ar: "يرجى إضافة جميع الشهادات بعد الثانوية العامة. هذا إلزامي.",
      },
      group: [
        {
          type: "select",
          name: "parcoursEtDiplomes.origine",
          label: {
            en: "Origin *",
            fr: "Origine *",
            ar: "الأصل *",
          },
          options: [
            {
              value: "etranger",
              label: { en: "Foreign", fr: "Etranger", ar: "أجنبي" },
            },
            {
              value: "marocainPrive",
              label: {
                en: "Moroccan Private",
                fr: "Marocain privé",
                ar: "مغربي خاص",
              },
            },
            {
              value: "marocainPublic",
              label: {
                en: "Moroccan Public",
                fr: "Marocain public",
                ar: "مغربي عام",
              },
            },
          ],
        },
        {
          type: "text",
          name: "parcoursEtDiplomes.intituleDiplome",
          label: {
            en: "Diploma Title with Details *",
            fr: "Intitulé de votre diplôme avec précision *",
            ar: "عنوان الشهادة بالتفاصيل *",
          },
        },
        {
          type: "select",
          name: "parcoursEtDiplomes.diplomeType",
          label: {
            en: "Diploma or Equivalent *",
            fr: "Diplôme ou diplôme équivalent *",
            ar: "الشهادة أو ما يعادلها *",
          },
          options: [],
        },
        {
          type: "text",
          name: "parcoursEtDiplomes.anneeObtention",
          label: {
            en: "Year of Graduation *",
            fr: "Année d'obtention du diplôme *",
            ar: "سنة التخرج *",
          },
        },
        {
          type: "text",
          name: "parcoursEtDiplomes.specialite",
          label: {
            en: "Specialty *",
            fr: "Spécialité *",
            ar: "التخصص *",
          },
        },
        {
          type: "text",
          name: "parcoursEtDiplomes.mention",
          label: {
            en: "Mention *",
            fr: "Mention *",
            ar: "التقدير *",
          },
        },
        {
          type: "text",
          name: "parcoursEtDiplomes.etablissement",
          label: {
            en: "Institution *",
            fr: "Etablissement *",
            ar: "المؤسسة *",
          },
        },
        {
          type: "file",
          name: "parcoursEtDiplomes.diplomePdf",
          label: {
            en: "Scanned Diploma (PDF, Max 10MB) *",
            fr: "Diplôme scanné (Pdf, Max 10Mo) *",
            ar: "شهادة ممسوحة ضوئيًا (PDF، الحد الأقصى 10 ميغابايت) *",
          },
        },
      ],
    },
    // Niveaux Langues
    {
      type: "group",
      title: {
        en: "Language Levels",
        fr: "Niveaux Langues",
        ar: "مستويات اللغة",
      },
      name: "niveauxLangues",
      description: {
        en: "Required for teaching roles, optional for administrative and technical roles.",
        fr: "Langues : rubrique requise pour les postes d'enseignants, facultative pour les cadres administratifs et techniques.",
        ar: "مطلوب للأدوار التدريسية، اختياري للأدوار الإدارية والفنية.",
      },
      group: [
        {
          type: "select",
          name: "niveauxLangues.langue",
          label: {
            en: "Language *",
            fr: "Langue *",
            ar: "اللغة *",
          },
          options: [],
        },
        {
          type: "select",
          name: "niveauxLangues.niveau",
          label: {
            en: "Level *",
            fr: "Niveau *",
            ar: "المستوى *",
          },
          options: [],
        },
        {
          type: "file",
          label: {
            en: "Certificate (PDF, Max 10MB, Optional)",
            fr: "Certificat (Pdf, Max 10Mo, Optionnel)",
            ar: "الشهادة (PDF، الحد الأقصى 10 ميغابايت، اختياري)",
          },
          name: "niveauxLangues.certificatLanguePdf",
        },
      ],
    },
    // Publications
    {
      type: "group",
      title: {
        en: "Publications",
        fr: "Publications",
        ar: "المنشورات",
      },
      name: "publications",
      description: {
        en: "List all your relevant publications here.",
        fr: "Listez ici toutes vos publications pertinentes.",
        ar: "قم بإدراج جميع منشوراتك ذات الصلة هنا.",
      },
      group: [
        {
          type: "text",
          name: "publications.title",
          label: {
            en: "Publication Title",
            fr: "Titre de la publication",
            ar: "عنوان المنشور",
          },
        },
        {
          type: "text",
          name: "publications.date",
          label: {
            en: "Publication Date",
            fr: "Date de publication",
            ar: "تاريخ النشر",
          },
        },
      ],
    },
    // Communications
    {
      type: "group",
      title: {
        en: "Communications",
        fr: "Communications",
        ar: "الاتصالات",
      },
      name: "communications",
      description: {
        en: "Add details about any communication activities.",
        fr: "Ajoutez les détails de vos activités de communication.",
        ar: "أضف تفاصيل حول أنشطة الاتصال الخاصة بك.",
      },
      group: [
        {
          type: "text",
          name: "communications.title",
          label: {
            en: "Communication Title",
            fr: "Titre de la communication",
            ar: "عنوان النشاط",
          },
        },
        {
          type: "text",
          name: "communications.date",
          label: {
            en: "Communication Date",
            fr: "Date de la communication",
            ar: "تاريخ النشاط",
          },
        },
      ],
    },
  ],
};
