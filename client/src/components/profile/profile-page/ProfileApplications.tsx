import PageHeader from "@/components/PageHeader";
import { Separator } from "@/components/ui/separator";
import { Locale } from "@/configs/i18n";
import { ApplicationType } from "@/types/application.types";
import { getDictionary } from "@/utils/getDictionary";
import React from "react";

const ProfileApplications = ({
  dictionary,
  applications,
  locale,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  applications: ApplicationType[] | null;
  locale: Locale;
}) => {
  console.log("🚀 ~ applications:", applications);

  return (
    <div className="bg-gray-50 space-y-6">
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
              <th className="border text-black-500/90 px-4 py-2 bg-primary/10">
                {dictionary.profilePage.sections.candidatures.tableHeaders.id}
              </th>
              <th className="border text-black-500/90 px-4 py-2 bg-primary/10">
                {
                  dictionary.profilePage.sections.candidatures.tableHeaders
                    .grade
                }
              </th>
              <th className="border text-black-500/90 px-4 py-2 bg-primary/10">
                {
                  dictionary.profilePage.sections.candidatures.tableHeaders
                    .etablissment
                }
              </th>
              <th className="border text-black-500/90 px-4 py-2 bg-primary/10">
                {
                  dictionary.profilePage.sections.candidatures.tableHeaders
                    .specialite
                }
              </th>
              <th className="border text-black-500/90 px-4 py-2 bg-primary/10">
                {
                  dictionary.profilePage.sections.candidatures.tableHeaders
                    .recuCandidature
                }
              </th>
              <th className="border text-black-500/90 px-4 py-2 bg-primary/10">
                {
                  dictionary.profilePage.sections.candidatures.tableHeaders
                    .dateLimiteDepot
                }
              </th>
              <th className="border text-black-500/90 px-4 py-2 bg-primary/10">
                {
                  dictionary.profilePage.sections.candidatures.tableHeaders
                    .dateConcours
                }
              </th>
              <th className="border text-black-500/90 px-4 py-2 bg-primary/10">
                {
                  dictionary.profilePage.sections.candidatures.tableHeaders
                    .lieuConcours
                }
              </th>
              <th className="border text-black-500/90 px-4 py-2 bg-primary/10">
                {
                  dictionary.profilePage.sections.candidatures.tableHeaders
                    .statut
                }
              </th>
            </tr>
          </thead>
          <tbody>
            {applications && applications.length > 0 ? (
              applications.map((app, id) => (
                <tr key={id} className="hover:bg-gray-100">
                  <td className="border text-black-500/80 px-4 py-2 text-center">
                    {id + 1}
                  </td>
                  <td className="border text-black-500/80 px-4 py-2 text-center">
                    {app.offer?.grade[locale] || ""}
                  </td>
                  <td className="border text-black-500/80 px-4 py-2 text-center">
                    {app.offer?.etablissement[locale] || ""}
                  </td>
                  <td className="border text-black-500/80 px-4 py-2 text-center">
                    {app.offer?.specialite[locale] || ""}
                  </td>
                  <td className="border text-black-500/80 px-4 py-2 text-center">
                    {app.recuCandidature
                      ? new Date(app.recuCandidature).toLocaleDateString(locale)
                      : ""}
                  </td>
                  <td className="border text-black-500/80 px-4 py-2 text-center">
                    {app.offer?.depotAvant || ""}
                  </td>
                  <td className="border text-black-500/80 px-4 py-2 text-center">
                    {app.offer?.datePublication || ""}
                  </td>
                  <td className="border text-black-500/80 px-4 py-2 text-center">
                    {app.offer?.city[locale] || ""}
                  </td>
                  <td className="border text-black-500/80 px-4 py-2 text-center">
                    {app.statut[locale] || ""}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={9}
                  className="border text-black-500/80 px-4 py-2 text-center"
                >
                  {dictionary.profilePage.sections.candidatures.noApplications}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Additional Info */}
      <div className="mt-6 bg-white">
        <h3 className="font-bold text-black-600/80">
          {dictionary.profilePage.sections.candidatures.importantInfo.title}
        </h3>
        <ul className="mt-2 text-sm text-gray-600 list-disc pl-6">
          <li className="my-3">
            <strong className="text-black-600/80">
              {
                dictionary.profilePage.sections.candidatures.importantInfo
                  .verification.title
              }
            </strong>
            <p className="text-muted-foreground">
              {
                dictionary.profilePage.sections.candidatures.importantInfo
                  .verification.description
              }
            </p>
          </li>
          <li className="my-3">
            <strong className="text-black-600/80">
              {
                dictionary.profilePage.sections.candidatures.importantInfo
                  .recevable.title
              }
            </strong>
            <p className="text-muted-foreground">
              {
                dictionary.profilePage.sections.candidatures.importantInfo
                  .recevable.description
              }
            </p>
            <ul className="list-disc pl-6">
              <li className="my-1">
                <p className="text-muted-foreground">
                  {
                    dictionary.profilePage.sections.candidatures.importantInfo
                      .recevable.details.teaching
                  }
                </p>
              </li>
              <li className="my-1">
                <p className="text-muted-foreground">
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
                    www.emploi-public.ma
                  </a>
                  .
                </p>
              </li>
            </ul>
          </li>
          <li>
            <strong className="text-black-600/80">
              {
                dictionary.profilePage.sections.candidatures.importantInfo
                  .nonRecevable.title
              }
            </strong>
            <p className="text-muted-foreground">
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
