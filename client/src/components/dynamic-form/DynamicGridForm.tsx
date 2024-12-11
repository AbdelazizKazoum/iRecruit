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

const DynamicGridForm = ({
  category,
  schema,
  local,
  onSubmit,
}: {
  category: string;
  schema: any;
  local: Locale;
  onSubmit: (data: any) => void;
}) => {
  const config = formConfigFactory(category);
  const form = useForm<any>({
    resolver: zodResolver(schema),
  });

  // State to hold submitted data
  const [submittedData, setSubmittedData] = useState<any[]>([]);

  const renderedFields = useMemo(() => {
    return config.fields.map((fieldConfig: any, index: number) => {
      if (fieldConfig.type === "group") {
        return (
          <div key={index} className="col-span-2">
            <GroupFieldsRenderer
              fieldConfig={fieldConfig}
              category={category}
              locale={local}
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
                locale={local}
              />
            )}
          />
        );
      }
    });
  }, [config.fields, category, form.control, local]);

  const addToList = (data: any) => {
    // Update the submitted data list
    setSubmittedData((prev) => [...prev, data]);

    // Call the onSubmit callback if provided
    onSubmit(data);

    // Reset the form after submission
    form.reset();
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem
        value={config.title[local]}
        // className={errors[fieldConfig.name] && "border-destructive"}
      >
        <AccordionTrigger
          className={cn(
            " text-primary text-base font-normal"
            // errors[config.name] && "text-destructive"
          )}
        >
          {config.title[local]}
        </AccordionTrigger>
        <AccordionContent className=" ">
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
                    Enregistrer
                  </Button>
                </form>
              </Form>
            </FormProvider>

            {/* Data Grid */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-4">Submitted Data</h2>
              <div className="grid grid-cols-2 gap-4 border p-4 rounded-lg">
                {submittedData.length === 0 ? (
                  <p className="text-gray-500">No data submitted yet.</p>
                ) : (
                  submittedData.map((data, index) => (
                    <div
                      key={index}
                      className="p-4 border rounded-lg bg-gray-50 shadow-sm"
                    >
                      {Object.entries(data).map(([key, value]) => (
                        <p key={key}>
                          <strong>{key}:</strong> {String(value)}
                        </p>
                      ))}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default memo(DynamicGridForm);
