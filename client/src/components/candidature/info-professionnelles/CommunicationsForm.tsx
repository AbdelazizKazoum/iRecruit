/* eslint-disable @typescript-eslint/no-explicit-any */
import DynamicGridForm from "@/components/dynamic-form/DynamicGridForm";
import { Locale } from "@/configs/i18n";
import { communicationsSchema } from "@/schemas/communicationsForm.schema";
import React from "react";

const CommunicationsForm = ({ locale }: { locale: Locale }) => {
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div>
      <DynamicGridForm
        onSubmit={onSubmit}
        category="communications"
        schema={communicationsSchema}
        locale={locale}
        data={[]}
      />
    </div>
  );
};

export default CommunicationsForm;
