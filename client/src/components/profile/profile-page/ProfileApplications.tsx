import PageHeader from "@/components/PageHeader";
import { Separator } from "@/components/ui/separator";
import { ApplicationType } from "@/types/application.types";
import { getDictionary } from "@/utils/getDictionary";
import React from "react";

const ProfileApplications = ({
  dictionary,
  applications,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  applications: ApplicationType[] | null;
}) => {
  const applicationss = [
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
    <div className=" bg-gray-50 space-y-6">
      <PageHeader
        title={dictionary.profilePage.sections.candidatures.title}
        description={dictionary.profilePage.sections.candidatures.description}
        size="sm"
      />
      <Separator />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-black-500/80 text-xs">
          <thead>
            <tr>
              <th className="border text-black-500/90  px-4 py-2 bg-primary/10">
                {dictionary.profilePage.sections.candidatures.tableHeaders.id}
              </th>
              <th className="border text-black-500/90  px-4 py-2 bg-primary/10">
                {
                  dictionary.profilePage.sections.candidatures.tableHeaders
                    .grade
                }
              </th>
              <th className="border text-black-500/90  px-4 py-2 bg-primary/10">
                {
                  dictionary.profilePage.sections.candidatures.tableHeaders
                    .etablissment
                }
              </th>
              <th className="border text-black-500/90  px-4 py-2 bg-primary/10">
                {
                  dictionary.profilePage.sections.candidatures.tableHeaders
                    .specialite
                }
              </th>
              <th className="border text-black-500/90  px-4 py-2 bg-primary/10">
                {
                  dictionary.profilePage.sections.candidatures.tableHeaders
                    .recuCandidature
                }
              </th>
              <th className="border text-black-500/90  px-4 py-2 bg-primary/10">
                {
                  dictionary.profilePage.sections.candidatures.tableHeaders
                    .dateLimiteDepot
                }
              </th>
              <th className="border text-black-500/90  px-4 py-2 bg-primary/10">
                {
                  dictionary.profilePage.sections.candidatures.tableHeaders
                    .dateConcours
                }
              </th>
              <th className="border text-black-500/90  px-4 py-2 bg-primary/10">
                {
                  dictionary.profilePage.sections.candidatures.tableHeaders
                    .lieuConcours
                }
              </th>
              <th className="border text-black-500/90  px-4 py-2 bg-primary/10">
                {
                  dictionary.profilePage.sections.candidatures.tableHeaders
                    .statut
                }
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
        <h3 className=" font-bold text-black-600/80">
          {dictionary.profilePage.sections.candidatures.importantInfo.title}
        </h3>
        <ul className="mt-2 text-sm text-gray-600 list-disc pl-6">
          <li className="my-3">
            <strong className=" text-black-600/80 ">
              {
                dictionary.profilePage.sections.candidatures.importantInfo
                  .verification.title
              }
            </strong>{" "}
            <p className="text-muted-foreground ">
              {
                dictionary.profilePage.sections.candidatures.importantInfo
                  .verification.description
              }
            </p>
          </li>
          <li className="my-3">
            <strong className="text-black-600/80">
              {" "}
              {
                dictionary.profilePage.sections.candidatures.importantInfo
                  .recevable.title
              }
            </strong>{" "}
            <p className="text-muted-foreground">
              {
                dictionary.profilePage.sections.candidatures.importantInfo
                  .recevable.description
              }
            </p>
            <ul className="list-disc pl-6">
              <li className="my-1">
                <p className="text-muted-foreground">
                  {" "}
                  {
                    dictionary.profilePage.sections.candidatures.importantInfo
                      .recevable.details.teaching
                  }
                </p>
              </li>
              <li className="my-1">
                <p className="text-muted-foreground">
                  {" "}
                  {
                    dictionary.profilePage.sections.candidatures.importantInfo
                      .recevable.details.technical
                  }
                  <a
                    href="https://www.emploi-public.ma"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {" "}
                    www.emploi-public.ma
                  </a>
                  .
                </p>
              </li>
            </ul>
          </li>
          <li>
            <p className="text-muted-foreground">
              <strong className="text-black-600/80">
                {" "}
                {
                  dictionary.profilePage.sections.candidatures.importantInfo
                    .nonRecevable.title
                }
              </strong>{" "}
              {
                dictionary.profilePage.sections.candidatures.importantInfo
                  .nonRecevable.description
              }
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileApplications;
