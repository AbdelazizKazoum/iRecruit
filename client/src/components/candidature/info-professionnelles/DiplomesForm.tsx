/* eslint-disable @typescript-eslint/no-explicit-any */
import DynamicGridForm from "@/components/dynamic-form/DynamicGridForm";
import { Locale } from "@/configs/i18n";
import { diplomesSchema } from "@/schemas/diplomes.schema";
import React from "react";

const DiplomesForm = ({ locale }: { locale: Locale }) => {
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div>
      <DynamicGridForm
        onSubmit={onSubmit}
        category="diplomes"
        schema={diplomesSchema}
        locale={locale}
        data={[]}
      />
    </div>
  );
};

export default DiplomesForm;
