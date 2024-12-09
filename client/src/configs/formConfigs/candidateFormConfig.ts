export const candidateFormConfig = {
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
      type: "file",
      name: "cinPdf",
      label: {
        en: "CIN (PDF, Max 10MB) *",
        fr: "CIN (Pdf, Max 10Mo) *",
        ar: "البطاقة الوطنية (Pdf, Max 10Mo) *",
      },
    },
    {
      type: "file",
      name: "bacPdf",
      label: {
        en: "High School Diploma (PDF, Max 10MB) *",
        fr: "Bac (Pdf, Max 10Mo) *",
        ar: "شهادة البكالوريا (Pdf, Max 10Mo) *",
      },
    },
    {
      type: "file",
      name: "cvPdf",
      label: {
        en: "CV (PDF, Max 10MB) *",
        fr: "CV (Pdf, Max 10Mo) *",
        ar: "السيرة الذاتية (Pdf, Max 10Mo) *",
      },
    },
  ],
};
