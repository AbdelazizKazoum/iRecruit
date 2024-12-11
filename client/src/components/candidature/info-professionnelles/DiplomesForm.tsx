import DynamicNormalForm from "@/components/dynamic-form/DynamicNormalForm";
import { Locale } from "@/configs/i18n";
import { infoProfessionnellesValidationSchema } from "@/schemas/infoProfessionnellesValidationSchema";
import React from "react";

const DiplomesForm = ({ locale }: { locale: Locale }) => {
  return (
    <div>
      <DynamicNormalForm
        category="diplomes"
        schema={infoProfessionnellesValidationSchema}
        local={locale}
      />
    </div>
  );
};

export default DiplomesForm;
