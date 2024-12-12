/* eslint-disable @typescript-eslint/no-explicit-any */
import DynamicGridForm from "@/components/dynamic-form/DynamicGridForm";
import { Locale } from "@/configs/i18n";
import { languesSchema } from "@/schemas/langues.schema";
import React from "react";

const LanquesForm = ({ locale }: { locale: Locale }) => {
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div>
      <DynamicGridForm
        onSubmit={onSubmit}
        category="langues"
        schema={languesSchema}
        locale={locale}
        data={[]}
      />
    </div>
  );
};

export default LanquesForm;
