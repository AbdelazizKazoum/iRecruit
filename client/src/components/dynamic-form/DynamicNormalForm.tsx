"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/form/DynamicForm.tsx

import { formConfigFactory } from "../../utils/formConfigFactory";
import FieldRenderer from "./FieldRenderer";
import { Button } from "../ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Loader } from "lucide-react";
import GroupFieldsRenderer from "./GroupFieldsRenderer";
import { FormProvider, useForm } from "react-hook-form";
import { memo, useMemo } from "react";
import { Locale } from "@/configs/i18n";
import { zodResolver } from "@hookform/resolvers/zod";

const DynamicNormalForm = ({
  category,
  schema,
  locale,
  onSubmit,
  defaultValues,
}: {
  category: string;
  schema: any;
  locale: Locale;
  onSubmit: (data: any) => void;
  defaultValues: any;
}) => {
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
    <div className="space-y-6">
      <FormProvider {...form}>
        <Form {...form}>
          <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
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
    </div>
  );
};

export default memo(DynamicNormalForm);
