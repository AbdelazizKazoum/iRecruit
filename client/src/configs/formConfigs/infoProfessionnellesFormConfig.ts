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
          options: [
            {
              id: 1,
              value: "D0002",
              label: {
                ar: "الدكتوراه",
                fr: "Doctorat",
                en: "Doctorate",
              },
              type: "PUBLIC",
              grades: null,
            },
            {
              id: 2,
              value: "D0003",
              label: {
                ar: "الماستر",
                fr: "Master",
                en: "Master",
              },
              type: "PUBLIC",
              grades: null,
            },
            {
              id: 3,
              value: "D0004",
              label: {
                ar: "الماستر المتخصص",
                fr: "Master spécialisé",
                en: "Specialized Master",
              },
              type: "PUBLIC",
              grades: null,
            },
            {
              id: 4,
              value: "D0005",
              label: {
                ar: "الماستر في العلوم والتقنيات",
                fr: "Master en Sciences et Techniques",
                en: "Master in Science and Technology",
              },
              type: "PUBLIC",
              grades: null,
            },
            {
              id: 5,
              value: "D0006",
              label: {
                ar: "الإجازة في الدراسات الأساسية",
                fr: "Licence des études fondamentales",
                en: "Bachelor of Fundamental Studies",
              },
              type: "PUBLIC",
              grades: null,
            },
            {
              id: 7,
              value: "D0008",
              label: {
                ar: "دبلوم دكتور في الطب",
                fr: "Diplôme de docteur en médecine",
                en: "Doctorate in Medicine",
              },
              type: "PUBLIC",
              grades: null,
            },
            {
              id: 8,
              value: "D0009",
              label: {
                ar: "دبلوم دكتور في طب الأسنان",
                fr: "Diplôme de docteur en médecine dentaire",
                en: "Doctorate in Dental Medicine",
              },
              type: "PUBLIC",
              grades: null,
            },
            {
              id: 11,
              value: "D0011",
              label: {
                ar: "دبلوم مترجم تحريري",
                fr: "Diplôme traducteur",
                en: "Diploma Translator",
              },
              type: "PUBLIC",
              grades: null,
            },
            {
              id: 12,
              value: "D0012",
              label: {
                ar: "دبلوم دكتور في الصيدلة",
                fr: "Diplôme de docteur en pharmacie",
                en: "Doctor of Pharmacy Degree",
              },
              type: "PUBLIC",
              grades: null,
            },
            {
              id: 13,
              value: "D0013",
              label: {
                ar: "الإجازة في العلوم والتقنيات",
                fr: "Licence en sciences et techniques",
                en: "Bachelor's Degree in Sciences and Techniques",
              },
              type: "PUBLIC",
              grades: null,
            },
            {
              id: 14,
              value: "D0014",
              label: {
                ar: "الإجازة المهنية",
                fr: "Licence professionnelle",
                en: "Professional Bachelor's Degree",
              },
              type: "PUBLIC",
              grades: null,
            },
            {
              id: 15,
              value: "D0015",
              label: {
                ar: "الدبلوم الجامعي للتكنولوجيا",
                fr: "Diplôme universitaire de technologie",
                en: "University Diploma in Technology",
              },
              type: "PUBLIC",
              grades: null,
            },
            {
              id: 16,
              value: "D0016",
              label: {
                ar: "دبلوم المدارس الوطنية للتجارة والتسيير",
                fr: "Diplôme des écoles nationales de commerce et gestion",
                en: "Diploma from National School of Commerce and Management",
              },
              type: "PUBLIC",
              grades: null,
            },
            {
              id: 17,
              value: "D0017",
              label: {
                ar: "دبلوم مهندس الدولة",
                fr: "Diplôme d'ingénieur d'état",
                en: "State Engineer Degree",
              },
              type: "PUBLIC",
              grades: null,
            },
            {
              id: 22,
              value: "D0022",
              label: {
                ar: "دبلوم التخصص في طب الأسنان",
                fr: "Diplôme National de Spécialité d'Orthodentie",
                en: "Dental Specialization Degree",
              },
              type: "PUBLIC",
              grades: null,
            },
            {
              id: 23,
              value: "D0023",
              label: {
                ar: "دبلوم التخصص في الطب",
                fr: "Diplôme de Spécialité Médicale",
                en: "Medical Specialization Diploma",
              },
              type: "PUBLIC",
              grades: null,
            },
            {
              id: 25,
              value: "D0025",
              label: {
                ar: "الإجازة في التربية",
                fr: "Licence en éducation",
                en: "Bachelor's Degree in Education",
              },
              type: "PUBLIC",
              grades: null,
            },
            {
              id: 27,
              value: "D0027",
              label: {
                ar: "دبلوم عالي في الترجمة الفورية",
                fr: "Diplôme d'interprète",
                en: "Higher Diploma in Simultaneous Interpretation",
              },
              type: "PUBLIC",
              grades: null,
            },
            {
              id: 28,
              value: "D0028",
              label: {
                ar: "دبلوم في الترجمة السمعية البصرية",
                fr: "Diplôme en traduction audio visuelle",
                en: "Diploma in Audiovisual Translation",
              },
              type: "PUBLIC",
              grades: null,
            },
            {
              id: 40,
              value: "D0037",
              label: {
                ar: "دبلوم في مهن الفنون والتصميم",
                fr: "Diplôme de Métiers d'Art et de Design",
                en: "Art and Design Trades Diploma",
              },
              type: "PUBLIC",
              grades: null,
            },
            {
              id: 41,
              value: "D0038",
              label: {
                ar: "دبلوم المدرسة الوطنية العليا للفن والتصميم",
                fr: "Diplôme de l'Ecole Nationale Supérieure de l'Art et de Design",
                en: "National Superior School of Art and Design Diploma",
              },
              type: "PUBLIC",
              grades: null,
            },
            {
              id: 51,
              value: "D0030",
              label: {
                ar: "دبلوم السلك العالي للمعهد العالي الدولي للسياحة بطنجة",
                fr: "Diplôme du Cycle Supérieur de l'Institut Supérieur International de Tourisme de Tanger",
                en: "Higher Degree from the International Tourism Institute of Tangier",
              },
              type: "PUBLIC",
              grades: null,
            },
            {
              id: 52,
              value: "D0031",
              label: {
                ar: "دبلوم السلك العادي للمعهد العالي الدولي للسياحة",
                fr: "Diplôme du Cycle Normal de l’Institut Supérieur International de Tourisme",
                en: "Normal Degree from the International Tourism Institute",
              },
              type: "PUBLIC",
              grades: null,
            },
            {
              id: 65,
              value: "D0043",
              label: {
                en: "Diploma of Specialization in Pharmacy",
                fr: "Diplôme de Spécialité en pharmacie",
                ar: "دبلوم التخصص في الصيدلة",
              },
              type: "PUBLIC",
              grades: null,
            },
            {
              id: 66,
              value: "D0032",
              label: {
                en: "Captain at Sea Diploma",
                fr: "Diplôme de Capitaine au Long Cours",
                ar: "دبلوم ربان أعالي البحار",
              },
              type: "PUBLIC",
              grades: null,
            },
            {
              id: 67,
              value: "D0033",
              label: {
                en: "INSAP Fundamental Cycle",
                fr: "Cycle fondamental INSAP",
                ar: "دبلوم السلك الأساسي المسلم من طرف المعهد الوطني لعلوم الآثار والتراث",
              },
              type: "PUBLIC",
              grades: null,
            },
            {
              id: 68,
              value: "D0034",
              label: {
                en: "ISCAE Diploma Group",
                fr: "ISCAE-Diplôme du Groupe Institut Supérieur de Commerce et d'Administration des Entreprises",
                ar: "دبلوم مجموعة المعهد العالي للتجارة وإدارة المقاولات",
              },
              type: "PUBLIC",
              grades: null,
            },
            {
              id: 69,
              value: "D0035",
              label: {
                en: "IT Specialist Diploma",
                fr: "Diplôme d'informatiste",
                ar: "Diplôme d'informatiste",
              },
              type: "PUBLIC",
              grades: null,
            },
            {
              id: 70,
              value: "D0036",
              label: {
                en: "IT Specialist Diploma Advanced",
                fr: "Diplôme d'informatiste spécialisé",
                ar: "Diplôme d'informatiste spécialisé",
              },
              type: "PUBLIC",
              grades: null,
            },
            {
              id: 71,
              value: "D0041",
              label: {
                en: "Admissibility Certificate for CNC",
                fr: "Attestation d'admissibilité au CNC",
                ar: "شهادة لاجتياز المباراة الوطنية الموحدة",
              },
              type: "PUBLIC",
              grades: null,
            },
            {
              id: 72,
              value: "D0001",
              label: {
                en: "Baccalaureate",
                fr: "Baccalauréat",
                ar: "البكالوريا",
              },
              type: "PUBLIC",
              grades: null,
            },
            {
              id: 73,
              value: "D0045",
              label: {
                en: "Maritime Affairs Administrator Diploma",
                fr: "Diplôme d'Administrateur des Affaires Maritimes",
                ar: "دبلوم متصرف في الشؤون البحرية",
              },
              type: "PUBLIC",
              grades: null,
            },
            {
              id: 74,
              value: "D0046",
              label: {
                en: "Captain Mechanic Class 1 Diploma",
                fr: "Diplôme de Capitaine Mécanicien de 1ère classe de la Marine Marchande",
                ar: "دبلوم ضابط ميكانيكي من الدرجة الأولى في الملاحة التجارية",
              },
              type: "PUBLIC",
              grades: null,
            },
            {
              id: 75,
              value: "D0047",
              label: {
                en: "Normal Cycle Diploma in Information and Communication",
                fr: "Diplôme de Cycle Normal en Information et Communication",
                ar: "دبلوم السلك العادي في الإعلام والتواصل",
              },
              type: "PUBLIC",
              grades: null,
            },
            {
              id: 76,
              value: "D0048",
              label: {
                en: "Higher Cycle Diploma",
                fr: "Diplôme de Cycle Supérieur",
                ar: "دبلوم السلك العالي",
              },
              type: "PUBLIC",
              grades: null,
            },
            {
              id: 77,
              value: "D0049",
              label: {
                en: "Lieutenant at Sea Diploma",
                fr: "Diplôme de Lieutenant au Long Cours",
                ar: "دبلوم ملازم أعالي البحار",
              },
              type: "PUBLIC",
              grades: null,
            },
            {
              id: 78,
              value: "D0050",
              label: {
                en: "Lieutenant Mechanic Class 1 Diploma",
                fr: "Diplôme de Lieutenant Mécanicien de 1ère classe de la Marine Marchande",
                ar: "دبلوم ملازم ميكانيكي من الدرجة الأولى في الملاحة التجارية",
              },
              type: "PUBLIC",
              grades: null,
            },
            {
              id: 79,
              value: "D0051",
              label: {
                en: "National Institute of Fine Arts Diploma",
                fr: "Diplôme de l'Institut National des Beaux Arts",
                ar: "دبلوم المعهد الوطني للفنون الجميلة",
              },
              type: "PUBLIC",
              grades: null,
            },
            {
              id: 80,
              value: "D0052",
              label: {
                en: "Normal Cycle Diploma",
                fr: "Diplôme du Cycle Normal",
                ar: "دبلوم السلك العادي",
              },
              type: "PUBLIC",
              grades: null,
            },
            {
              id: 81,
              value: "D0053",
              label: {
                en: "National Diploma of Certified Accountant",
                fr: "Diplôme National d'Expert Comptable",
                ar: "دبلوم وطني لخبير محاسب",
              },
              type: "PUBLIC",
              grades: null,
            },
            {
              id: 82,
              value: "D0054",
              label: {
                en: "State Engineer Officer Diploma",
                fr: "Diplôme Officier Ingénieur d'Etat",
                ar: "دبلوم ضابط مهندس الدولة",
              },
              type: "PUBLIC",
              grades: null,
            },
            {
              id: 83,
              value: "D0055",
              label: {
                en: "Higher Diploma in Translation",
                fr: "Diplôme Supérieur de Traduction",
                ar: "دبلوم عالي في الترجمة التحريرية",
              },
              type: "PUBLIC",
              grades: null,
            },
            {
              id: 84,
              value: "D0056",
              label: {
                en: "Veterinary Doctor",
                fr: "Docteur Vétérinaire",
                ar: "دكتور بيطري",
              },
              type: "PUBLIC",
              grades: null,
            },
            {
              id: 85,
              value: "D0057",
              label: {
                en: "Specialist Veterinary Doctor",
                fr: "Docteur Vétérinaire Spécialisé",
                ar: "دكتور بيطري مختص",
              },
              type: "PUBLIC",
              grades: null,
            },
            {
              id: 86,
              value: "D0059",
              label: {
                en: "Second Cycle Certificate of Normal Schools",
                fr: "Certificat du deuxième cycle des écoles normales supérieures",
                ar: "شهادة السلك الثانيي للمدارس العليا للأساتدة",
              },
              type: "PUBLIC",
              grades: null,
            },
            {
              id: 87,
              value: "D0060",
              label: {
                en: "Higher Certificate from Normal Schools",
                fr: "Certificat du cycle supérieur délivré par les écoles normales supérieures",
                ar: "شهادة السلك العالي المسلمة من المدارس العليا للأساتدة",
              },
              type: "PUBLIC",
              grades: null,
            },
            {
              id: 88,
              value: "D0061",
              label: {
                en: "Preparatory Classes for Grandes Ecoles",
                fr: "Classes Préparatoires aux Grandes Ecoles",
                ar: "الأقسام التحضيرية للمدارس العليا",
              },
              type: "PUBLIC",
              grades: null,
            },
            {
              id: 89,
              value: "D0019",
              label: {
                en: "Higher Studies Diploma",
                fr: "Diplôme d'études supérieures approfondies",
                ar: "دبلوم الدراسات العليا المعمقة",
              },
              type: "PUBLIC",
              grades: null,
            },
          ],
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
          name: "niveauxLangues.niveau",
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
