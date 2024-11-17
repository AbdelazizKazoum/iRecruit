/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/form/FieldRenderer.tsx

import React, { memo } from "react";
import { FormField } from "../ui/form";
import FieldRenderer from "./FieldRenderer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useFormContext } from "react-hook-form";
// import CheckboxField from "./fields/CheckboxField";

interface GroupFieldRendererProps {
  fieldConfig: any;
  formData?: any;
  // onChange: (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | Date | null
  // ) => void;
  category: string;
}

const GroupFieldsRenderer: React.FC<GroupFieldRendererProps> = ({
  fieldConfig,
  // error,
}) => {
  const { control, trigger } = useFormContext();
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
                control={control}
                name={fieldGroup.name}
                render={({ field }) => (
                  <FieldRenderer
                    fieldConfig={fieldGroup}
                    field={field}
                    // value={formData[category]?.[fieldGroup.name] || ""}
                    // onChange={handleFieldChange}
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

export default memo(GroupFieldsRenderer);