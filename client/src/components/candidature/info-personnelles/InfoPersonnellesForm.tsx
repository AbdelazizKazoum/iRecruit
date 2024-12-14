/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Locale } from "@/configs/i18n";
import DynamicNormalForm from "@/components/dynamic-form/DynamicNormalForm";
import { personalInformationSchema } from "@/schemas/personalInformationForm.schema";

const InfoPersonnelles = ({ locale }: { locale: Locale }) => {
  function onSubmit(data: any) {
    console.log(data);
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-black-600/85">Application </h3>
        <p className="text-sm text-muted-foreground">
          Cest ainsi que les autres vous verront sur le site.{" "}
        </p>
      </div>
      <div>
        <DynamicNormalForm
          onSubmit={onSubmit}
          category="personal-informations"
          schema={personalInformationSchema}
          locale={locale}
        />
      </div>
    </div>
  );
};

export default InfoPersonnelles;
