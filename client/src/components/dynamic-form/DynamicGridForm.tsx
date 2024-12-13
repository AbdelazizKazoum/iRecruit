"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { formConfigFactory } from "../../utils/formConfigFactory";
import FieldRenderer from "./FieldRenderer";
import { Button } from "../ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Loader } from "lucide-react";
import GroupFieldsRenderer from "./GroupFieldsRenderer";
import { FormProvider, useForm } from "react-hook-form";
import { memo, useMemo, useState } from "react";
import { Locale } from "@/configs/i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { cn } from "@/libs/utils";

import { Download } from "lucide-react"; // Import the download icon

const DynamicGridForm = ({
  category,
  schema,
  locale,
  onSubmit,
  data,
}: {
  category: string;
  schema: any;
  locale: Locale;
  onSubmit: (data: any) => void;
  data: any;
}) => {
  const config = formConfigFactory(category);
  const form = useForm<any>({
    resolver: zodResolver(schema),
  });
  console.log("🚀 ~ form:", form.formState.errors);
  const { fields } = config;
  const headers = fields.map((field) => field.label && field.label[locale]);
  const [submittedData, setSubmittedData] = useState<any[]>(data);

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

  const renderedFields = useMemo(() => {
    return config.fields.map((fieldConfig: any, index: number) => {
      if (fieldConfig.type === "group") {
        return (
          <div key={index} className="col-span-2">
            <GroupFieldsRenderer
              fieldConfig={fieldConfig}
              category={category}
              locale={locale}
              control={form.control}
            />
          </div>
        );
      } else {
        return (
          <FormField
            key={index}
            control={form.control}
            name={fieldConfig.name}
            render={({ field }) => (
              <FieldRenderer
                fieldConfig={fieldConfig}
                field={field}
                locale={locale}
              />
            )}
          />
        );
      }
    });
  }, [config.fields, category, form.control, locale]);

  // File open
  const handleOpenFile = (value: any) => {
    const fileData = Object.entries(value)[0][1];

    if (fileData) {
      if (fileData instanceof Blob) {
        // If it's a Blob, create an object URL
        const fileURL = URL.createObjectURL(fileData);
        window.open(fileURL, "_blank");
        // Optionally, revoke the object URL later to free memory
        setTimeout(() => URL.revokeObjectURL(fileURL), 10000); // Adjust timeout as needed
      } else if (typeof fileData === "string") {
        // If it's already a URL
        window.open(fileData, "_blank");
      } else {
        console.error("Unsupported file type");
      }
    } else {
      console.error(`File not found for key: ${value}`);
    }
  };

  const addToList = (data: any) => {
    console.log("🚀 ~ addToList ~ data:", data);

    setSubmittedData((prev) => [...prev, data]);
    onSubmit([...submittedData, data]);
    form.reset({});
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={config.title[locale]}>
        <AccordionTrigger className={cn(" text-primary text-base font-normal")}>
          {config.title[locale]}
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-6">
            <FormProvider {...form}>
              <Form {...form}>
                <form
                  className="space-y-2"
                  onSubmit={form.handleSubmit(addToList)}
                >
                  <div className="grid grid-cols-2 gap-4">{renderedFields}</div>
                  <Button
                    size="lg"
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    style={{ marginTop: "15px" }}
                  >
                    {form.formState.isSubmitting ? (
                      <Loader className="animate-spin mr-2 h-4 w-4" />
                    ) : null}
                    {gridTranslation.buttons.save[locale]}
                  </Button>
                </form>
              </Form>
            </FormProvider>

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
                      {headers.map((header, index) => (
                        <th
                          className="border border-gray-300 px-4 py-2"
                          key={index}
                        >
                          {header?.split(" ")[0]}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {submittedData.map((entry, index) => (
                      <tr key={index} className="text-center">
                        {Object.entries(entry).map(([key, value], i) => (
                          <>
                            {key === "files" && typeof value === "object" ? (
                              Object.keys(value).map((fileKey) => (
                                <td
                                  key={i}
                                  className="border border-gray-300 px-4 py-2 text-center"
                                >
                                  <div
                                    key={fileKey}
                                    className="flex items-center justify-center"
                                  >
                                    {/* <span className="mr-2">{fileKey}</span> */}
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      onClick={() => handleOpenFile(value)}
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
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default memo(DynamicGridForm);
