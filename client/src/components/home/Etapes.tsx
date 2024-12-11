"use client";
import Image from "next/image";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { UserPlus, FileText, Edit, BarChart } from "lucide-react"; // Import icons from lucide-react
import getScrollAnimation from "@/utils/getScrollAnimation";
import ScrollAnimationWrapper from "@/components/Layout/ScrollAnimationWrapper";
import { getDictionary } from "@/utils/getDictionary";
import { Locale } from "@/configs/i18n";

// Step-by-step guide for candidates with icons
const steps = [
  {
    icon: <UserPlus className="text-blue-500 w-8 h-6 mr-3" />,
    title: {
      en: "Step One",
      fr: "Première étape",
      ar: "الخطوة الأولى",
    },
    description: {
      en: "Register on the platform and create your candidate space.",
      fr: "Inscription à la plateforme et Création de votre espace candidat.",
      ar: "التسجيل على المنصة وإنشاء مساحة المترشح الخاصة بك.",
    },
  },
  {
    icon: <Edit className="w-8 h-6 mr-3" />,
    title: {
      en: "Step Two",
      fr: "Deuxième étape",
      ar: "الخطوة الثانية",
    },
    description: {
      en: "Complete your application, which will be reviewed online by the selection committees.",
      fr: "Compléter votre candidature qui sera étudiée en ligne par les commissions de sélection.",
      ar: "أكمل طلبك الذي ستتم دراسته عبر الإنترنت من قبل لجان الانتقاء.",
    },
  },
  {
    icon: <FileText className="text-purple-500 w-6 h-6 mr-3" />,
    title: {
      en: "Step Three",
      fr: "Troisième étape",
      ar: "الخطوة الثالثة",
    },
    description: {
      en: "Apply to competitions that match your profile.",
      fr: "Postuler aux concours correspondants à votre profil.",
      ar: "التقدم للمسابقات التي تتناسب مع ملفك الشخصي.",
    },
  },
  {
    icon: <BarChart className="text-red-500 w-6 h-6 mr-3" />,
    title: {
      en: "Step Four",
      fr: "Quatrième étape",
      ar: "الخطوة الرابعة",
    },
    description: {
      en: "Track the progress of your application online.",
      fr: "Suivez l'état d'avancement de votre candidature en ligne.",
      ar: "تابع تقدم طلبك عبر الإنترنت.",
    },
  },
];

const Etapes = ({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div
      className="max-w-screen-2xl  mt-8 mb-6 sm:mt-14 sm:mb-14 px-6 sm:px-8 lg:px-16 mx-auto"
      id="etapes"
    >
      <div className="grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-2 gap-8 py-8 my-12">
        <ScrollAnimationWrapper className="flex w-full justify-center">
          <motion.div
            className="h-full w-full max-w-lg    p-4 "
            variants={scrollAnimation}
          >
            <Image
              src="/assets/steps.png"
              alt="Illustration des étapes de candidature"
              layout="responsive"
              quality={100}
              height={314}
              width={408}
            />
          </motion.div>
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper className="">
          <motion.div
            className="flex flex-col items-start justify-center w-full lg:w-9/12"
            variants={scrollAnimation}
          >
            <h3 className="text-3xl lg:text-4xl font-medium leading-relaxed text-black-600 mb-4">
              {dictionary.steps.title}{" "}
            </h3>
            <p className="mb-6 text-black-500">{dictionary.steps.subtitle}</p>
            <ul className="text-black-500 list-inside space-y-4">
              {steps.map((step, index) => (
                <motion.li
                  className="flex items-start"
                  custom={{ duration: 2 + index }}
                  variants={scrollAnimation}
                  key={index}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                >
                  <div className="flex items-center">
                    {step.icon}
                    <div>
                      <strong>{step.title[locale]}:</strong>{" "}
                      {step.description[locale]}
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </ScrollAnimationWrapper>
      </div>
    </div>
  );
};

export default Etapes;
