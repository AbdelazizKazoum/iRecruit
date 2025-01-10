/* eslint-disable @typescript-eslint/no-explicit-any */
import { Locale } from "@/configs/i18n";
import React from "react";
import { Button } from "../ui/button";
import { handleOpenFile } from "@/utils/handleOpenFile";
import { Download } from "lucide-react";

const gridTranslation = {
  title: {
    en: "Submitted Data",
    fr: "Données Soumises",
    ar: "البيانات المرسلة",
  },
  empty: {
    en: "No data submitted yet.",
    fr: "Aucune donnée soumise pour le moment.",
    ar: "لم يتم إرسال أي بيانات حتى الآن.",
  },
  buttons: {
    save: {
      en: "Save",
      fr: "Enregistrer",
      ar: "حفظ",
    },
    loading: {
      en: "Loading...",
      fr: "Chargement...",
      ar: "جاري التحميل...",
    },
  },
};

const List = ({
  submittedData,
  locale,
  fields,
  title,
}: {
  submittedData: any;
  locale: Locale;
  fields: any;
  title?: string;
}) => {
  const headers = fields.map(
    (field: any) => field.label && field.label[locale]
  );

  return (
    <div>
      {/* Data Table */}
      {submittedData && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4 text-black-600/75 ">
            {title ?? gridTranslation.title[locale]}
          </h2>
          {submittedData.length === 0 ? (
            <p className="text-gray-500">{gridTranslation.empty[locale]}</p>
          ) : (
            <table className="table-auto w-full border-collapse border border-black-500/80">
              <thead>
                <tr>
                  {headers.map((header: any, index: any) => (
                    <th
                      className="border text-black-500/90  px-4 py-2 bg-primary/10"
                      key={index}
                    >
                      {header?.split(" ")[0]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {submittedData.map((entry: any, rowIndex: any) => (
                  <tr key={`row-${rowIndex}`} className="text-center">
                    {Object.entries(entry).map(([key, value], colIndex) =>
                      key === "files" && typeof value === "object" ? (
                        Object.entries(value || {}).map(
                          ([fileValue], fileIndex) => (
                            <td
                              key={`file-${rowIndex}-${colIndex}-${fileIndex}`}
                              className="border text-black-500/80 px-4 py-2 text-center"
                            >
                              <div className="flex items-center justify-center">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={async () =>
                                    await handleOpenFile(fileValue)
                                  }
                                >
                                  <Download className="h-4 w-4 text-blue-500" />
                                </Button>
                              </div>
                            </td>
                          )
                        )
                      ) : (
                        <td
                          key={`cell-${rowIndex}-${colIndex}`}
                          className="border text-black-500/90 px-4 py-2 text-center"
                        >
                          {String(value)}
                        </td>
                      )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default List;
