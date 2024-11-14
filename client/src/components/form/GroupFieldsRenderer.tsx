/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/form/FieldRenderer.tsx

import React from "react";
import { FormField } from "../ui/form";
import FieldRenderer from "./FieldRenderer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
// import CheckboxField from "./fields/CheckboxField";

interface GroupFieldRendererProps {
  fieldConfig: any;
  form: any;
  formData: any;
  // onChange: (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | Date | null
  // ) => void;
  category: string;
}

const GroupFieldsRenderer: React.FC<GroupFieldRendererProps> = ({
  fieldConfig,
  form,
  formData,
  category,
  // error,
}) => {
  console.log("🚀 ~ form:", form.watch);

  return (
    <>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className=" text-primary text-base font-normal">
            {fieldConfig.title}
          </AccordionTrigger>
          <AccordionContent className="grid grid-cols-2 gap-4 ">
            {fieldConfig.group.map((fieldGroup: any) => (
              <FormField
                key={fieldGroup.name}
                control={form.control}
                name={fieldGroup.name}
                render={({ field }) => (
                  <FieldRenderer
                    fieldConfig={fieldGroup}
                    field={field}
                    value={formData[category]?.[fieldGroup.name]}
                    watch={form.watch}
                    // onChange={handleFieldChange}
                    error={form.formState.errors}
                  />
                )}
              />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default GroupFieldsRenderer;
