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

import { toast } from "react-toastify";
import List from "./List";

const DynamicGridForm = ({
  category,
  schema,
  locale,
  onSubmit,
  data,
  checkKey, // New prop for specifying the key to check
}: {
  category: string;
  schema: any;
  locale: Locale;
  onSubmit: (data: any) => void;
  data: any;
  checkKey: string; // Key to check for duplicates
}) => {
  const config = formConfigFactory(category);
  const form = useForm<any>({
    resolver: zodResolver(schema),
  });
  const { fields } = config;
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

  const addToList = (data: any) => {
    // Check if the key specified in `checkKey` already exists in `submittedData`
    const exists = submittedData.some(
      (item) => item[checkKey] === data[checkKey]
    );

    if (exists) {
      toast.error(`Déjà existant`);
      return; // Do not add duplicate data
    }

    onSubmit(data);

    setSubmittedData((prev) => [...prev, data]);
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
            <List
              locale={locale}
              submittedData={submittedData}
              fields={fields}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default memo(DynamicGridForm);
