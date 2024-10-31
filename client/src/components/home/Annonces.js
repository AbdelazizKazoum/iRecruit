"use client";
import Image from "next/image";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { UserPlus, FileText, Edit, BarChart } from "lucide-react"; // Import icons from lucide-react
import getScrollAnimation from "@/utils/getScrollAnimation";
import ScrollAnimationWrapper from "@/components/Layout/ScrollAnimationWrapper";

// Step-by-step guide for candidates with icons
const steps = [
  {
    icon: <UserPlus className="text-blue-500 w-8 h-6 mr-3" />,
    title: "Première étape",
    description:
      "Inscription à la plateforme et Création de votre espace candidat.",
  },
  {
    icon: <Edit className=" w-8 h-6 mr-3" />,
    title: "Deuxième étape",
    description:
      "Compléter votre candidature qui sera étudiée en ligne par les commissions de sélection.",
  },
  {
    icon: <FileText className="text-purple-500 w-6 h-6 mr-3" />,
    title: "Troisième étape",
    description: "Postuler aux concours correspondants à votre profil.",
  },
  {
    icon: <BarChart className="text-red-500 w-6 h-6 mr-3" />,
    title: "Quatrième étape",
    description: "Suivez l'état d'avancement de votre candidature en ligne.",
  },
];

const Annonces = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div
      className="max-w-screen-xl mt-8 mb-6 sm:mt-14 sm:mb-14 px-6 sm:px-8 lg:px-16 mx-auto"
      id="annonces"
    >
      <div className="grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-2 gap-8 py-8 my-12">
        <ScrollAnimationWrapper className="flex w-full justify-end">
          <motion.div className="h-full w-full p-4" variants={scrollAnimation}>
            <Image
              src="/assets/steps.png"
              alt="Illustration des étapes de candidature"
              layout="responsive"
              quality={100}
              height={414}
              width={508}
            />
          </motion.div>
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper>
          <motion.div
            className="flex flex-col items-start justify-center w-full lg:w-9/12"
            variants={scrollAnimation}
          >
            <h3 className="text-3xl lg:text-4xl font-medium leading-relaxed text-black-600 mb-4">
              Les étapes pour postuler à une offre
            </h3>
            <p className="mb-6 text-black-500">
              Suivez ces étapes simples pour soumettre votre candidature et
              suivre son avancement en ligne.
            </p>
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
                      <strong>{step.title}:</strong> {step.description}
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

export default Annonces;
