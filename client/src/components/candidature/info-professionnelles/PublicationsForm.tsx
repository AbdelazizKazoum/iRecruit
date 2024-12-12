/* eslint-disable @typescript-eslint/no-explicit-any */
import DynamicGridForm from "@/components/dynamic-form/DynamicGridForm";
import { Locale } from "@/configs/i18n";
import { publicationsSchema } from "@/schemas/publications.schema";
import React from "react";

const PublicationsForm = ({ locale }: { locale: Locale }) => {
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div>
      <DynamicGridForm
        onSubmit={onSubmit}
        category="publications"
        schema={publicationsSchema}
        locale={locale}
        data={[]}
      />
    </div>
  );
};

export default PublicationsForm;
