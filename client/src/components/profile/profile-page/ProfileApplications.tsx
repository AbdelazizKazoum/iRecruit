import React from "react";

const ProfileApplications = () => {
  const applications = [
    {
      id: 1,
      grade: "Assistant Professor",
      etablissment: "Université Hassan II",
      specialite: "Informatique",
      recuCandidature: "10/01/2025",
      dateLimiteDepot: "15/01/2025",
      dateConcours: "20/01/2025",
      lieuConcours: "Casablanca",
      statut: "En cours de vérification",
    },
    {
      id: 2,
      grade: "Technician",
      etablissment: "Université Mohamed V",
      specialite: "Réseaux",
      recuCandidature: "08/01/2025",
      dateLimiteDepot: "12/01/2025",
      dateConcours: "18/01/2025",
      lieuConcours: "Rabat",
      statut: "Recevable",
    },
    {
      id: 3,
      grade: "Administrator",
      etablissment: "Université Cadi Ayyad",
      specialite: "Gestion",
      recuCandidature: "05/01/2025",
      dateLimiteDepot: "10/01/2025",
      dateConcours: "15/01/2025",
      lieuConcours: "Marrakech",
      statut: "Non recevable",
    },
  ];

  return (
    <div className=" bg-gray-50">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-black-500/80 text-xs">
          <thead>
            <tr>
              <th className="border text-black-500/90  px-4 py-2 bg-primary/10">
                ID
              </th>
              <th className="border text-black-500/90  px-4 py-2 bg-primary/10">
                Grade
              </th>
              <th className="border text-black-500/90  px-4 py-2 bg-primary/10">
                Établissement
              </th>
              <th className="border text-black-500/90  px-4 py-2 bg-primary/10">
                Spécialité
              </th>
              <th className="border text-black-500/90  px-4 py-2 bg-primary/10">
                Reçu de Candidature
              </th>
              <th className="border text-black-500/90  px-4 py-2 bg-primary/10">
                Date limite de dépôt
              </th>
              <th className="border text-black-500/90  px-4 py-2 bg-primary/10">
                Date de concours
              </th>
              <th className="border text-black-500/90  px-4 py-2 bg-primary/10">
                Lieu de concours
              </th>
              <th className="border text-black-500/90  px-4 py-2 bg-primary/10">
                Statut
              </th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="hover:bg-gray-100">
                <td className="border text-black-500/80 px-4 py-2 text-center">
                  {app.id}
                </td>
                <td className="border text-black-500/80 px-4 py-2 text-center">
                  {app.grade}
                </td>
                <td className="border text-black-500/80 px-4 py-2 text-center">
                  {app.etablissment}
                </td>
                <td className="border text-black-500/80 px-4 py-2 text-center">
                  {app.specialite}
                </td>
                <td className="border text-black-500/80 px-4 py-2 text-center">
                  {app.recuCandidature}
                </td>
                <td className="border text-black-500/80 px-4 py-2 text-center">
                  {app.dateLimiteDepot}
                </td>
                <td className="border text-black-500/80 px-4 py-2 text-center">
                  {app.dateConcours}
                </td>
                <td className="border text-black-500/80 px-4 py-2 text-center">
                  {app.lieuConcours}
                </td>
                <td className="border text-black-500/80 px-4 py-2 text-center">
                  {app.statut}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Additional Info */}
      <div className="mt-6 bg-white ">
        <h3 className=" font-bold text-primary">Informations importantes</h3>
        <ul className="mt-2 text-sm text-gray-600 list-disc pl-6">
          <li className="my-3">
            <strong className=" text-black-600/80 ">
              En cours de vérification:
            </strong>{" "}
            <p className="text-muted-foreground ">
              Votre dossier de candidature est en cours de vérification
              administrative pour confirmer la conformité des documents
              (diplôme, équivalence des diplômes étrangers, âge, dérogation pour
              les candidats de plus de 45 ans, autorisation pour les
              fonctionnaires de passer le concours, etc.).
            </p>
          </li>
          <li className="my-3">
            <strong className="text-black-600/80">Recevable:</strong>{" "}
            <p className="text-muted-foreground">
              Votre dossier de candidature est administrativement conforme et
              passe à la première étape.
            </p>
            <ul className="list-disc pl-6">
              <li className="my-3">
                <p className="text-muted-foreground">
                  {" "}
                  Pour les postes d&apos;enseignant-chercheur : Votre dossier
                  est administrativement conforme et passe à l&apos;étape
                  suivante qui consiste en l&apos;étude et l&apos;évaluation
                  académique par le jury de la commission du concours.
                </p>
              </li>
              <li className="my-3">
                <p className="text-muted-foreground">
                  {" "}
                  Pour les postes administratifs et techniques : Votre dossier
                  est administrativement conforme et passe à l&apos;étape
                  suivante qui est les examens écrits. Le lieu et l&apos;heure
                  sont disponibles sur les listes des candidats convoqués sur
                  <a
                    href="https://www.emploi-public.ma"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    www.emploi-public.ma
                  </a>
                  .
                </p>
              </li>
            </ul>
          </li>
          <li>
            <p className="text-muted-foreground">
              <strong>Non recevable:</strong> Votre dossier de candidature est
              rejeté administrativement et ne passe pas à l&apos;étape suivante.
              Soit votre dossier est incomplet, soit votre profil ne correspond
              pas aux critères demandés.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileApplications;
