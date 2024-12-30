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
}: {
  submittedData: any;
  locale: Locale;
  fields: any;
}) => {
  const headers = fields.map(
    (field: any) => field.label && field.label[locale]
  );

  return (
    <div>
      {/* Data Table */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">
          {gridTranslation.title[locale]}
        </h2>
        {submittedData.length === 0 ? (
          <p className="text-gray-500">{gridTranslation.empty[locale]}</p>
        ) : (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                {headers.map((header: any, index: any) => (
                  <th className="border border-gray-300 px-4 py-2" key={index}>
                    {header?.split(" ")[0]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {submittedData.map((entry: any, index: any) => (
                <tr key={index} className="text-center">
                  {Object.entries(entry).map(([key, value], i) => (
                    <>
                      {key === "files" && typeof value === "object" ? (
                        Object.entries(value || {}).map((fileKey) => (
                          <td
                            key={i}
                            className="border border-gray-300 px-4 py-2 text-center"
                          >
                            <div
                              key={fileKey[0]}
                              className="flex items-center justify-center"
                            >
                              {/* <span className="mr-2">{fileKey}</span> */}
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={async () =>
                                  await handleOpenFile(fileKey[1])
                                }
                              >
                                <Download className="h-4 w-4 text-blue-500" />
                              </Button>
                            </div>
                          </td>
                        ))
                      ) : (
                        <td
                          key={i}
                          className="border border-gray-300 px-4 py-2 text-center"
                        >
                          {String(value)}
                        </td>
                      )}
                    </>
                    // <td
                    //   key={i}
                    //   className="border border-gray-300 px-4 py-2 text-center"
                    // >
                    //   {key === "files" && typeof value === "object"
                    //     ? Object.keys(value).map((fileKey) => (
                    //         <div
                    //           key={fileKey}
                    //           className="flex items-center justify-center"
                    //         >
                    //           {/* <span className="mr-2">{fileKey}</span> */}
                    //           <Button
                    //             variant="outline"
                    //             size="icon"
                    //             onClick={() => handleOpenFile(value)}
                    //           >
                    //             <Download className="h-4 w-4 text-blue-500" />
                    //           </Button>
                    //         </div>
                    //       ))
                    //     : String(value)}
                    // </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default List;
