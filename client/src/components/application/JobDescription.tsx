import React from "react";

export const JobDescription = () => {
  return (
    <div className="bg-white shadow-md rounded-lg mb-6">
      <div className="bg-gray-200 p-4 rounded-t-lg">
        <h1 className="text-2xl font-bold">Titre de l'offre</h1>
      </div>
      <div className="p-6 grid grid-cols-2 gap-4">
        <p>
          <strong>Département:</strong> Informatique
        </p>
        <p>
          <strong>Spécialisation:</strong> Développement Web
        </p>
        <p>
          <strong>Ville/Adresse:</strong> Casablanca
        </p>
        <p>
          <strong>Date limite de publication:</strong> 15/01/2025
        </p>
        <p>
          <strong>Lieu du concours:</strong> Centre de formation
        </p>
      </div>
      {/* Description */}
      <div className="p-6 flex justify-between">
        <h2 className="text-lg font-semibold mb-2">Description</h2>
        <p className="text-gray-700 max-w-md">
          Nous recherchons un développeur web talentueux pour rejoindre notre
          équipe dynamique. Le candidat idéal doit avoir une expérience prouvée
          dans la création d'applications web modernes et évolutives.
        </p>
      </div>
    </div>
  );
};
