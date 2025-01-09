"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { formConfigFactory } from "../../utils/formConfigFactory";
import FieldRenderer from "./FieldRenderer";
import { Button } from "../ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Loader } from "lucide-react";
import GroupFieldsRenderer from "./GroupFieldsRenderer";
import { FormProvider, useForm } from "react-hook-form";
import { forwardRef, memo, useMemo } from "react";
import { Locale } from "@/configs/i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import "./DynamicNormalForm.css"; // Import CSS file for styles
import { cn } from "@/libs/utils";

const DynamicNormalForm = forwardRef<
  HTMLButtonElement,
  {
    category: string;
    schema: any;
    locale: Locale;
    onSubmit: (data: any) => void;
    defaultValues: any;
    mode: "readonly" | "new" | "edit";
    showButton?: boolean;
  }
>(
  (
    { category, schema, locale, onSubmit, defaultValues, mode, showButton },
    ref
  ) => {
    const config = formConfigFactory(category);
    const form = useForm<any>({
      resolver: zodResolver(schema),
      defaultValues: defaultValues,
    });

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

    return (
      <div className="  ">
        <FormProvider {...form}>
          <Form {...form}>
            <form
              className={`space-y-2 ${mode === "readonly" ? "readonly" : ""}`}
              onSubmit={
                mode === "readonly"
                  ? (e) => e.preventDefault()
                  : form.handleSubmit(onSubmit)
              }
            >
              <div className={cn("grid grid-cols-2 gap-4")}>
                {renderedFields}
              </div>
              {mode !== "readonly" && (
                <Button
                  size="lg"
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className={cn(!showButton && "hidden")}
                  style={{ marginTop: "15px" }}
                  ref={ref}
                >
                  {form.formState.isSubmitting ? (
                    <Loader className="animate-spin mr-2 h-4 w-4" />
                  ) : null}
                  Enregistrer
                </Button>
              )}
            </form>
          </Form>
        </FormProvider>
      </div>
    );
  }
);

DynamicNormalForm.displayName = "DynamicNormalForm";
export default memo(DynamicNormalForm);
