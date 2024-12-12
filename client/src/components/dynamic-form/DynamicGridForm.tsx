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
  const { fields } = config;
  // Extract labels for headers
  const headers = fields.map((field) => field.label && field.label[locale]);

  // State to hold submitted data
  const [submittedData, setSubmittedData] = useState<any[]>(data);

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

  const addToList = (data: any) => {
    // Update the submitted data list
    setSubmittedData((prev) => [...prev, data]);

    // Call the onSubmit callback if provided
    onSubmit([...submittedData, data]);

    // Reset the form after submission
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
                <p className="text-gray-500">
                  {" "}
                  {gridTranslation.empty[locale]}
                </p>
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
                    {submittedData.map((data, index) => (
                      <tr key={index}>
                        {Object.values(data).map((value, i) => (
                          <td
                            key={i}
                            className="border border-gray-300 px-4 py-2"
                          >
                            {String(value)}
                          </td>
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
