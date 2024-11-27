"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/form/DynamicForm.tsx

import useDynamicForm from "@/hooks/useDynamicForm";
import { formConfigFactory } from "../../utils/formConfigFactory";
import FieldRenderer from "./FieldRenderer";
import { Button } from "../ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Separator } from "../ui/separator";
import { Loader } from "lucide-react";
import GroupFieldsRenderer from "./GroupFieldsRenderer";
import { FormProvider } from "react-hook-form";

const DynamicNormalForm = ({ category, schema }: any) => {
  const config = formConfigFactory(category);
  const { form, handleSubmit } = useDynamicForm(schema, config.category);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-black-600/85">Candidature</h3>
        <p className="text-sm text-muted-foreground">
          C&apos;est ainsi que les autres vous verront sur le site.
        </p>
      </div>
      <Separator />
      <FormProvider {...form}>
        <Form {...form}>
          <form
            className="space-y-2"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <div key="1" className=" grid grid-cols-2 gap-4 ">
              {config.fields.map((fieldConfig: any, index: number) => {
                if (fieldConfig.type === "group") {
                  return (
                    <div key={index} className=" col-span-2  ">
                      <GroupFieldsRenderer
                        fieldConfig={fieldConfig}
                        // formData={formData}
                        category={category}
                      />
                    </div>
                  );
                } else {
                  return (
                    <FormField
                      key={index}
                      control={form.control}
                      name={fieldConfig.name}
                      // defaultValue=""
                      render={({ field }) => (
                        <FieldRenderer
                          fieldConfig={fieldConfig}
                          field={field}
                          // value={formData[category]?.[fieldConfig.name]}
                          // onChange={handleFieldChange}
                        />
                      )}
                    />
                  );
                }
              })}
            </div>
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
            </Button>{" "}
          </form>
        </Form>
      </FormProvider>
    </div>
  );
};

export default DynamicNormalForm;
