import { BriefcaseBusiness, Users } from "lucide-react";

export const steps = [
  {
    title: {
      en: "Personal Information",
      fr: "Informations Personnelles",
      ar: "المعلومات الشخصية",
    },
    href: "/candidature?section=info-personnelles",
    icon: Users,
  },
  {
    title: {
      en: "Qualifications/Experiences",
      fr: "Qualifications/Expériences",
      ar: "المؤهلات/الخبرات",
    },
    href: "/candidature?section=info-professionnelles",
    icon: BriefcaseBusiness,
  },
];
