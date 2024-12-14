export const personalInformationsConfig = {
  category: "candidate",
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
    {
      type: "text",
      name: "prenom",
      label: {
        en: "First Name *",
        fr: "Prénom *",
        ar: "الإسم الشخصي *",
      },
      placeholder: {
        en: "Enter your first name",
        fr: "Entrez votre prénom",
        ar: "أدخل الإسم الشخصي",
      },
    },
    {
      type: "arabic",
      name: "prenomAr",
      label: {
        fr: "Prénom en arabe *",
        en: "First Name (in Arabic) *",
        ar: "الإسم الشخصي (بالعربية) *",
      },
      placeholder: {
        fr: "Entrez votre prénom en arabe",
        en: "Enter your first name in Arabic",
        ar: "أدخل الإسم الشخصي بالعربية",
      },
    },
    {
      type: "text",
      name: "nom",
      label: {
        en: "Last Name *",
        fr: "Nom *",
        ar: "الإسم العائلي *",
      },
      placeholder: {
        en: "Enter your last name",
        fr: "Entrez votre nom",
        ar: "أدخل الإسم العائلي",
      },
    },
    {
      type: "arabic",
      name: "nomAr",
      label: {
        en: "Last Name (in Arabic) *",
        fr: "Nom en arabe *",
        ar: "الإسم العائلي (بالعربية) *",
      },
      placeholder: {
        en: "Enter your last name in Arabic",
        fr: "Entrez votre nom en arabe",
        ar: "أدخل الإسم العائلي بالعربية",
      },
    },
    {
      type: "text",
      name: "adresse",
      label: {
        en: "Personal Address *",
        fr: "Adresse personnelle *",
        ar: "العنوان الشخصي *",
      },
      placeholder: {
        en: "Enter your personal address",
        fr: "Entrez votre adresse personnelle",
        ar: "أدخل العنوان الشخصي",
      },
    },
    {
      type: "text",
      name: "adresseAr",
      label: {
        en: "Personal Address (in Arabic) *",
        fr: "Adresse personnelle (en arabe) *",
        ar: "العنوان الشخصي (باللغة العربية) *",
      },
      placeholder: {
        en: "Enter your personal address in Arabic",
        fr: "Entrez votre adresse personnelle en arabe",
        ar: "أدخل العنوان الشخصي باللغة العربية",
      },
    },
    {
      type: "text",
      name: "lieuNaissance",
      label: {
        en: "Place of Birth *",
        fr: "Lieu de naissance *",
        ar: "مكان الولادة *",
      },
      placeholder: {
        en: "Enter your place of birth",
        fr: "Entrez votre lieu de naissance",
        ar: "أدخل مكان الولادة",
      },
    },
    {
      type: "text",
      name: "cin",
      label: {
        en: "CIN *",
        fr: "CIN *",
        ar: "البطاقة الوطنية *",
      },
      placeholder: {
        en: "Enter your CIN",
        fr: "Entrez votre CIN",
        ar: "أدخل البطاقة الوطنية",
      },
    },
    {
      type: "date",
      name: "dateNaissance",
      label: {
        en: "Date of Birth *",
        fr: "Date de naissance *",
        ar: "تاريخ الولادة *",
      },
      placeholder: {
        en: "Select your date of birth",
        fr: "Sélectionnez votre date de naissance",
        ar: "اختر تاريخ الولادة",
      },
    },
    {
      type: "select",
      name: "sexe",
      label: {
        en: "Gender *",
        fr: "Sexe *",
        ar: "الجنس *",
      },
      options: [
        {
          value: "feminin",
          label: { en: "Female", fr: "Féminin", ar: "أنثى" },
        },
        { value: "masculin", label: { en: "Male", fr: "Masculin", ar: "ذكر" } },
      ],
    },
    {
      type: "select",
      name: "situation",
      label: {
        en: "Marital Status *",
        fr: "Situation *",
        ar: "الوضع العائلي *",
      },
      options: [
        {
          value: "celibataire",
          label: { en: "Single", fr: "Célibataire", ar: "أعزب" },
        },
        {
          value: "divorce",
          label: { en: "Divorced", fr: "Divorcé(e)", ar: "مطلق" },
        },
        {
          value: "marie",
          label: { en: "Married", fr: "Marié(e)", ar: "متزوج" },
        },
        { value: "veuf", label: { en: "Widowed", fr: "Veuf(ve)", ar: "أرمل" } },
      ],
    },
    {
      type: "text",
      name: "telephone",
      label: {
        en: "Phone Number *",
        fr: "Numéro de téléphone *",
        ar: "رقم الهاتف *",
      },
      placeholder: {
        en: "Enter your phone number",
        fr: "Entrez votre numéro de téléphone",
        ar: "أدخل رقم الهاتف",
      },
    },
    {
      type: "text",
      name: "email",
      label: {
        en: "Email *",
        fr: "Email *",
        ar: "البريد الإلكتروني *",
      },
      placeholder: {
        en: "Enter your email address",
        fr: "Entrez votre adresse email",
        ar: "أدخل البريد الإلكتروني",
      },
    },

    {
      type: "group",
      name: "experiences",
      title: {
        en: "Do you have work experience?",
        fr: "Avez-vous une expérience professionnelle ?",
        ar: "هل لديك خبرة عمل ؟",
      },
      description: {
        en: "Please specify if you have any relevant work experience.",
        fr: "Veuillez indiquer si vous avez une expérience professionnelle pertinente.",
        ar: "الرجاء تحديد ما إذا كنت تملك خبرة عمل ذات صلة.",
      },
      group: [
        {
          type: "checkbox",
          name: "experiences.fonctionnaire",
          label: {
            en: "Are you a government employee?",
            fr: "Êtes-vous fonctionnaire ?",
            ar: "هل أنت موظف حكومي؟",
          },
        },
        {
          type: "text",
          name: "experiences.fonction",
          label: {
            en: "Organization/Institution *",
            fr: "Organisme/établissement *",
            ar: "المنظمة / المؤسسة *",
          },
          placeholder: {
            en: "Enter the name of the organization/institution",
            fr: "Entrez le nom de l'organisme/établissement",
            ar: "أدخل اسم المنظمة / المؤسسة",
          },
          dependsOn: "experiences.fonctionnaire",
        },
        {
          type: "text",
          name: "experiences.ppr",
          label: {
            en: "P.P.R / Employee ID *",
            fr: "P.P.R / Matricule *",
            ar: "رقم الموظف / الرقم الوظيفي *",
          },
          placeholder: {
            en: "Enter your employee ID or P.P.R",
            fr: "Entrez votre matricule ou P.P.R",
            ar: "أدخل رقم الموظف أو الرقم الوظيفي",
          },
          dependsOn: "experiences.fonctionnaire",
        },
        {
          type: "file",
          name: "files.attestation",
          label: {
            en: "Work certificate (PDF, max 10MB) *",
            fr: "Attestation de travail (Pdf, max 10 Mo) *",
            ar: "شهادة العمل (PDF، الحد الأقصى 10 ميغابايت) *",
          },
          placeholder: {
            en: "Upload your work certificate",
            fr: "Téléchargez votre attestation de travail",
            ar: "قم بتحميل شهادة العمل الخاصة بك",
          },
          dependsOn: "experiences.fonctionnaire",
        },
      ],
    },
    {
      type: "group",
      name: "situationDeHandicap",
      title: {
        en: "Do you have a disability status?",
        fr: "Avez-vous une situation de handicap ?",
        ar: "هل لديك حالة إعاقة؟",
      },
      description: {
        en: "Please indicate if you have a disability status.",
        fr: "Veuillez indiquer si vous êtes en situation de handicap.",
        ar: "الرجاء تحديد ما إذا كنت في حالة إعاقة.",
      },
      group: [
        {
          type: "checkbox",
          name: "situationDeHandicap.handicap",
          label: {
            en: "Disability status?",
            fr: "Situation de handicap ?",
            ar: "حالة إعاقة ؟",
          },
        },
        {
          type: "text",
          name: "situationDeHandicap.typeHandicap",
          label: {
            en: "Type of Disability *",
            fr: "Type de handicap *",
            ar: "نوع الإعاقة *",
          },
          placeholder: {
            en: "Enter the type of disability",
            fr: "Entrez le type de handicap",
            ar: "أدخل نوع الإعاقة",
          },
          dependsOn: "situationDeHandicap.handicap",
        },
      ],
    },
    {
      type: "checkbox",
      name: "AncienCombattant",
      label: {
        en: "Are you a former combatant?",
        fr: "Ancien combattant ?",
        ar: "هل أنت مُحارب قديم؟",
      },
    },
    {
      type: "checkbox",
      name: "PupillesNation",
      label: {
        en: "Are you a child of the nation?",
        fr: "Pupilles de la nation ?",
        ar: "هل أنت من أبناء الوطن؟",
      },
    },

    {
      type: "file",
      name: "files.cinPdf",
      label: {
        en: "CIN (PDF, Max 10MB) *",
        fr: "CIN (Pdf, Max 10Mo) *",
        ar: "البطاقة الوطنية (Pdf, Max 10Mo) *",
      },
    },
    {
      type: "file",
      name: "files.bacPdf",
      label: {
        en: "High School Diploma (PDF, Max 10MB) *",
        fr: "Bac (Pdf, Max 10Mo) *",
        ar: "شهادة البكالوريا (Pdf, Max 10Mo) *",
      },
    },
    {
      type: "file",
      name: "files.cvPdf",
      label: {
        en: "CV (PDF, Max 10MB) *",
        fr: "CV (Pdf, Max 10Mo) *",
        ar: "السيرة الذاتية (Pdf, Max 10Mo) *",
      },
    },
  ],
};
