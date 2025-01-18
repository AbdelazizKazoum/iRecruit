/* eslint-disable @typescript-eslint/no-explicit-any */
import { BookCopy, HelpCircle, Home, Phone, FileText } from "lucide-react";

// Menu link type
type menuType = {
  name: {
    fr: string;
    en: string;
    ar: string;
  };
  path: string;
  icon: any;
};

// Menu links array with icons and labels
export const menuLinks: menuType[] = [
  {
    name: {
      fr: "Accueil",
      ar: "الرئيسية",
      en: "Home",
    },
    path: "/home",
    icon: Home,
  },
  {
    name: {
      fr: "Annonces de Concours",
      ar: "إعلانات المسابقات",
      en: "Job Announcements",
    },
    path: "/concours",
    icon: BookCopy,
  },
  {
    name: {
      fr: "Fiche Candidature",
      ar: "بيانات الترشيح",
      en: "Application Form",
    },
    path: "/candidature", // You can adjust the path as needed
    icon: FileText, // Use an appropriate icon, like "FileText"
  },
  {
    name: {
      fr: "FAQ",
      ar: "الأسئلة الشائعة",
      en: "FAQ",
    },
    path: "/FAQ",
    icon: HelpCircle,
  },
  {
    name: {
      fr: "Contact",
      ar: "اتصل بنا",
      en: "Contact",
    },
    path: "/contact",
    icon: Phone,
  },
];
