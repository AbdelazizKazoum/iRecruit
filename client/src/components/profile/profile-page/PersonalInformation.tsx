"use client";
import DynamicNormalForm from "@/components/dynamic-form/DynamicNormalForm";
import { Separator } from "@/components/ui/separator";
import { Locale } from "@/configs/i18n";
import { personalInformationSchema } from "@/schemas/personalInformationForm.schema";
import { CandidatureType } from "@/types/candidature.types";
import { getDictionary } from "@/utils/getDictionary";
import React from "react";

export const PersonalInformation = ({
  locale,
  candidatureData,
  dictionary,
}: {
  locale: Locale;
  candidatureData: CandidatureType | null;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-black-600/85">
          {" "}
          {dictionary.profilePage.sections.compte.title}{" "}
        </h3>
        <p className="text-sm text-muted-foreground">
          {dictionary.profilePage.sections.compte.subtitle}{" "}
        </p>
      </div>
      <Separator />
      <DynamicNormalForm
        onSubmit={() => {}}
        category="personal-informations"
        schema={personalInformationSchema}
        locale={locale}
        defaultValues={candidatureData?.personalInformation}
        mode="readonly"
      />{" "}
    </div>
  );
};
