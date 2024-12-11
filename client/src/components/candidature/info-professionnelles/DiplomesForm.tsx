import DynamicGridForm from "@/components/dynamic-form/DynamicGridForm";
import { Locale } from "@/configs/i18n";
import { infoProfessionnellesValidationSchema } from "@/schemas/infoProfessionnellesValidationSchema";
import React from "react";

const DiplomesForm = ({ locale }: { locale: Locale }) => {
  const onSubmit = (data: any) => {};
  return (
    <div>
      <DynamicGridForm
        onSubmit={onSubmit}
        category="diplomes"
        schema={infoProfessionnellesValidationSchema}
        local={locale}
      />
    </div>
  );
};

export default DiplomesForm;
