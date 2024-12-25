import React from "react";

const VerifyInformation = () => {
  return (
    <div className="bg-white shadow-md rounded-lg mb-6">
      <div className="bg-gray-200 p-4 rounded-t-lg">
        <h2 className="text-lg font-semibold">Informations Personnelles</h2>
      </div>
      <div className="p-6 grid grid-cols-2 gap-4">
        <p>
          <strong>Nom:</strong> Abdelaziz
        </p>
        <p>
          <strong>Prénom:</strong> El Azzouzi
        </p>
        <p>
          <strong>Email:</strong> abdelaziz@email.com
        </p>
        <p>
          <strong>Téléphone:</strong> +212 600000000
        </p>
      </div>
    </div>
  );
};

export default VerifyInformation;
