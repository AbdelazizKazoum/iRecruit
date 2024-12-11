"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/form/DynamicForm.tsx

import { Form, FormField } from "@/components/ui/form";
import { Loader } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { memo, useMemo } from "react";
import { Locale } from "@/configs/i18n";
import { formConfigFactory } from "@/utils/formConfigFactory";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import GroupFieldsRenderer from "@/components/dynamic-form/GroupFieldsRenderer";
import FieldRenderer from "@/components/dynamic-form/FieldRenderer";
import { zodResolver } from "@hookform/resolvers/zod";

const Index = ({
  category,
  schema,
  local,
}: {
  category: string;
  schema: any;
  local: Locale;
}) => {
  const config = formConfigFactory(category);
  const form = useForm<any>({
    resolver: zodResolver(schema),
  });

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

  const onSubmit = (data: any) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
  };

  console.log("hello world");

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-black-600/85">
          {config.title[local]}
        </h3>
        <p className="text-sm text-muted-foreground">
          {config.description[local]}
        </p>
      </div>
      <Separator />
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

export default memo(Index);
