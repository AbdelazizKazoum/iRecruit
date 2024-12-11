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
import { cn } from "@/libs/utils";
import { Locale } from "@/configs/i18n";
// import CheckboxField from "./fields/CheckboxField";

interface GroupFieldRendererProps {
  fieldConfig: any;
  formData?: any;
  // onChange: (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | Date | null
  // ) => void;
  category: string;
  locale: Locale;
}

const GroupFieldsRenderer: React.FC<GroupFieldRendererProps> = ({
  fieldConfig,
  // error,
  locale,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem
          value={fieldConfig.name}
          className={errors[fieldConfig.name] && "border-destructive"}
        >
          <AccordionTrigger
            className={cn(
              " text-primary text-base font-normal",
              errors[fieldConfig.name] && "text-destructive"
            )}
          >
            {fieldConfig.title[locale]}
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
                    locale={locale}
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
