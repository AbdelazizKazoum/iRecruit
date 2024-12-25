import React from "react";

const Attachment = () => {
  return (
    <div className="bg-white shadow-md rounded-lg mb-6">
      <div className="bg-gray-200 p-4 rounded-t-lg">
        <h2 className="text-lg font-semibold">Pièces Jointes</h2>
      </div>
      <div className="p-6">
        <p className="text-gray-700">Téléchargez vos fichiers ci-dessous :</p>
        <div className="mt-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Ajouter un fichier
          </button>
        </div>
      </div>
    </div>
  );
};

export default Attachment;
