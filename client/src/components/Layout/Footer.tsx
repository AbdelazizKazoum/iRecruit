import themeConfig from "@/configs/themeConfig";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-gray-100 pt-20 pb-10">
      <div className="max-w-screen-xl w-full mx-auto px-6 sm:px-8 lg:px-16 grid grid-rows-6 sm:grid-rows-1 grid-flow-row sm:grid-flow-col grid-cols-3 sm:grid-cols-12 gap-4">
        {/* Project Description */}
        <div className="row-span-2 sm:col-span-4 col-start-1 col-end-4 sm:col-end-5 flex flex-col items-start">
          <div className="h-8 w-auto mb-6" />
          <p className="mb-4">
            <strong className="font-medium">{themeConfig.templateName} </strong>{" "}
            est une plateforme de recrutement dédiée à simplifier le processus
            de candidature pour les candidats et les entreprises.
          </p>
          <p className="text-gray-400 ">
            ©{new Date().getFullYear()} - {themeConfig.templateName}
          </p>
          <p className="text-gray-400 text-center">
            Powered by <span className="font-semibold  ">Abdelaziz Kazoum</span>
          </p>
        </div>

        {/* Navigation Links */}
        <div className="row-span-2 sm:col-span-2 sm:col-start-7 sm:col-end-9 flex flex-col">
          <p className="text-black-600 mb-4 font-medium text-lg">Produit</p>
          <ul className="text-black-500">
            <li className="my-2 hover:text-blue-500 cursor-pointer transition-all">
              Télécharger
            </li>
            <li className="my-2 hover:text-blue-500 cursor-pointer transition-all">
              Tarification
            </li>
            <li className="my-2 hover:text-blue-500 cursor-pointer transition-all">
              Emplacements
            </li>
            <li className="my-2 hover:text-blue-500 cursor-pointer transition-all">
              Serveurs
            </li>
            <li className="my-2 hover:text-blue-500 cursor-pointer transition-all">
              Pays
            </li>
            <li className="my-2 hover:text-blue-500 cursor-pointer transition-all">
              Blog
            </li>
          </ul>
        </div>

        {/* Engagement Links */}
        <div className="row-span-2 sm:col-span-2 sm:col-start-9 sm:col-end-11 flex flex-col">
          <p className="text-black-600 mb-4 font-medium text-lg">Engagement</p>
          <ul className="text-black-500">
            <li className="my-2 hover:text-blue-500 cursor-pointer transition-all">
              Pourquoi {themeConfig.templateName} ?
            </li>
            <li className="my-2 hover:text-blue-500 cursor-pointer transition-all">
              FAQ
            </li>
            <li className="my-2 hover:text-blue-500 cursor-pointer transition-all">
              Tutoriels
            </li>
            <li className="my-2 hover:text-blue-500 cursor-pointer transition-all">
              À propos de nous
            </li>
            <li className="my-2 hover:text-blue-500 cursor-pointer transition-all">
              Politique de confidentialité
            </li>
            <li className="my-2 hover:text-blue-500 cursor-pointer transition-all">
              Conditions d’utilisation
            </li>
          </ul>
        </div>

        {/* Partnership Links */}
        <div className="row-span-2 sm:col-span-2 sm:col-start-11 sm:col-end-13 flex flex-col">
          <p className="text-black-600 mb-4 font-medium text-lg">
            Opportunités
          </p>
          <ul className="text-black-500">
            <li className="my-2 hover:text-blue-500 cursor-pointer transition-all">
              Affiliation
            </li>
            <li className="my-2 hover:text-blue-500 cursor-pointer transition-all">
              Devenir partenaire
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
