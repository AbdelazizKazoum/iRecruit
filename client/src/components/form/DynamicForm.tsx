"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/form/DynamicForm.tsx

import useDynamicForm from "@/hooks/useDynamicForm";
import { formConfigFactory } from "../../utils/formConfigFactory";
import { useFormStore } from "@/stores/useFormStore";
import FieldRenderer from "./FieldRenderer";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { Separator } from "../ui/separator";

const DynamicForm = ({ category, schema }: any) => {
  const config = formConfigFactory(category);
  const { form, handleSubmit } = useDynamicForm(schema, config.category);

  const { formData } = useFormStore();

  // const handleFieldChange = (name: string, value: string) => {
  //   setFormData(category, name, value); // Update the global store with category-based data
  // };

  return (
    <div className="flex-1 lg:max-w-2xl">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-black-600/85">Candidature</h3>
          <p className="text-sm text-muted-foreground">
            C&apos;est ainsi que les autres vous verront sur le site.
          </p>
        </div>
        <Separator />
        <Form {...form}>
          <form onSubmit={handleSubmit}>
            {config.fields.map((fieldConfig: any) => (
              <div key={fieldConfig.name}>
                <FieldRenderer
                  fieldConfig={fieldConfig}
                  form={form}
                  value={formData[category]?.[fieldConfig.name]}
                  // onChange={handleFieldChange}
                />
              </div>
            ))}
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default DynamicForm;
